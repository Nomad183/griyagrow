import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Customer.module.css';
import { useCustomer } from './CustomerContext.jsx';
import { Icon, formatRupiah } from './CustomerUI.jsx';

export default function Orders() {
  const navigate = useNavigate();
  const { orders } = useCustomer();
  return (
    <div className={styles.tabPage}>
      <header className={styles.centerTitleHeader}><h1>Daftar Pesanan</h1></header>
      <div className={styles.orderList}>
        {orders.map((order) => (
          <article className={styles.orderCard} key={order.id}>
            <div className={styles.orderTop}><strong>{order.id}</strong><span className={styles.statusPill}>{order.status || 'Diproses'}</span></div>
            <div className={styles.orderDivider} />
            <div className={styles.orderProduct}><div className={styles.orderIcon}><Icon name="bag" size={31} /></div><div><strong>{order.title || order.items?.[0]?.name || 'Pesanan Melon'}</strong><span>{order.date}</span></div></div>
            <div className={styles.orderTotal}><span>Total Belanja</span><strong>{formatRupiah(order.total)}</strong></div>
            <button type="button" className={styles.orderDetailButton} onClick={() => navigate(`/customer/order/${encodeURIComponent(order.id)}`)}>Lihat Detail Pesanan</button>
          </article>
        ))}
        {!orders.length && <div className={styles.emptyState}><div className={styles.emptyIcon}><Icon name="clipboard" size={42} /></div><h2>Belum ada pesanan</h2><p>Pesanan yang kamu buat akan muncul di sini.</p><button type="button" className={styles.primaryAction} onClick={() => navigate('/customer/catalog')}>Mulai Belanja</button></div>}
      </div>
    </div>
  );
}

export function OrderDetail() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { orders } = useCustomer();
  const decodedId = decodeURIComponent(orderId || '');
  const order = orders.find((item) => item.id === decodedId) || orders[0];
  if (!order) return <div className={styles.detailPage}><header className={styles.simpleHeader}><button type="button" onClick={() => navigate(-1)}><Icon name="back" /></button><h1>Detail Pesanan</h1></header><p className={styles.emptyNote}>Pesanan tidak ditemukan.</p></div>;
  return (
    <div className={styles.detailPage}>
      <header className={styles.simpleHeader}><button type="button" onClick={() => navigate(-1)} aria-label="Kembali"><Icon name="back" size={28} /></button><h1>Detail Pesanan</h1></header>
      <div className={styles.orderDetailContent}>
        <div className={styles.orderStatusBox}><div><span>Status</span><strong>{order.status || 'Diproses'}</strong></div><Icon name="bag" size={42} /></div>
        <h2>Informasi Produk</h2>
        {(order.items || []).map((item) => <div className={styles.orderDetailProduct} key={item.productId || item.name}><div className={styles.miniMedia}><Icon name="leaf" size={25} /></div><div><strong>{item.name}</strong><span>{item.qty} item x {formatRupiah(item.price)}</span></div></div>)}
        <h2>Rincian Transaksi</h2>
        <div className={styles.transactionBox}>
          <div className={styles.summaryLine}><span>Nomor Pesanan</span><strong>{order.id}</strong></div>
          <div className={styles.summaryLine}><span>Tanggal</span><strong>{order.date}</strong></div>
          {order.pickupMethod && <div className={styles.summaryLine}><span>Pengambilan</span><span>{order.pickupMethod}</span></div>}
          <div className={styles.summaryLine}><span>Ongkos Kirim</span><span>{formatRupiah(order.shipping || 0)}</span></div>
          <div className={styles.summaryRule} />
          <div className={`${styles.summaryLine} ${styles.summaryEmphasis}`}><strong>Total Keseluruhan</strong><strong>{formatRupiah(order.total)}</strong></div>
        </div>
      </div>
    </div>
  );
}

