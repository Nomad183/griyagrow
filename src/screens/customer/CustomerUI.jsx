import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useCustomer } from './CustomerContext.jsx';

export function Icon({ name, size = 24, className = '' }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const shapes = {
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></>,
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8a3 3 0 0 1 6 0M9 13c0 2 1.3 3 3 3s3-1 3-3" /></>,
    leaf: <><path d="M20.5 3.5C12 3.5 5 6.5 5 14a6 6 0 0 0 6 6c7.5 0 9.5-8.5 9.5-16.5Z" /><path d="M3 22c3-6 7-9 13-12" /></>,
    clipboard: <><rect x="5" y="5" width="14" height="17" rx="2"/><path d="M9 5V3h6v2M8 10h8M8 14h8M8 18h5"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    cart: <><path d="M3 4h2l2.2 11.2A2 2 0 0 0 9.2 17h8.9a2 2 0 0 0 2-1.6L22 8H6"/><circle cx="10" cy="21" r="1"/><circle cx="18" cy="21" r="1"/></>,
    search: <><circle cx="10.8" cy="10.8" r="7.3"/><path d="m16.2 16.2 5 5"/></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 22h4"/></>,
    filter: <><path d="M3 4h18l-7 8v7l-4 2v-9L3 4Z"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    minus: <path d="M5 12h14" />,
    back: <path d="m15 18-6-6 6-6" />,
    chevron: <path d="m7 10 5 5 5-5" />,
    check: <path d="m5 12 4 4L19 6" />,
    scan: <><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/><path d="M7 12h10"/></>,
    camera: <><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3"/><path d="m8 6 1-2h6l1 2"/></>,
    flash: <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.6 2.6 0 1 1 4.7 1.5c-.9 1.1-2.2 1.2-2.2 3M12 17.5h.01"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    shield: <><path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.3 2.3 4.7-5"/></>,
    star: <path d="m12 2 3 6.2 6.8 1-4.9 4.8 1.2 6.8-6.1-3.2-6.1 3.2 1.2-6.8L2.2 9.2l6.8-1L12 2Z" fill="currentColor" stroke="none" />,
  };
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...common}>{shapes[name] || shapes.leaf}</svg>;
}

const NAV_ITEMS = [
  { to: '/customer/home', label: 'Beranda', icon: 'home' },
  { to: '/customer/catalog', label: 'Katalog', icon: 'bag' },
  { to: '/customer/my-melon', label: 'Melon Saya', icon: 'leaf' },
  { to: '/customer/orders', label: 'Pesanan', icon: 'clipboard' },
  { to: '/customer/profile', label: 'Profil', icon: 'user' },
];

export function CustomerFrame({ children, active, showNav = true, dark = false }) {
  const { cartCount } = useCustomer();
  return (
    <div className={`w-full h-[100svh] min-h-[680px] flex flex-col bg-white text-gray-900 overflow-hidden font-sans ${dark ? 'bg-[#050505] text-white' : ''}`}>
      {/* StatusBar removed for web — browser has its own */}
      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pb-[100px]">{children}</main>
      {showNav && (
        <nav className="relative z-10 min-h-[89px] flex items-start justify-around px-1.5 pt-3 pb-6 bg-white/98 shadow-[0_-7px_22px_rgba(0,0,0,0.12)]">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={`relative flex-1 flex flex-col items-center justify-start gap-1 text-[10px] font-bold no-underline ${active === item.label ? 'text-brand-green' : 'text-[#b4b5b9]'}`}>
              <span className="relative h-8 flex items-center justify-center">
                <Icon name={item.icon} size={27} />
                {item.label === 'Katalog' && cartCount > 0 ? <i className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 grid place-items-center text-white bg-red-500 rounded-full text-[9px] not-italic">{cartCount}</i> : null}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
          {/* Home indicator pill removed for web */}
        </nav>
      )}
      {!showNav && <div className="hidden" />}
    </div>
  );
}

export function CustomerTabsLayout() {
  const { pathname } = useLocation();
  const active = NAV_ITEMS.find((item) => pathname.startsWith(item.to))?.label || 'Beranda';
  return <CustomerFrame active={active}><Outlet /></CustomerFrame>;
}

export function CustomerPageLayout() {
  const { pathname } = useLocation();
  return <CustomerFrame dark={pathname.endsWith('/scan')} showNav={false}><Outlet /></CustomerFrame>;
}

export function PageHeader({ title, back = -1, right = null, centered = false }) {
  return (
    <header className={`h-[72px] min-h-[72px] flex items-center px-[22px] border-b border-[#ececef] shadow-[0_4px_9px_rgba(0,0,0,0.07)] bg-white ${centered ? 'justify-center relative' : 'justify-between'}`}>
      <button type="button" className="w-9 h-[42px] mr-3 p-0 border-0 grid place-items-center text-[#111] bg-transparent cursor-pointer" onClick={() => window.history.length > 1 ? window.history.back() : (window.location.href = '/customer/home')} aria-label="Kembali"><Icon name="back" size={27} /></button>
      <h1 className="m-0 text-xl font-extrabold">{title}</h1>
      <div className="ml-auto">{right}</div>
    </header>
  );
}

export function MediaPlaceholder({ label = 'Foto produk', className = '' }) {
  return <div className={`flex flex-col items-center justify-center bg-gray-100 text-gray-400 ${className}`} role="img" aria-label={`${label}; aset gambar belum dipasang`}><Icon name="leaf" size={34} /><span>{label}</span></div>;
}

export function ProductMedia({ product, className = '' }) {
  if (product?.image) return <img className={`object-cover ${className}`} src={product.image} alt={product.name} />;
  return <MediaPlaceholder label={product?.name || 'Foto produk'} className={className} />;
}

export function ProductCard({ product, onAdd, onOpen }) {
  return (
    <article className="relative flex flex-col bg-[#f9fafb] border border-[#d1d1d6] rounded-[20px] p-4 shadow-sm">
      <button type="button" className="flex flex-col items-start bg-transparent border-0 cursor-pointer text-left w-full" onClick={onOpen} aria-label={`Lihat ${product.name}`}>
        <ProductMedia product={product} className="w-full h-[120px] rounded-xl mb-3" />
        <strong className="text-sm font-bold text-gray-900 mb-1">{product.name}</strong>
        <span className="flex items-center gap-1 text-xs text-gray-500 mb-2"><Icon name="star" size={17} /> {product.rating}</span>
        <b className="text-sm font-bold text-brand-green">{formatRupiah(product.price)}</b>
      </button>
      <button type="button" className="absolute bottom-4 right-4 w-[38px] h-[38px] bg-brand-green text-white rounded-full flex items-center justify-center border-0 cursor-pointer shadow-md" onClick={onAdd} aria-label={`Tambahkan ${product.name}`}><Icon name="plus" size={24} /></button>
    </article>
  );
}

export function formatRupiah(value) {
  return `Rp ${Number(value || 0).toLocaleString('id-ID')}`;
}

export function FieldLabel({ children }) {
  return <label className="block text-xs font-bold text-gray-700 mb-1.5">{children}</label>;
}