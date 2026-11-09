import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const CUSTOMER_PRODUCTS = [
  { id: 'melon-kirin', image: '/assets/products/melon-kirin.png', name: 'Melon Kirin', category: 'ready', categoryLabel: 'Siap Panen', price: 40000, rating: '4.9', unit: 'kg', description: 'Melon segar dengan rasa manis, tekstur renyah, dan aroma yang khas. Dipanen saat tingkat kematangannya optimal.', tags: ['100% Organik', 'Garansi Segar'], tone: 'melon-gold' },
  { id: 'melon-g-princess', image: '/assets/products/melon-g-princess.png', featuredPrice: 85000, name: 'Melon G. Princess', category: 'ready', categoryLabel: 'Siap Panen', price: 40000, rating: '4.9', unit: 'kg', description: 'Melon premium dengan daging buah lembut dan rasa manis yang seimbang. Cocok dinikmati bersama keluarga.', tags: ['100% Organik', 'Garansi Segar'], tone: 'melon-cream' },
  { id: 'melon-green-charm', image: '/assets/products/melon-green-charm.png', name: 'Melon Green Charm', category: 'ready', categoryLabel: 'Siap Panen', price: 40000, rating: '4.9', unit: 'kg', description: 'Melon berdaging hijau dengan sensasi segar dan tekstur yang lembut.', tags: ['100% Organik', 'Garansi Segar'], tone: 'melon-green' },
  { id: 'melon-kimono', image: '/assets/products/melon-kimono.png', featuredPrice: 50000, name: 'Melon Kimono', category: 'ready', categoryLabel: 'Siap Panen', price: 40000, rating: '4.9', unit: 'kg', description: 'Melon dengan aroma harum dan rasa manis yang menyegarkan.', tags: ['100% Organik', 'Garansi Segar'], tone: 'melon-orange' },
  { id: 'melon-s-emerald', image: '/assets/products/melon-s-emerald.png', name: 'Melon S. Emerald', category: 'ready', categoryLabel: 'Siap Panen', price: 40000, rating: '4.9', unit: 'kg', description: 'Melon dengan daging buah hijau cerah dan rasa manis yang menyegarkan.', tags: ['100% Organik', 'Garansi Segar'], tone: 'melon-green' },
  { id: 'melon-kirin-susu', image: '/assets/products/melon-kirin-susu.png', name: 'Melon Kirin Susu', category: 'ready', categoryLabel: 'Siap Panen', price: 40000, rating: '4.9', unit: 'kg', description: 'Melon berwarna krem dengan rasa lembut dan manis.', tags: ['100% Organik', 'Garansi Segar'], tone: 'melon-cream' },
  
  // Adoption categories
  { id: 'bibit-kirin', image: '/assets/products/melon-kirin.png', name: 'Bibit Melon Kirin', category: 'adoption', categoryLabel: 'Adopsi', price: 40000, rating: '4.9', unit: 'paket', description: 'Adopsi tanaman melon Kirin dan pantau pertumbuhannya sejak fase bibit hingga siap panen.', tags: ['Paket Adopsi', 'Update Berkala'], tone: 'seedling' },
  { id: 'bibit-sumo', image: '/assets/products/bibit-melon-sumo.png', name: 'Bibit Melon Sumo', category: 'adoption', categoryLabel: 'Adopsi', price: 40000, rating: '4.9', unit: 'paket', description: 'Amankan slot tanaman melon Sumo sejak fase bibit. Perkembangannya dirawat oleh tim greenhouse.', tags: ['Paket Adopsi', 'Update Berkala'], tone: 'seedling' },
  { id: 'bibit-g-princess', image: '/assets/products/bibit-melon-g-princess.png', name: 'Bibit Melon G. Princess', category: 'adoption', categoryLabel: 'Adopsi', price: 40000, rating: '4.9', unit: 'paket', description: 'Adopsi tanaman melon G. Princess Anda sendiri. Pantau pertumbuhannya dari bibit hingga panen.', tags: ['Paket Adopsi', 'Update Berkala'], tone: 'seedling' },
];

