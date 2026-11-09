import { ChevronLeft, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MitraOrderDetail() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white p-4 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">Detail Pesanan</h1>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-green-800 text-xs font-medium mb-1">Status</p>
            <p className="text-brand-green font-bold">Menunggu Konfirmasi</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-green border border-green-100">
            <Package size={20} />
          </div>
        </div>

        <div>
          <h2 className="font-bold text-gray-800 mb-3 text-sm">Informasi Produk</h2>
          <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-center">
            <div className="w-16 h-16 bg-orange-50 rounded-lg flex items-center justify-center text-xs text-orange-400">
              Img
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Melon Kirin</h3>
              <p className="text-xs text-gray-500">40 Kg x Rp 75.000</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-gray-800 mb-3 text-sm mt-2">Rincian Transaksi</h2>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Nomor Pesanan</span>
              <span className="font-bold text-gray-800">PRE/700650</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tanggal</span>
              <span className="font-bold text-gray-800">4 Nov 2026</span>
            </div>
            <div className="flex justify-between text-sm pb-3 border-b border-gray-100">
              <span className="text-gray-500">Ongkos Kirim</span>
              <span className="text-gray-800">Rp 10.000</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="font-bold text-gray-800 text-sm">Total Keseluruhan</span>
              <span className="font-bold text-brand-green text-lg">Rp 3.760.000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}