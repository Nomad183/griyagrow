import { useNavigate } from 'react-router-dom';
import { ChevronRight, PersonIcon, StoreIcon, PersonCheckIcon } from './icons';
import './auth.css';

// `role` dipakai sebagai segmen URL dashboard: /customer/home, /owner/home, dst.
const ROLES = [
  { role: 'customer', title: 'Personal Buyer', desc: 'Beli & adopsi melon untuk pribadi', Icon: PersonIcon },
  { role: 'owner', title: 'Owner/Pemilik Usaha', desc: 'Kelola pesanan, produksi & laporan', Icon: StoreIcon },
  { role: 'staff', title: 'Staff Operasional', desc: 'Scan QR, periksa tanaman & stok', Icon: PersonCheckIcon },
  { role: 'mitra', title: 'Mitra', desc: 'Pre-order kuota panen HORECA', Icon: PersonCheckIcon },
];

export default function RoleSelection() {
  const navigate = useNavigate();

  const choose = (role) => {
    try { sessionStorage.setItem('gg_role', role); } catch { /* storage unavailable */ }
    navigate('/otp-verification');
  };

  return (
    <main className="gg-screen gg-role">
      <h1 className="gg-role-title">Siapa yang Menggunakan Aplikasi?</h1>
      <p className="gg-role-sub">Pilih peran Anda untuk menyesuaikan pengalaman antarmuka.</p>

      {ROLES.map(({ role, title, desc, Icon }) => (
        <button key={role} type="button" className="gg-role-card" onClick={() => choose(role)}>
          <span className="gg-role-icon"><Icon /></span>
          <span className="gg-role-text">
            <span className="gg-role-name">{title}</span>
            <span className="gg-role-desc">{desc}</span>
          </span>
          <ChevronRight className="gg-role-chev" />
        </button>
      ))}

      <p className="gg-role-note">Dapat diubah kapan saja di pengaturan profil.</p>
    </main>
  );
}
