import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OwnerOrders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Semua');
  const tabs = ['Semua', 'Menunggu', 'Disetujui'];

  const orders = [
    { id: 'PRE/849201', client: 'Grand Hotel Kendari', product: 'Melon Inthanon Grade A', quota: '100 Kg', total: 'Rp 7.500.000', harvestDate: '20 Nov 2026', status: 'Menunggu' },
    { id: 'PRE/730192', client: 'Resto Clarita Suites', product: 'Melon Fujisawa Horeca', quota: '50 Kg', total: 'Rp 4.100.000', harvestDate: '25 Nov 2026', status: 'Disetujui' }
  ];

  const filteredOrders = activeTab === 'Semua' ? orders : orders.filter(o => o.status === activeTab);

  return (
    <div className="pb-6">
      <div className="bg-white pt-10 pb-4 px-5 sticky top-0 z-20 shadow-sm border-b border-gray-100">
        <h1 className="text-xl font-bold text-center text-gray-900 tracking-tight">Kelola Pesanan Mitra</h1>
        <div className="flex justify-center gap-3 mt-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors border ${activeTab === tab ? 'bg-[#2A7C13] text-white border-[#2A7C13]' : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 pt-6 flex flex-col gap-5">
        {filteredOrders.map((order, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-900 text-xs font-medium uppercase tracking-wider">{order.id}</span>
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${order.status === 'Menunggu' ? 'text-[#AC6400] border-[#F2C94C] bg-[#FFFBE5]' : 'text-[#2A7C13] border-[#76C457] bg-[#E8F5E9]'}`}>
                {order.status}
              </div>
            </div>
            <h2 className="text-[22px] font-bold text-gray-900 mb-4">{order.client}</h2>
            <div className="w-full h-px bg-gray-200 mb-4"></div>
            <div className="flex flex-col gap-2.5 text-[13px] text-gray-800">
              <div className="flex gap-1"><span className="font-bold min-w-[100px]">Produk:</span><span>{order.product}</span></div>
              <div className="flex gap-1"><span className="font-bold min-w-[100px]">Jumlah Kuota:</span><span>{order.quota}</span></div>
              <div className="flex gap-1"><span className="font-bold min-w-[100px]">Total Nilai:</span><span className="font-bold text-[#2A7C13]">{order.total}</span></div>
              <div className="flex gap-1"><span className="font-bold min-w-[100px]">Panen:</span><span>{order.harvestDate}</span></div>
            </div>
            <button onClick={() => navigate(`/owner/orders/${order.id.replace('/', '-')}`)} className="w-full mt-6 bg-[#E8F5E9] text-[#2A7C13] py-3.5 rounded-xl text-sm font-bold hover:bg-[#D4EDDA] transition-colors">
              Periksa & Tanggapi Pesanan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}