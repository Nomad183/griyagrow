#!/usr/bin/env python3
"""Convert Figma-exported HTML fragments into React JSX screens (helpers)."""
import re, os, json, hashlib, base64
from html.parser import HTMLParser

ASSETS = 'public/assets'
VOID = {'br','img','path','rect','circle','stop','use','ellipse','line','polygon','polyline'}
TAGFIX = {'clippath':'clipPath','lineargradient':'linearGradient','radialgradient':'radialGradient','fegaussianblur':'feGaussianBlur'}
ATTRFIX = {'viewbox':'viewBox','gradientunits':'gradientUnits','gradienttransform':'gradientTransform',
  'preserveaspectratio':'preserveAspectRatio','clippathunits':'clipPathUnits','maskunits':'maskUnits',
  'maskcontentunits':'maskContentUnits','patternunits':'patternUnits','stddeviation':'stdDeviation',
  'filterunits':'filterUnits','spreadmethod':'spreadMethod','patterncontentunits':'patternContentUnits'}

def extract_images(src):
    def rep(m):
        raw = m.group(2)
        h = hashlib.md5(raw.encode()).hexdigest()[:8]
        ext = {'jpeg':'jpg','svg+xml':'svg'}.get(m.group(1), m.group(1))
        name = f'img-{h}.{ext}'
        p = os.path.join(ASSETS, name)
        if not os.path.exists(p):
            open(p,'wb').write(base64.b64decode(raw))
        return f'/assets/{name}'
    return re.sub(r'data:image/([a-z+]+);base64,([A-Za-z0-9+/=]+)', rep, src)

class Node:
    def __init__(s, tag, attrs): s.tag=tag; s.attrs=attrs; s.children=[]
    def text(s):
        return ''.join(c if isinstance(c,str) else c.text() for c in s.children)

class P(HTMLParser):
    def __init__(s):
        super().__init__(convert_charrefs=True)
        s.root=Node('root',[]); s.stack=[s.root]
    def handle_starttag(s, tag, attrs):
        n=Node(TAGFIX.get(tag,tag), attrs); s.stack[-1].children.append(n)
        if tag not in VOID: s.stack.append(n)
    def handle_startendtag(s, tag, attrs):
        n=Node(TAGFIX.get(tag,tag), attrs); s.stack[-1].children.append(n)
    def handle_endtag(s, tag):
        if tag in VOID: return
        if len(s.stack)>1: s.stack.pop()
    def handle_data(s, d):
        if d.strip(): s.stack[-1].children.append(d)

def camel(k): return re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)

def split_style(st):
    parts=[]; depth=0; cur=''
    for ch in st:
        if ch=='(' : depth+=1
        if ch==')' : depth-=1
        if ch==';' and depth==0: parts.append(cur); cur=''
        else: cur+=ch
    if cur.strip(): parts.append(cur)
    out=[]
    for p in parts:
        if ':' not in p: continue
        k,v=p.split(':',1); k=k.strip(); v=v.strip()
        out.append((k if k.startswith('--') else camel(k), v))
    return out

def style_obj(pairs, extra=None):
    items=[f'{json.dumps(k)}:{json.dumps(v)}' for k,v in pairs]
    if extra: items+=extra
    return '{{'+','.join(items)+'}}'

def jsx_text(t):
    return '{'+json.dumps(re.sub(r'\s+',' ',t), ensure_ascii=False)+'}'

def ser(n, state):
    if isinstance(n,str): return jsx_text(n)
    attrs=[]; style_pairs=[]; extra=[]
    for k,v in n.attrs:
        if k in ('class','data-layer','data-svg-wrapper','data-node-id','data-device','data-orientation','data-show-home-indicator'): continue
        if k=='style': style_pairs=split_style(v or ''); continue
        if k.startswith('xmlns:'): continue
        if k=='xlink:href': k='href'
        if k=='mask-type': extra.append('"maskType":'+json.dumps(v)); continue
        k=ATTRFIX.get(k,k)
        if not (k.startswith('data-') or k.startswith('aria-')): k=camel(k)
        attrs.append(f'{k}={json.dumps(v if v is not None else "")}')
    to = state['hit'].get(id(n))
    if to:
        attrs.append(f'onClick={{() => go({json.dumps(to)})}}')
        attrs.append('role="link"')
        style_pairs.append(('cursor','pointer'))
    if style_pairs or extra: attrs.append('style='+style_obj(style_pairs, extra))
    if n.tag=='img' and not any(a.startswith('alt=') for a in attrs): attrs.append('alt=""')
    a=(' '+' '.join(attrs)) if attrs else ''
    if n.tag in VOID or not n.children: return f'<{n.tag}{a} />'
    return f'<{n.tag}{a}>'+''.join(ser(c,state) for c in n.children)+f'</{n.tag}>'

def walk(n):
    yield n
    for c in n.children:
        if not isinstance(c,str): yield from walk(c)

def norm(t): return re.sub(r'\s+',' ',t).strip()

def find_hits(root, rules):
    """Per rule: outermost element whose text equals (or contains) the label and
    does not contain any other rule's label."""
    hit={}
    labels=[r['text'] for r in rules]
    for r in rules:
        lab=r['text']; exact=r.get('exact',True)
        for n in walk(root):
            if n is root or n.tag in ('svg','path','g'): continue
            t=norm(n.text())
            if not ((t==lab) if exact else (lab in t)): continue
            if any(l!=lab and l in t and l not in lab for l in labels): continue
            hit.setdefault(id(n), r['to']); break
    return hit

def parse(src):
    p=P(); p.feed(extract_images(src)); return p.root.children

def write_component(path, name, nodes, rules):
    nodes = nodes if isinstance(nodes,list) else [nodes]
    state={'hit':{}}
    for n in nodes: state['hit'].update(find_hits(n, rules) if rules else {})
    body=''.join(ser(n,state) for n in nodes)
    if len(nodes)>1: body='<>'+body+'</>'
    uses_go='go(' in body
    code="/* eslint-disable */\n// AUTO-pages by scripts/build_screens.py (edit freely after generation).\n"
    if uses_go: code+="import { useNavigate } from 'react-router-dom';\n"
    code+=f"export default function {name}() {{\n"
    if uses_go: code+="  const go = useNavigate();\n"
    code+=f"  return (\n    {body}\n  );\n}}\n"
    open(path,'w').write(code)
