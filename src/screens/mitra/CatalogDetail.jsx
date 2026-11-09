import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MitraCatalogDetail() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="p-4 flex items-center gap-3 sticky top-0 bg-white z-10 border-b border-gray-50">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">Detail Pre-Order</h1>
      </div>

      <div className="w-full h-64 bg-orange-100 flex items-center justify-center text-orange-400">
        [Gambar Melon Kirin Susu]
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Melon Kirin Susu</h2>
            <p className="text-brand-green font-bold text-xl">Rp 40.000 <span className="text-gray-400 text-sm font-normal">/ kg</span></p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
            <span className="text-yellow-500 text-sm">⭐</span>
            <span className="font-bold text-sm">4.9/5</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-800 text-sm mb-3">Informasi Kuota</h3>
        <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center mb-6 border border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-1">Kuota Tersedia</p>
            <p className="font-bold text-brand-green text-lg">270 Kg</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">Total Kapasitas</p>
            <p className="font-bold text-brand-green text-lg">300 Kg</p>
          </div>
        </div>

        <h3 className="font-bold text-gray-800 text-sm mb-2">Deskripsi Produk</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Melon segar berkualitas dengan rasa manis, tekstur renyah, dan kaya vitamin. Cocok untuk camilan sehat setiap hari. 🍈
        </p>
      </div>

      <div className="fixed bottom-0 w-full max-w-md bg-white p-4 border-t border-gray-100">
        <button className="w-full bg-brand-green text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-green-700">
          Pre-Order
        </button>
      </div>
    </div>
  );
}