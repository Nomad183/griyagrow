import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Customer.module.css';
import { Icon } from './CustomerUI.jsx';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const orderId = params.get('order');
  const isAdoption = !!params.get('adoption');
  return (
    <div className={styles.successPage}>
      <div className={styles.successIcon}><Icon name="check" size={65} /></div>
      <h1>{isAdoption ? 'Adopsi Berhasil Dibuat' : 'Pesanan Anda Berhasil Dibuat'}</h1>
      <p>{isAdoption ? 'Tanaman adopsi sudah masuk ke daftar Melon Saya.' : 'Lihat detail pesanan Anda pada menu Pesanan.'}</p>
      {orderId && <small>{orderId}</small>}
      <button type="button" className={styles.primaryAction} onClick={() => navigate(isAdoption ? '/customer/my-melon' : '/customer/orders')}>{isAdoption ? 'Lihat Melon Saya' : 'Cek Pesanan'}</button>
      <button type="button" className={styles.textAction} onClick={() => navigate('/customer/home')}>Kembali ke Beranda</button>
    </div>
  );
}
