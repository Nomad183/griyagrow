#!/usr/bin/env python3
"""Regenerate src/screens/pages/** and src/screens/pages.js from the Figma HTML exports.
Usage (from project root): python3 scripts/build_screens.py /path/to/exports
"""
import sys, os, re, json
sys.path.insert(0, os.path.dirname(__file__))
from convert import parse, write_component, norm

UP = sys.argv[1] if len(sys.argv) > 1 else '/mnt/user-data/uploads'
GEN = 'src/screens/pages'
os.makedirs('public/assets', exist_ok=True)

def size_of(n):
    st = dict(n.attrs).get('style', '')
    m = re.search(r'width: ([\d.]+)px; height: ([\d.]+)px', st)
    return (float(m.group(1)), float(m.group(2))) if m else (0, 0)

def layer_of(n): return dict(n.attrs).get('data-layer', '')

def texts(n):
    out = []
    def rec(x):
        for c in x.children:
            if isinstance(c, str):
                t = norm(c)
                if t: out.append(t)
            else: rec(c)
    rec(n); return out

def title_of(n, layer):
    ts = [t for t in texts(n) if t != '9:41'][:2]
    return (layer + ' — ' if layer else '') + ' / '.join(ts)

def read(name):
    return open(os.path.join(UP, name), encoding='utf-8').read()

# ---------- navigation rules ----------
def tabs(role, m):  # m: label -> screen id
    return [{'text': k, 'to': f'/{role}/{v}'} for k, v in m.items()]

RULES = {
 'customer': {
   'common': tabs('customer', {'Beranda':'home','Katalog':'s03','Melon Saya':'s02','Pesanan':'s11'}),
   's00': [{'text':'Scan QR','to':'/customer/s01'},{'text':'Keranjang','to':'/customer/s04'},
           {'text':'Lihat Semua','to':'/customer/s03'},{'text':'Beli Sekarang','to':'/customer/s03'},
           {'text':'Adopsi','to':'/customer/s14'}],
 },
 'mitra': {
   'common': tabs('mitra', {'Beranda':'home','Kuota':'s01','Pesanan':'s03','Invoice':'s06','Profil':'s08'}),
   's08': [{'text':'Keluar (Log Out)','to':'/role'}],
 },
 'staff': {
   'common': tabs('staff', {'Beranda':'home','Scan QR':'s02','Aktivitas':'s04','Profil':'s06'}),
   's00': [{'text':'Mulai Scan QR','to':'/staff/s02'}],
   's06': [{'text':'Keluar (Log Out)','to':'/role'}],
 },
}

pages = {}   # role -> list of entries

def emit(role, idx, nodes, kind, title, rules):
    sid = f's{idx:02d}'
    d = os.path.join(GEN, role); os.makedirs(d, exist_ok=True)
    name = f'{role.capitalize()}{sid.upper()}'
    write_component(os.path.join(d, f'{sid.upper()}.jsx'), name, nodes, rules)
    pages.setdefault(role, []).append({'id': sid, 'kind': kind, 'title': title, 'file': f'./pages/{role}/{sid.upper()}.jsx'})

# ---------- customer / mitra / staff : one top-level node = one screen ----------
for role, fname in [('customer','customer_index.html'),('mitra','mitra_index.html'),('staff','staff_index.html')]:
    nodes = parse(read(fname))
    for i, n in enumerate(nodes):
        w, h = size_of(n)
        full = (round(w), round(h)) == (440, 956)
        sid = f's{i:02d}'
        rules = RULES[role].get(sid, []) + RULES[role]['common']
        emit(role, i, [n], 'screen' if full else 'part', title_of(n, layer_of(n)), rules)

# ---------- owner : loose fragments -> grouped heuristically ----------
nodes = parse(read('owner_index.html'))
SPLIT = {'Frame 3', 'Frame 257', 'Group 166', 'Frame 260', 'Rectangle 175', 'Frame 279'}
groups, cur = [], []
for n in nodes:
    if layer_of(n) in SPLIT and cur:
        groups.append(cur); cur = []
    cur.append(n)
if cur: groups.append(cur)

def gtitle(g):
    for n in g:
        if layer_of(n) == 'Frame 257': return ' '.join(texts(n)[:1])
    return ' / '.join(texts(g[0])[:2]) or layer_of(g[0])

titles = [gtitle(g) for g in groups]
def first(t):
    for i, x in enumerate(titles):
        if x == t: return f's{i:02d}'
    return None
omap = {'Beranda':'home','Pesanan':first('Kelola Pesanan Mitra'),'Produksi':first('Produksi & Inventaris'),'Laporan':first('Laporan & Keuangan'),'Profil':first('FF / Fathan F.')}
orules = tabs('owner', {k:v for k,v in omap.items() if v})
for i, g in enumerate(groups):
    emit('owner', i, g, 'stack', titles[i], orules)

# ---------- auth screens ----------
os.makedirs(os.path.join(GEN, 'auth'), exist_ok=True)
role_nodes = parse(read('index.html'))
write_component(os.path.join(GEN,'auth','Role.jsx'), 'Role', role_nodes, [
  {'text':'Personal Buyer','to':'/signin?role=customer','exact':False},
  {'text':'Owner/Pemilik Usaha','to':'/signin?role=owner','exact':False},
  {'text':'Staff Operasional','to':'/signin?role=staff','exact':False},
  {'text':'Mitra','to':'/signin?role=mitra','exact':False}])
auth = parse(read('login_copy.html'))   # [0]=Sign Up, [1]=Sign In
write_component(os.path.join(GEN,'auth','Signup.jsx'), 'Signup', [auth[0]],
  [{'text':'Confirm','to':'/otp'},{'text':'Log In','to':'/signin'}])
write_component(os.path.join(GEN,'auth','Signin.jsx'), 'Signin', [auth[1]],
  [{'text':'Log In','to':'/otp'},{'text':'Sign Up','to':'/signup'}])

# ---------- pages ----------
lines = ['// AUTO-pages by scripts/build_screens.py', 'export const pages = {']
for role, items in pages.items():
    lines.append(f'  {role}: [')
    for e in items:
        lines.append(f'    {{ id: {json.dumps(e["id"])}, kind: {json.dumps(e["kind"])}, title: {json.dumps(e["title"], ensure_ascii=False)}, load: () => import({json.dumps(e["file"])}) }},')
    lines.append('  ],')
lines.append('};')
open('src/screens/pages.js','w').write('\n'.join(lines)+'\n')
print({r: len(v) for r, v in pages.items()}, 'owner titles:', titles)