const DEMO_ORDERS = [
  {
    id: 'INV/B2C/692906', title: 'Melon Kirin + 2 Produk lain', date: '04 Nov 2026', status: 'Diproses', total: 130000,
    shipping: 15000, items: [
      { productId: 'melon-kirin', name: 'Melon Kirin', price: 40000, qty: 1 },
      { productId: 'melon-g-princess', name: 'Melon G. Princess', price: 40000, qty: 1 },
      { productId: 'melon-kimono', name: 'Melon Kimono', price: 40000, qty: 1 },
    ],
  },
  {
    id: 'INV/B2C/692905', title: 'Melon Kirin', date: '04 Nov 2026', status: 'Diproses', total: 50000,
    shipping: 10000, items: [{ productId: 'melon-kirin', name: 'Melon Kirin', price: 40000, qty: 1 }],
  },
];

const CustomerContext = createContext(null);
const STORAGE_KEY = 'melon-adopsiku-customer-v1';

function readSavedState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function CustomerProvider({ children }) {
  const saved = useMemo(() => readSavedState(), []);
  const [cart, setCart] = useState(saved?.cart ?? []);
  const [orders, setOrders] = useState(saved?.orders ?? DEMO_ORDERS);
  const [adoptions, setAdoptions] = useState(saved?.adoptions ?? []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, orders, adoptions }));
    } catch (error) {
      console.warn('Data demo customer tidak dapat disimpan ke localStorage:', error);
    }
  }, [cart, orders, adoptions]);

  const addToCart = (productId, qty = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) return current.map((item) => item.productId === productId ? { ...item, qty: item.qty + qty, selected: true } : item);
      return [...current, { productId, qty, selected: true }];
    });
  };

  const setCartQuantity = (productId, qty) => {
    setCart((current) => qty <= 0 ? current.filter((item) => item.productId !== productId) : current.map((item) => item.productId === productId ? { ...item, qty } : item));
  };

  const toggleCartItem = (productId) => {
    setCart((current) => current.map((item) => item.productId === productId ? { ...item, selected: !item.selected } : item));
  };

  const selectedCartItems = cart.filter((item) => item.selected).map((item) => {
    const product = CUSTOMER_PRODUCTS.find((entry) => entry.id === item.productId);
    return product ? { ...product, qty: item.qty } : null;
  }).filter(Boolean);

  const createOrder = ({ receiver, phone, pickupMethod, address, paymentMethod, items: itemsOverride, removeFromCart = true }) => {
    const orderItems = itemsOverride || selectedCartItems;
    if (!orderItems.length) return null;
    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = pickupMethod === 'Kirim' ? 15000 : 0;
    const id = `INV/B2C/${String(Date.now()).slice(-6)}`;
    const order = {
      id,
      title: orderItems.length > 1 ? `${orderItems[0].name} + ${orderItems.length - 1} Produk lain` : orderItems[0].name,
      date: new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date()),
      status: 'Diproses', receiver, phone, pickupMethod, address, paymentMethod, shipping,
      subtotal, total: subtotal + shipping,
      items: orderItems.map((item) => ({ productId: item.id, name: item.name, price: item.price, qty: item.qty })),
    };
    setOrders((current) => [order, ...current]);
    if (removeFromCart) {
      const selectedIds = new Set(orderItems.map((item) => item.id));
      setCart((current) => current.filter((item) => !selectedIds.has(item.productId)));
    }
    return id;
  };

  const createAdoption = ({ productId, paymentMethod }) => {
    const product = CUSTOMER_PRODUCTS.find((entry) => entry.id === productId);
    if (!product) return null;
    const id = `ADOPT-${String(Date.now()).slice(-6)}`;
    const adoption = {
      id, productId, name: product.name, price: product.price, paymentMethod,
      stage: 'Persemaian', progress: 10, estimate: '18 Nov 2026', createdAt: new Date().toISOString(),
    };
    setAdoptions((current) => [adoption, ...current]);
    return id;
  };

  const value = {
    products: CUSTOMER_PRODUCTS,
    cart,
    orders,
    adoptions,
    addToCart,
    setCartQuantity,
    toggleCartItem,
    createOrder,
    createAdoption,
    selectedCartItems,
    cartCount: cart.reduce((sum, item) => sum + item.qty, 0),
  };

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
}

export function useCustomer() {
  const value = useContext(CustomerContext);
  if (!value) throw new Error('useCustomer harus digunakan di dalam CustomerProvider.');
  return value;
}
