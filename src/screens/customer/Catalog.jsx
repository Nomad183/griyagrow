import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Customer.module.css';
import { useCustomer } from './CustomerContext.jsx';
import { Icon, ProductCard } from './CustomerUI.jsx';

const FILTERS = [
  { id: 'all', label: 'Semua' },
  { id: 'ready', label: 'Siap Panen' },
  { id: 'adoption', label: 'Adopsi' },
];

export default function Catalog() {
  const navigate = useNavigate();
  const location = useLocation();
  const { products, addToCart } = useCustomer();
  const requestedFilter = new URLSearchParams(location.search).get('filter');
  const [filter, setFilter] = useState(requestedFilter === 'adoption' ? 'adoption' : 'all');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  useEffect(() => { if (!toast) return undefined; const timer = window.setTimeout(() => setToast(''), 2200); return () => window.clearTimeout(timer); }, [toast]);
  const visible = useMemo(() => products.filter((product) => (filter === 'all' || product.category === filter) && product.name.toLowerCase().includes(search.toLowerCase())), [products, filter, search]);

  return (
    <div className={styles.tabPage}>
      <header className={styles.catalogHeader}>
        <h1>Katalog</h1>
        <button type="button" className={styles.headerCart} onClick={() => navigate('/customer/cart')} aria-label="Buka keranjang"><Icon name="cart" size={30} /></button>
      </header>
      <div className={styles.catalogSearch}><Icon name="search" size={28} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari varietas melon..." /><button type="button" onClick={() => setSearch('')} aria-label="Hapus pencarian"><Icon name="close" size={19} /></button></div>
      <div className={styles.filterChips} role="tablist" aria-label="Filter kategori">
        {FILTERS.map((item) => <button type="button" role="tab" aria-selected={filter === item.id} key={item.id} className={filter === item.id ? styles.chipActive : ''} onClick={() => setFilter(item.id)}>{item.label}</button>)}
      </div>
      <div className={styles.productGrid}>
        {visible.map((product) => <ProductCard key={product.id} product={product} onOpen={() => navigate(`/customer/product/${product.id}`)} onAdd={() => { if (product.category === 'adoption') navigate(`/customer/product/${product.id}`); else { addToCart(product.id); setToast('Produk berhasil ditambahkan ke keranjang'); } }} />)}
      </div>
      {toast && <div className={styles.toastMessage} role="status">{toast}</div>}
      {!visible.length && <div className={styles.emptySearch}><Icon name="search" size={35} /><strong>Produk tidak ditemukan</strong><span>Coba kata kunci atau kategori lain.</span></div>}
    </div>
  );
}
