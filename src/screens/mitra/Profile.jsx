import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { User, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

export default function MitraProfile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/sign-in', { replace: true });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-brand-green pt-12 pb-16 px-5 rounded-b-[40px] flex flex-col items-center relative">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-brand-green mb-3 shadow-sm">
          FF
        </div>
        <h1 className="text-white text-xl font-bold mb-1">Fathan F.</h1>
        <p className="text-brand-light text-sm">Fathan@gmail.com</p>
      </div>

      <div className="pt-8 px-5 pb-5">
        <h2 className="font-bold text-gray-800 mb-3">Pengaturan Akun</h2>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-50 cursor-pointer">
            <div className="flex items-center gap-3 text-gray-600">
              <User size={20} />
              <span className="font-medium text-sm">Informasi Pribadi</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
          <div className="flex items-center justify-between p-4 cursor-pointer">
            <div className="flex items-center gap-3 text-gray-600">
              <HelpCircle size={20} />
              <span className="font-medium text-sm">Pusat Bantuan</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-50 text-red-500 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 border border-red-100 transition-colors"
        >
          <LogOut size={20} />
          Keluar (Log Out)
        </button>
      </div>
    </div>
  );
}