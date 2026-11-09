import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomer } from './CustomerContext.jsx';
import { Icon, ProductMedia, formatRupiah } from './CustomerUI.jsx';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const { products } = useCustomer();
  const [search, setSearch] = useState('');
  const featured = useMemo(() => products.filter((item) => ['melon-g-princess', 'melon-kimono', 'melon-s-emerald'].includes(item.id)), [products]);
  const filtered = featured.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-full bg-white">
      <section className="min-h-[186px] px-5 pt-7 pb-8 text-white bg-brand-green rounded-b-[30px]">
        <div className="flex items-center gap-3">
          <Icon name="pin" size={31} />
          <div className="flex flex-col gap-0.5">
            <span className="text-xs opacity-95">Lokasi Anda</span>
            <strong className="text-[#f4e1ad] text-base leading-snug">Kendari, Sultra</strong>
          </div>
          <button className="ml-auto p-2 bg-white/20 rounded-xl text-white border-0 cursor-pointer" type="button" aria-label="Notifikasi"><Icon name="bell" size={27} /></button>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <div className="flex-1 flex items-center gap-2.5 px-4 py-3 bg-white/20 rounded-2xl">
            <Icon name="search" size={24} className="text-white" />
            <input className="w-full bg-transparent border-0 outline-none text-white placeholder-white/70 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari varietas melon..." />
          </div>
          <button type="button" className="p-3 bg-white/20 rounded-2xl border-0 text-white cursor-pointer" onClick={() => navigate('/customer/catalog')} aria-label="Filter katalog"><Icon name="filter" size={23} /></button>
        </div>
      </section>

      <div className="p-5 flex flex-col gap-6">
        <section className="bg-[#f8f9fa] border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold m-0 leading-snug">Melon Premium &amp;<br />Segar, Setiap Hari!</h2>
            <button type="button" className="px-4 py-2 bg-brand-green text-white font-bold rounded-xl text-xs w-max cursor-pointer border-0" onClick={() => navigate('/customer/catalog')}>Beli Sekarang</button>
          </div>
          <div className="text-brand-green font-bold text-2xl">🍈</div>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">Akses Cepat</h2>
          <div className="grid grid-cols-3 gap-3">
            <button type="button" className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer" onClick={() => navigate('/customer/scan')}>
              <span className="p-3 bg-emerald-100 text-brand-green rounded-xl"><Icon name="scan" size={27} /></span>
              <b className="text-xs text-gray-700">Scan QR</b>
            </button>
            <button type="button" className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer" onClick={() => navigate('/customer/catalog?filter=adoption')}>
              <span className="p-3 bg-emerald-100 text-brand-green rounded-xl"><Icon name="leaf" size={27} /></span>
              <b className="text-xs text-gray-700">Adopsi</b>
            </button>
            <button type="button" className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer" onClick={() => navigate('/customer/cart')}>
              <span className="p-3 bg-emerald-100 text-brand-green rounded-xl"><Icon name="cart" size={27} /></span>
              <b className="text-xs text-gray-700">Keranjang</b>
            </button>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900 m-0">Produk Unggulan</h2>
            <button type="button" className="text-brand-green font-bold text-xs bg-transparent border-0 cursor-pointer" onClick={() => navigate('/customer/catalog')}>Lihat Semua</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            {filtered.map((product) => (
              <button type="button" className="flex flex-col items-start min-w-[150px] p-3 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer text-left flex-shrink-0" key={product.id} onClick={() => navigate(`/customer/product/${product.id}`)}>
                <ProductMedia product={product} className="w-full h-32 rounded-xl mb-2 object-cover" />
                <strong className="text-xs font-bold text-gray-900 line-clamp-1 mb-1">{product.name}</strong>
                <b className="text-xs text-brand-green font-bold">{formatRupiah(product.featuredPrice || product.price)}</b>
              </button>
            ))}
            {!filtered.length && <p className="text-gray-400 text-sm">Produk tidak ditemukan.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}