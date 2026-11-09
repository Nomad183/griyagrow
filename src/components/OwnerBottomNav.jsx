import { Link, useLocation } from 'react-router-dom';
import { Home, Package, ShoppingCart, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
 const navItems = [
    { path: '/owner/home', label: 'Beranda', icon: Home },
    { path: '/owner/catalog', label: 'Katalog', icon: Package },
    { path: '/owner/checkout', label: 'Pesanan', icon: ShoppingCart },
    { path: '/owner/profile', label: 'Profil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 flex justify-around py-3 text-xs z-50 rounded-t-2xl shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-brand-green' : 'text-gray-400'}`}>
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`font-medium ${isActive ? 'text-brand-green' : 'text-gray-500'}`}>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};
export default BottomNav;