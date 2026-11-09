import { NavLink } from 'react-router-dom';
import { NavActivity, NavHome, NavProfile, NavScan } from './icons';
import s from './Staff.module.css';

const ITEMS = [
  { to: '/staff/home', label: 'Beranda', Icon: NavHome },
  { to: '/staff/scan', label: 'Scan QR', Icon: NavScan },
  { to: '/staff/activity', label: 'Aktivitas', Icon: NavActivity },
  { to: '/staff/profile', label: 'Profil', Icon: NavProfile },
];

export default function StaffNav() {
  return (
    <nav className={s.navbar} aria-label="Navigasi utama">
      {ITEMS.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} className={({ isActive }) => `${s.navItem}${isActive ? ` ${s.navActive}` : ''}`}>
          {({ isActive }) => (
            <>
              <Icon active={isActive} />
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
