import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Customer.module.css';
import { Icon } from './CustomerUI.jsx';

export default function Scan() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [flashOn, setFlashOn] = useState(false);
  const [fileName, setFileName] = useState('');
  return (
    <div className={styles.scanPage}>
      <button type="button" className={styles.scanBack} onClick={() => navigate(-1)} aria-label="Kembali"><Icon name="back" size={29} /></button>
      <h1>Scan QR Tanaman</h1>
      <p className={styles.scanIntro}>Arahkan kamera ke kode QR yang ada pada bedengan tanaman di greenhouse</p>
      <div className={styles.scanArea}>
        <div className={styles.scanCornerTopLeft} /><div className={styles.scanCornerTopRight} /><div className={styles.scanCornerBottomLeft} /><div className={styles.scanCornerBottomRight} />
        <div className={styles.scanGrid}><i /><i /><i /><i /></div><div className={styles.scanBeam} />
      </div>
      <p className={styles.scanHint}>{fileName || 'Deketin kameranya ke QR biar kebaca!'}</p>
      <p className={styles.scanStatus}>Lagi diproses ya...</p>
      <div className={styles.scanActions}>
        <button type="button" onClick={() => fileRef.current?.click()} aria-label="Ambil foto QR dari galeri"><Icon name="camera" size={29} /></button>
        <button type="button" className={flashOn ? styles.flashActive : ''} onClick={() => setFlashOn((value) => !value)} aria-label="Toggle flash"><Icon name="flash" size={28} /></button>
      </div>
      <input ref={fileRef} className={styles.hiddenFile} type="file" accept="image/*" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
      <p className={styles.scanFooter}>Ambil foto QR dari galeri atau pakai flash ya!</p>
      <small className={styles.scanDisclaimer}>Antarmuka pemindaian sudah disiapkan. Pembacaan QR kamera akan dihubungkan pada tahap integrasi scanner.</small>
    </div>
  );
}
