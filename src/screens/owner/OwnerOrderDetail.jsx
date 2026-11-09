import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function OwnerOrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isApproved = id?.includes('730192');

  return (
    <div className="pb-6">
      <div className="bg-white p-4 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1"><ChevronLeft size={24} /></button>
        <h1 className="text-lg font-bold text-gray-800">Rincian Pesanan Mitra</h1>
      </div>
      <div className="p-5 flex flex-col gap-5">
        <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
            <span className="text-gray-900 text-sm font-medium">{isApproved ? 'PRE/730192' : 'PRE/849201'}</span>
            <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${!isApproved ? 'text-[#AC6400] border-[#F2C94C] bg-[#FFFBE5]' : 'text-[#2A7C13] border-[#76C457] bg-[#E8F5E9]'}`}>
              {!isApproved ? 'Menunggu' : 'Disetujui'}
            </div>
          </div>
          <h2 className="text-[22px] font-bold text-gray-900 mb-1">{isApproved ? 'Resto Clarita Suites' : 'Grand Hotel Kendari'}</h2>
          <p className="text-sm text-gray-500">{isApproved ? 'Ibu Maya (Procurement)' : 'Pak Hendra (F&B Director)'}</p>
        </div>
        
        <h3 className="font-bold text-gray-900 mb-1">Detail Kuota Panen</h3>
        <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm flex flex-col gap-4 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Varietas Melon:</span><span className="font-bold text-gray-900">{isApproved ? 'Melon Fujisawa Horeca' : 'Melon Inthanon Grade A'}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">ID Batch:</span><span className="font-bold text-gray-900">{isApproved ? 'BATCH-002' : 'BATCH-001'}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Jumlah Kuota:</span><span className="font-bold text-gray-900">{isApproved ? '50 Kg' : '100 Kg'}</span></div>
          <div className="flex justify-between pb-4 border-b border-gray-100"><span className="text-gray-500">Harga per Kg:</span><span className="text-gray-900">{isApproved ? 'Rp 82.000' : 'Rp 75.000'}</span></div>
          <div className="flex justify-between items-center pt-1"><span className="font-bold text-gray-900 text-lg">Total</span><span className="font-bold text-[#2A7C13] text-lg">{isApproved ? 'Rp 4.100.000' : 'Rp 7.500.000'}</span></div>
        </div>

        <div className="bg-[#F9FAFB] rounded-2xl border border-gray-200 p-4 text-sm text-gray-700 leading-relaxed shadow-sm">
          Persetujuan Anda akan memotong sisa kuota yang tersedia pada Batch dan otomatis membuat invoice digital untuk mitra bisnis.
        </div>
      </div>

      {!isApproved && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-5 py-4 flex gap-3 z-20">
          <button className="flex-1 py-3.5 rounded-xl border border-[#FF383C] text-[#FF383C] font-bold bg-[#FF383C]/5">Buat Pesanan</button>
          <button className="flex-1 py-3.5 rounded-xl bg-[#2A7C13] text-white font-bold shadow-md">Setujui</button>
        </div>
      )}
    </div>
  );
}