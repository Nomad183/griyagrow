import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function OwnerBatchDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="pb-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-4 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1"><ChevronLeft size={24} /></button>
        <h1 className="text-lg font-bold text-gray-800">Detail {id || 'BATCH-001'}</h1>
      </div>
      <div className="p-5 flex flex-col gap-5">
        <div className="bg-[#E8F5E9] rounded-3xl border border-[#76C457] p-5 shadow-sm">
          <span className="inline-block px-3 py-1 bg-[#2A7C13] text-white text-xs font-bold rounded-full mb-4">Pematangan</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-1">Melon Kirin</h2>
          <p className="text-sm text-gray-600">Greenhouse Block A</p>
        </div>
        
        <h3 className="font-bold text-gray-900 text-lg mb-1">Informasi Operasional</h3>
        <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm flex flex-col gap-5 text-sm">
          <div className="flex justify-between"><span className="text-gray-600 font-medium">Tanggal Tanam:</span><span className="font-bold text-gray-900">15 Sep 2026</span></div>
          <div className="flex justify-between"><span className="text-gray-600 font-medium">Estimasi Panen:</span><span className="font-bold text-gray-900">20 Nov 2026</span></div>
          <div className="flex justify-between pb-5 border-b border-gray-100"><span className="text-gray-600 font-medium">Jumlah Tanaman:</span><span className="font-bold text-gray-900">500 Polibag</span></div>
          <div className="flex justify-between items-center"><span className="font-bold text-gray-900 text-lg">Proyeksi Panen</span><span className="font-bold text-[#2A7C13] text-lg">500 kg</span></div>
        </div>
      </div>
    </div>
  );
}