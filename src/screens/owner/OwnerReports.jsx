import React, { useState } from 'react';
import { Download, CheckCircle } from 'lucide-react';

export default function OwnerReports() {
  const [activeTab, setActiveTab] = useState('Bulan Ini');
  const [showModal, setShowModal] = useState(false);
  const tabs = ['Hari Ini', 'Minggu Ini', 'Bulan Ini', 'Tahun Ini'];

  return (
    <div className="pb-6 bg-gray-50 min-h-screen relative">
      <div className="bg-white pt-10 pb-4 px-5 sticky top-0 z-20 shadow-sm border-b border-gray-100">
        <h1 className="text-xl font-bold text-center text-gray-900 tracking-tight">Laporan & Keuangan</h1>
        <div className="flex justify-between mt-6 border border-gray-200 rounded-full p-1 bg-white">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 rounded-full text-[11px] font-bold transition-all ${activeTab === tab ? 'bg-[#2A7C13] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-5">
        {/* Green Card */}
        <div className="bg-[#2A7C13] rounded-3xl p-6 shadow-md text-white">
          <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-xs font-bold mb-4 border border-white/20">Total Penjualan ({activeTab})</span>
          <h2 className="text-4xl font-extrabold mb-8">Rp 16.500.000</h2>
          <div className="flex justify-between border-t border-white/20 pt-4">
            <div>
              <p className="text-xs text-white/80 mb-1">Penjualan Mitra</p>
              <p className="font-bold text-sm">Rp 11.600.000</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/80 mb-1">Penjualan Ritel</p>
              <p className="font-bold text-sm">Rp 4.900.000</p>
            </div>
          </div>
        </div>

        {/* Rekap Pajak */}
        <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-[#E8F5E9] text-[#2A7C13] rounded-full p-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <h3 className="font-bold text-gray-900 text-[15px]">Rekapitulasi Pajak Otomatis</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-5">Perhitungan estimasi komponen PPN / PPh secara transparan.</p>
          
          <div className="bg-[#F9FAFB] rounded-xl p-4 flex flex-col gap-3 text-sm">
            <div className="flex justify-between items-start">
              <span className="text-gray-700 w-2/3">DPP (Dasar Pengenaan Pajak):</span>
              <span className="font-bold text-gray-900">Rp 14.864.865</span>
            </div>
            <div className="flex justify-between items-start pb-4 border-b border-gray-200">
              <span className="text-gray-700 w-2/3">Estimasi PPN (11%):</span>
              <span className="font-bold text-[#2A7C13]">Rp 1.635.135</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="font-bold text-gray-900 text-[15px]">Total Omzet Bersih:</span>
              <span className="font-bold text-gray-900 text-[15px]">Rp 14.864.865</span>
            </div>
          </div>
        </div>

        <button onClick={() => setShowModal(true)} className="w-full bg-[#2A7C13] text-white py-4 rounded-xl flex justify-center items-center gap-2 font-bold shadow-md hover:bg-green-800 transition-colors mt-2">
          <Download size={20} />
          Ekspor Laporan Keuangan (CSV)
        </button>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-5 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm flex flex-col items-center text-center shadow-xl">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={40} className="text-[#2A7C13]" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Unduhan Laporan Sukses!</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Laporan keuangan bulanan telah siap dibuka dan tersimpan di folder perangkat Anda.
            </p>
            <button onClick={() => setShowModal(false)} className="w-full bg-[#2A7C13] text-white font-bold py-4 rounded-xl shadow-md hover:bg-green-800 transition-colors">
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
}