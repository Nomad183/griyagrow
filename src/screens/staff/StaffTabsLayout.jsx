import { Outlet } from 'react-router-dom';
import StaffNav from './StaffNav.jsx';

// Layout untuk 4 tab utama staff (Beranda, Scan QR, Aktivitas, Profil).
// Halaman detail (plant/:code, order/:id) sengaja di luar layout ini supaya navbar bawah tersembunyi.
export default function StaffTabsLayout() {
  return (
    <>
      <Outlet />
      <StaffNav />
    </>
  );
}
