import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Customer.module.css';
import { Icon } from './CustomerUI.jsx';

export default function EduTani() {
  const navigate = useNavigate();
  return (
    <div className={styles.eduArticlePage}>
      <header className={styles.simpleHeader}><button type="button" onClick={() => navigate(-1)} aria-label="Kembali"><Icon name="back" size={28} /></button><h1>Edu-Tani</h1></header>
      <div className={styles.articleMedia}><Icon name="leaf" size={54} /><span>Slot aset greenhouse</span></div>
      <article className={styles.articleBody}>
        <span className={styles.eduPill}>TIPS GREENHOUSE</span>
        <h2>Fase Pertumbuhan Melon Hidroponik</h2>
        <p className={styles.articleDate}>Dipublikasikan: 2 Nov 2026</p>
        <p>Menanam melon dalam sistem greenhouse hidroponik memerlukan pemantauan ketat pada setiap fasenya untuk menghasilkan buah yang manis (Brix tinggi) dan bertekstur sempurna.</p>
        <h3>1. Persemaian (0–10 HST)</h3>
        <p>Benih melon disemai pada media tanam khusus seperti rockwool. Pada fase ini, kelembapan dijaga ekstra ketat agar benih dapat berkecambah dan tumbuh seragam.</p>
        <h3>2. Vegetatif (11–30 HST)</h3>
        <p>Tanaman difokuskan pada pertumbuhan daun dan batang. Nutrisi Nitrogen sangat krusial pada tahap ini untuk mendukung pembentukan tajuk tanaman.</p>
        <h3>3. Generatif &amp; Pembentukan Buah (31–60 HST)</h3>
        <p>Fase penyerbukan dan seleksi buah. Hanya 1–2 buah terbaik yang disisakan pada setiap tanaman untuk mengoptimalkan perkembangannya.</p>
      </article>
    </div>
  );
}
