import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, Sprout, FileText, User } from 'lucide-react';

export default function OwnerLayout() {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { path: '/owner', icon: Home, label: 'Beranda' },
    { path: '/owner/orders', icon: ClipboardList, label: 'Pesanan' },
    { path: '/owner/production', icon: Sprout, label: 'Produksi' },
    { path: '/owner/reports', icon: FileText, label: 'Laporan' },
    { path: '/owner/profile', icon: User, label: 'Profil' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans max-w-md mx-auto relative overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto pb-20 scrollbar-none">
        <Outlet />
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-6 py-3 flex justify-between items-center z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = path === item.path || (item.path !== '/owner' && path.startsWith(item.path));
          return (
            <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-1 ${isActive ? 'text-[#2A7C13]' : 'text-gray-400 hover:text-gray-600'}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}