import { Bell, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MitraHome() {
  const quotas = [
    { id: 'BATCH-001', name: 'Melon Kirin Susu', date: '20 Nov 2026', price: 'Rp 75.000', sisa: '150 Kg' },
    { id: 'BATCH-002', name: 'Melon Golden Princess', date: '25 Nov 2026', price: 'Rp 60.000', sisa: '300 Kg' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-brand-green pt-8 pb-16 px-5 rounded-b-[30px]">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-brand-light text-xs mb-1">GriyaGrow Business</p>
            <h1 className="text-white text-xl font-bold">Grand Hotel Kendari</h1>
          </div>
          <button className="text-white p-1">
            <Bell size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-xl p-4 text-white">
            <p className="text-xs mb-2 opacity-90">Pre-order Aktif</p>
            <p className="text-xl font-bold">0 Batch</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-white">
            <p className="text-xs mb-2 opacity-90">Total Transaksi</p>
            <p className="text-xl font-bold">Rp 0.0M</p>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-6">
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="font-bold text-gray-800">Kuota Panen Mendatang</h2>
          <Link to="/mitra/kuota" className="text-brand-green text-sm font-semibold hover:underline">Lihat Semua</Link>
        </div>

        <div className="flex flex-col gap-4">
          {quotas.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex gap-4 mb-4 pb-4 border-b border-gray-100">
                <div className="w-20 h-20 bg-orange-100 rounded-xl flex-shrink-0 flex items-center justify-center text-orange-400 text-xs">
                  Img
                </div>
                <div className="flex-1">
                  <span className="inline-block px-2 py-1 bg-green-50 text-brand-green text-[10px] font-bold rounded mb-1">{item.id}</span>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">Panen: {item.date}</p>
                  <p className="text-brand-green font-bold text-sm">{item.price} <span className="text-gray-400 text-xs font-normal">/ Kg</span></p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">Sisa Kuota</p>
                  <p className="font-bold text-gray-800">{item.sisa}</p>
                </div>
                <button className="bg-brand-green text-white px-6 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-green-700">
                  Pesan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}