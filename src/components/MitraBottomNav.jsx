import { Link, useLocation } from 'react-router-dom';
import { Home, Box, ShoppingBag, Receipt, User } from 'lucide-react';

const MitraBottomNav = () => {
  const location = useLocation();
  const navItems = [
    { path: '/mitra/home', label: 'Beranda', icon: Home },
    { path: '/mitra/kuota', label: 'Kuota', icon: Box },
    { path: '/mitra/pesanan', label: 'Pesanan', icon: ShoppingBag },
    { path: '/mitra/invoice', label: 'Invoice', icon: Receipt },
    { path: '/mitra/profile', label: 'Profil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 flex justify-around py-3 text-[10px] z-50">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
        return (
          <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-brand-green' : 'text-gray-400'}`}>
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`font-medium ${isActive ? 'text-brand-green' : 'text-gray-500'}`}>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};
export default MitraBottomNav;