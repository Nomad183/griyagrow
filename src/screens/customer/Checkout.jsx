import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Customer.module.css';
import { useCustomer } from './CustomerContext.jsx';
import { Icon, formatRupiah } from './CustomerUI.jsx';

export default function Checkout() {
  const navigate = useNavigate();
  const { products, selectedCartItems, createOrder } = useCustomer();
  const [params] = useSearchParams();
  const directProductId = params.get('direct') === '1' ? params.get('product') : null;
  const checkoutItems = useMemo(() => {
    if (!directProductId) return selectedCartItems;
    const directProduct = products.find((item) => item.id === directProductId);
    return directProduct ? [{ ...directProduct, qty: 1 }] : [];
  }, [directProductId, products, selectedCartItems]);
  const [receiver, setReceiver] = useState('Fathan F.');
  const [phone, setPhone] = useState('081234567890');
  const [pickupMethod, setPickupMethod] = useState('Kirim');
  const [address, setAddress] = useState('Jl. Ahmad Yani No.10, Kendari');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');
  const subtotal = useMemo(() => checkoutItems.reduce((sum, item) => sum + item.price * item.qty, 0), [checkoutItems]);
  const shipping = pickupMethod === 'Kirim' ? 15000 : 0;
  const itemCount = checkoutItems.reduce((sum, item) => sum + item.qty, 0);

  const submit = (event) => {
    event.preventDefault();
    if (!checkoutItems.length) { setError('Belum ada produk yang bisa diproses.'); return; }
    if (!receiver.trim() || !phone.trim() || !paymentMethod || (pickupMethod === 'Kirim' && !address.trim())) {
      setError('Lengkapi informasi penerima, alamat, dan metode pembayaran.'); return;
    }
    const id = createOrder({ receiver, phone, pickupMethod, address, paymentMethod, items: checkoutItems, removeFromCart: !directProductId });
    if (id) navigate(`/customer/order-success?order=${encodeURIComponent(id)}`);
  };

  return (
    <form className={styles.formPage} onSubmit={submit}>
      <header className={styles.simpleHeader}><button type="button" onClick={() => navigate(-1)} aria-label="Kembali"><Icon name="back" size={28} /></button><h1>Checkout</h1></header>
      <div className={styles.checkoutContent}>
        <section className={styles.formSection}>
          <h2>Informasi Penerima</h2>
          <div className={styles.receiverBox}><input aria-label="Nama penerima" value={receiver} onChange={(e) => setReceiver(e.target.value)} /><input aria-label="Nomor telepon" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" /></div>
        </section>
        <section className={styles.formSection}>
          <h2>Metode Pengambilan</h2>
          <div className={styles.choiceRow}>
            {['Kirim', 'Ambil Sendiri'].map((method) => <button type="button" key={method} className={pickupMethod === method ? styles.choiceActive : ''} onClick={() => setPickupMethod(method)}>{method}</button>)}
          </div>
          {pickupMethod === 'Kirim' && <input className={styles.textField} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Alamat lengkap" aria-label="Alamat pengiriman" />}
          {pickupMethod === 'Ambil Sendiri' && <div className={styles.pickupHint}><Icon name="pin" size={20} /> Pengambilan di greenhouse Melon Adopsiku, Kendari.</div>}
        </section>
        <section className={styles.formSection}>
          <h2>Metode Pembayaran</h2>
          <div className={styles.selectWrap}><select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} aria-label="Metode pembayaran"><option value="">Pilih Metode Pembayaran</option><option value="Transfer Bank">Transfer Bank</option><option value="QRIS">QRIS</option><option value="Bayar di Tempat">Bayar di Tempat</option></select><Icon name="chevron" size={22} /></div>
        </section>
        <section className={styles.formSection}>
          <h2>Ringkasan Pesanan</h2>
          <div className={styles.checkoutSummary}>
            {checkoutItems.map((item) => <div className={styles.summaryLine} key={item.id}><span>{item.name} x {item.qty}</span><span>{formatRupiah(item.price * item.qty)}</span></div>)}
            <div className={styles.summaryRule} />
            <div className={styles.summaryLine}><span>Subtotal ({itemCount} Item)</span><span>{formatRupiah(subtotal)}</span></div>
            <div className={styles.summaryLine}><span>Ongkos Kirim</span><span>{formatRupiah(shipping)}</span></div>
            <div className={styles.summaryRule} />
            <div className={`${styles.summaryLine} ${styles.summaryEmphasis}`}><strong>Total</strong><strong>{formatRupiah(subtotal + shipping)}</strong></div>
          </div>
        </section>
        {error && <p className={styles.formError} role="alert">{error}</p>}
      </div>
      <div className={styles.stickyFormAction}><button type="submit" className={styles.primaryAction}>Buat Pesanan</button></div>
    </form>
  );
}

export function AdoptionCheckout() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const productId = params.get('product') || 'bibit-g-princess';
  const { products, createAdoption } = useCustomer();
  const product = products.find((item) => item.id === productId) || products.find((item) => item.id === 'bibit-g-princess');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (!paymentMethod) { setError('Pilih metode pembayaran terlebih dahulu.'); return; }
    const id = createAdoption({ productId: product.id, paymentMethod });
    if (id) navigate(`/customer/adoption-success?adoption=${encodeURIComponent(id)}`);
  };

  return (
    <form className={styles.formPage} onSubmit={submit}>
      <header className={styles.simpleHeader}><button type="button" onClick={() => navigate(-1)} aria-label="Kembali"><Icon name="back" size={28} /></button><h1>Konfirmasi Adopsi</h1></header>
      <div className={styles.checkoutContent}>
        <div className={styles.adoptionProductRow}><div className={styles.miniMedia}><Icon name="leaf" size={27} /></div><div><strong>{product.name}</strong><b>{formatRupiah(product.price)}</b></div></div>
        <section className={styles.adoptionInfo}><h2>Informasi Adopsi (Pre-Order)</h2><p>Sistem adopsi ini adalah layanan Pre-Order eksklusif. Kamu membeli dan mengamankan slot melon sejak fase bibit. Kami yang rawat sepenuh hati di greenhouse, kamu akan mendapat update pertumbuhannya hingga siap dipanen!</p></section>
        <section className={styles.formSection}><h2>Metode Pembayaran</h2><div className={styles.selectWrap}><select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} aria-label="Metode pembayaran"><option value="">Pilih Metode Pembayaran</option><option value="Transfer Bank">Transfer Bank</option><option value="QRIS">QRIS</option><option value="Bayar di Tempat">Bayar di Tempat</option></select><Icon name="chevron" size={22} /></div></section>
        <div className={styles.checkoutSummary}><h2>Ringkasan Tagihan</h2><div className={styles.summaryLine}><span>Subtotal Adopsi</span><span>{formatRupiah(product.price)}</span></div><div className={styles.summaryRule} /><div className={`${styles.summaryLine} ${styles.summaryEmphasis}`}><strong>Total</strong><strong>{formatRupiah(product.price)}</strong></div></div>
        {error && <p className={styles.formError} role="alert">{error}</p>}
      </div>
      <div className={styles.stickyFormAction}><button type="submit" className={styles.primaryAction}>Buat Pesanan</button></div>
    </form>
  );
}
