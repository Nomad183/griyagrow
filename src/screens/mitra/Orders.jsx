import { useState } from 'react';
import { FileText } from 'lucide-react';

export default function MitraOrders() {
  const [activeTab, setActiveTab] = useState('Semua');
  const tabs = ['Semua', 'Menunggu', 'Disetujui'];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white p-5 border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-800 text-center mb-4">Daftar Pesanan</h1>
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab 
                  ? 'bg-brand-green text-white' 
                  : 'bg-white border border-gray-200 text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5">
        {/* State Empty / Belum ada transaksi */}
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
           <FileText size={48} strokeWidth={1} className="mb-4 text-gray-300" />
           <p>Belum ada transaksi.</p>
        </div>
      </div>
    </div>
  );
}