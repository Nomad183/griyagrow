import React from 'react';
import { MapPin, Bell, TrendingUp, AlertCircle, ChevronRight, ClipboardList, Sprout } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function OwnerHome() {
  const navigate = useNavigate();
  return (
    <div className="pb-6">
      {/* Header */}
      <div className="bg-[#2A7C13] rounded-b-[40px] px-5 pt-10 pb-16 relative">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-2 text-white">
            <MapPin size={24} />
            <div>
              <p className="text-[11px] opacity-90 font-medium">Lokasi Anda</p>
              <p className="font-bold text-sm tracking-wide">Kendari, Sultra</p>
            </div>
          </div>
          <button className="text-white relative p-1">
            <Bell size={24} />
            <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#2A7C13]"></span>
          </button>
        </div>
        {/* Stat Cards */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x">
          <div className="bg-white/20 min-w-[160px] p-4 rounded-2xl text-white backdrop-blur-sm snap-start border border-white/10">
            <p className="text-xs mb-3 font-medium opacity-90">Penjualan Hari Ini</p>
            <p className="text-2xl font-bold mb-4 tracking-tight">Rp<br/>11.600.000</p>
            <div className="flex items-center gap-1.5 text-[11px] font-medium">
              <TrendingUp size={16} />
              <span>+14% dibanding kemarin</span>
            </div>
          </div>
          <div className="bg-white/20 min-w-[160px] p-4 rounded-2xl text-white backdrop-blur-sm snap-start border border-white/10">
            <p className="text-xs mb-3 font-medium opacity-90">Stok Melon Siap</p>
            <p className="text-2xl font-bold mb-4 tracking-tight">450 Kg</p>
            <p className="text-[11px] font-medium mt-auto pt-1">Sisa Kuota: 250 Kg</p>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="px-5 -mt-8 relative z-10">
        {/* Warning Card */}
        <div className="bg-[#FFFBE5] border border-[#F2C94C] rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-[#AC6400]">
            <AlertCircle size={20} />
            <h2 className="font-bold text-[15px]">Perlu Persetujuan Anda (2)</h2>
          </div>
          <div className="flex flex-col gap-3">
            <div onClick={() => navigate('/owner/orders')} className="bg-white rounded-xl p-3.5 border border-orange-100 flex justify-between items-center cursor-pointer hover:bg-orange-50/50">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">1 Pesanan mitra Baru</h3>
                <p className="text-xs text-gray-500 mt-1">Membutuhkan konfirmasi persetujuan kuota</p>
              </div>
              <ChevronRight size={20} className="text-[#AC6400]" />
            </div>
            <div onClick={() => navigate('/owner/production')} className="bg-white rounded-xl p-3.5 border border-orange-100 flex justify-between items-center cursor-pointer hover:bg-orange-50/50">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">1 Jadwal Tanam Baru</h3>
                <p className="text-xs text-gray-500 mt-1">Rencana tanam bibit perlu persetujuan</p>
              </div>
              <ChevronRight size={20} className="text-[#AC6400]" />
            </div>
          </div>
        </div>
        {/* Quick Access */}
        <h2 className="font-bold text-gray-900 text-base mb-3">Akses Cepat</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button onClick={() => navigate('/owner/orders')} className="bg-white border border-gray-100 p-3.5 rounded-2xl shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 bg-[#E8F5E9] rounded-xl flex items-center justify-center text-[#2A7C13] flex-shrink-0">
              <ClipboardList size={22} />
            </div>
            <span className="font-bold text-sm text-gray-900 text-left leading-tight">Kelola<br/>Pesanan</span>
          </button>
          <button onClick={() => navigate('/owner/production')} className="bg-white border border-gray-100 p-3.5 rounded-2xl shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 bg-[#E8F5E9] rounded-xl flex items-center justify-center text-[#2A7C13] flex-shrink-0">
              <Sprout size={22} />
            </div>
            <span className="font-bold text-sm text-gray-900 text-left leading-tight">Cek<br/>Produksi</span>
          </button>
        </div>
        {/* Sales Summary */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-bold text-gray-900 text-base">Ringkasan Penjualan</h2>
            <Link to="/owner/reports" className="text-[#2A7C13] font-bold text-xs hover:underline">Lihat Laporan</Link>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 font-medium">Mitra (Hotel/Resto)</span>
                <span className="font-bold text-[#2A7C13]">Rp 11.600.000 (70%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#2A7C13] h-full rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 font-medium">B2C (Retail & Adopsi)</span>
                <span className="font-bold text-[#76C457]">Rp 4.900.000 (30%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#76C457] h-full rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}