import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OwnerProduction() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Inventaris');
  const tabs = ['Inventaris', 'Batch Tanam', 'Jadwal Tanam'];

  return (
    <div className="pb-6 bg-gray-50 min-h-screen">
      <div className="bg-white pt-10 pb-4 px-5 sticky top-0 z-20 shadow-sm border-b border-gray-100">
        <h1 className="text-xl font-bold text-center text-gray-900 tracking-tight">Produksi & Inventaris</h1>
        <div className="flex justify-between bg-gray-100 rounded-full p-1 mt-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all ${activeTab === tab ? 'bg-[#E8F5E9] text-[#2A7C13] shadow-sm' : 'text-gray-400'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {activeTab === 'Inventaris' && (
          <>
            <div className="flex gap-4 mb-2">
              <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-1 font-medium">Total Stok Tersedia</p>
                <p className="text-2xl font-bold text-gray-900">450 Kg</p>
              </div>
              <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-1 font-medium">Sudah Dipesan Mitra</p>
                <p className="text-2xl font-bold text-[#2A7C13]">300 Kg</p>
              </div>
            </div>
            
            {[
              { name: 'Melon Sumo', grade: 'Brix 14-16', price: 'Rp 85.000', img: '/assets/products/melon-sumo.png', status: 'Tersedia' },
              { name: 'Melon Green Charm', grade: 'Brix 14-16', price: 'Rp 95.000', img: '/assets/products/melon-green-charm.png', status: 'Segera Panen' },
              { name: 'Bibit Melon Sumo', grade: 'Bibit Adopsi', price: 'Rp 85.000', img: '/assets/products/bibit-melon-sumo.png', status: 'Tersedia' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-4 flex gap-4 items-center shadow-sm">
                <img src={item.img} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-gray-100 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm mb-0.5">{item.name}</h3>
                  <p className="text-[10px] text-gray-500 mb-1">Grade: {item.grade}</p>
                  <p className="font-bold text-[#2A7C13] text-sm">{item.price}</p>
                </div>
                <div className="px-3 py-1 bg-[#E8F5E9] text-[#2A7C13] text-[10px] font-bold rounded-full border border-[#76C457]">
                  {item.status}
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'Batch Tanam' && (
          <>
            {[
              { id: 'BATCH-001', status: 'Pematangan', name: 'Melon Kirin', loc: 'Greenhouse Block A', qty: 300, progress: 85, date: '20 Nov 2026', proj: 300 },
              { id: 'BATCH-002', status: 'Pembentukan', name: 'Melon Kirin Susu', loc: 'Greenhouse Block B', qty: 300, progress: 65, date: '25 Nov 2026', proj: 300 },
              { id: 'BATCH-003', status: 'Vegetatif', name: 'Melon G. Princess', loc: 'Greenhouse Block C', qty: 300, progress: 35, date: '10 Des 2026', proj: 300 }
            ].map((batch, idx) => (
              <div key={idx} onClick={() => navigate(`/owner/batch/${batch.id}`)} className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-[#2A7C13] text-xs">{batch.id}</span>
                  <span className="px-3 py-1 bg-[#E8F5E9] text-[#2A7C13] text-[10px] font-bold rounded-full border border-[#76C457]">{batch.status}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-[18px] mb-1">{batch.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{batch.loc} • {batch.qty} Tanaman</p>
                <div className="flex justify-end text-[10px] font-bold text-[#2A7C13] mb-1">{batch.progress}%</div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-4">
                  <div className="bg-[#76C457] h-full rounded-full" style={{ width: `${batch.progress}%` }}></div>
                </div>
                <div className="flex justify-between text-xs border-t border-gray-100 pt-3">
                  <span className="text-gray-500">Estimasi Panen: <b className="text-gray-900">{batch.date}</b></span>
                  <span className="text-gray-500">Proyeksi: <b className="text-gray-900">{batch.proj} kg</b></span>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'Jadwal Tanam' && (
          <>
            {[
              { id: 'SCH-001', name: 'Melon S. Emerald', date: '15 Nov 2026', block: 'Block A1', qty: 600, status: 'Menunggu' },
              { id: 'SCH-002', name: 'Melon Kimono', date: '15 Nov 2026', block: 'Block A1', qty: 600, status: 'Disetujui' }
            ].map((sch, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-[#2A7C13] text-xs">{sch.id}</span>
                  <span className={`px-4 py-1.5 text-[10px] font-bold rounded-full border ${sch.status === 'Menunggu' ? 'bg-[#FFFBE5] text-[#AC6400] border-[#F2C94C]' : 'bg-[#E8F5E9] text-[#2A7C13] border-[#76C457]'}`}>{sch.status}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-[18px] mb-2">{sch.name}</h3>
                <p className="text-xs text-gray-700 leading-relaxed mb-4">Rencana Tanam: {sch.date} • Target: {sch.block}<br/>Jumlah Bibit: {sch.qty} polibag</p>
                {sch.status === 'Menunggu' && (
                  <button className="w-full bg-[#2A7C13] text-white py-3.5 rounded-xl text-sm font-bold shadow-md hover:bg-green-800 transition-colors">Setujui Rencana</button>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}