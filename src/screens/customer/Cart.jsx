import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Customer.module.css';
import { useCustomer } from './CustomerContext.jsx';
import { Icon, MediaPlaceholder, ProductMedia, formatRupiah } from './CustomerUI.jsx';

export default function Cart() {
  const navigate = useNavigate();
  const { products, cart, setCartQuantity, toggleCartItem, selectedCartItems } = useCustomer();
  const selectedTotal = selectedCartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const selectedCount = selectedCartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className={styles.fullPageWithFooter}>
      <header className={styles.simpleHeader}><button type="button" onClick={() => navigate(-1)} aria-label="Kembali"><Icon name="back" size={28} /></button><h1>Keranjang saya</h1></header>
      <div className={styles.cartList}>
        {cart.map((cartItem) => {
          const product = products.find((entry) => entry.id === cartItem.productId);
          if (!product) return null;
          return (
            <article key={cartItem.productId} className={`${styles.cartItem} ${cartItem.selected ? styles.cartItemSelected : ''}`}>
              <input type="checkbox" checked={!!cartItem.selected} onChange={() => toggleCartItem(cartItem.productId)} aria-label={`Pilih ${product.name}`} />
              <ProductMedia product={product} className={styles.cartProductImage} />
              <div className={styles.cartProductInfo}><strong>{product.name}</strong><b>{formatRupiah(product.price)}</b></div>
              <div className={styles.quantityControl}>
                <button type="button" onClick={() => setCartQuantity(product.id, cartItem.qty - 1)} aria-label="Kurangi jumlah"><Icon name="minus" size={17} /></button>
                <span>{cartItem.qty}</span>
                <button type="button" onClick={() => setCartQuantity(product.id, cartItem.qty + 1)} aria-label="Tambah jumlah"><Icon name="plus" size={17} /></button>
              </div>
            </article>
          );
        })}
        {!cart.length && <div className={styles.emptyState}><div className={styles.emptyIcon}><Icon name="cart" size={45} /></div><h2>Keranjang masih kosong</h2><p>Temukan melon segar favoritmu di katalog.</p><button type="button" className={styles.primaryAction} onClick={() => navigate('/customer/catalog')}>Jelajahi Katalog</button></div>}
      </div>
      {!!cart.length && <section className={styles.cartSummary}>
        <h2>Ringkasan Pesanan</h2>
        <div className={styles.summaryLine}><span>Subtotal ({selectedCount} Item)</span><b>{formatRupiah(selectedTotal)}</b></div>
        <div className={styles.summaryTotal}><strong>Total</strong><strong>{formatRupiah(selectedTotal)}</strong></div>
        <button type="button" className={styles.primaryAction} disabled={!selectedCartItems.length} onClick={() => navigate('/customer/checkout')}>Pesan</button>
        {!selectedCartItems.length && <small className={styles.helperText}>Pilih minimal satu produk untuk melanjutkan.</small>}
      </section>}
    </div>
  );
}
