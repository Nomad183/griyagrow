import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { User, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

export default function OwnerProfile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/sign-in', { replace: true });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#2A7C13] pt-16 pb-20 px-5 rounded-b-[40px] flex flex-col items-center relative shadow-sm">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl font-light text-[#2A7C13] mb-4 shadow-md">
          FF
        </div>
        <h1 className="text-white text-2xl font-bold mb-1">Fathan F.</h1>
        <p className="text-white/90 text-sm font-medium">Fathan@gmail.com</p>
      </div>

      <div className="pt-10 px-5 pb-5">
        <h2 className="font-bold text-gray-900 text-lg mb-4">Pengaturan Akun</h2>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-4 text-gray-600">
              <User size={22} />
              <span className="font-medium text-gray-700">Informasi Pribadi</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          <div className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-4 text-gray-600">
              <HelpCircle size={22} />
              <span className="font-medium text-gray-700">Pusat Bantuan</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-[#FF383C]/5 text-[#FF383C] font-bold py-4 rounded-2xl flex items-center justify-center border border-[#FF383C]/30 hover:bg-[#FF383C]/10 transition-colors text-[15px]"
        >
          <LogOut size={20} />
          Keluar (Log Out)
        </button>
      </div>
    </div>
  );
}