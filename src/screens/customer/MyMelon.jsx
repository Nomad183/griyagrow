import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Customer.module.css';
import { useCustomer } from './CustomerContext.jsx';
import { Icon } from './CustomerUI.jsx';

export default function MyMelon() {
  const navigate = useNavigate();
  const { adoptions } = useCustomer();
  return (
    <div className={styles.tabPage}>
      <header className={styles.centerTitleHeader}><h1>Melon Adopsiku</h1><button type="button" onClick={() => navigate('/customer/catalog?filter=adoption')} aria-label="Tambah adopsi"><Icon name="plus" size={31} /></button></header>
      {adoptions.length ? <div className={styles.adoptionList}>
        {adoptions.map((item) => <button type="button" key={item.id} className={styles.adoptionCard} onClick={() => navigate(`/customer/melon/${item.id}`)}>
          <div className={styles.adoptionMedia}><Icon name="leaf" size={35} /></div>
          <div className={styles.adoptionInfo}><span className={styles.adoptionCode}>{item.id}</span><strong>{item.name}</strong><span>Estimasi panen: {item.estimate}</span><div className={styles.progressTrack}><i style={{ width: `${item.progress}%` }} /></div><small>{item.progress}% <b>•</b> {item.stage}</small></div>
        </button>)}
      </div> : <div className={styles.adoptionEmpty}><Icon name="leaf" size={65} /><p>Kamu belum mengadopsi tanaman apapun.</p><button type="button" className={styles.primaryAction} onClick={() => navigate('/customer/catalog?filter=adoption')}>Cari Bibit Adopsi</button></div>}
    </div>
  );
}

export function GrowthDetail() {
  const navigate = useNavigate();
  const { adoptions } = useCustomer();
  const { adoptionId } = useParams();
  const adoption = adoptions.find((item) => item.id === adoptionId) || adoptions[0];
  if (!adoption) return <div className={styles.detailPage}><header className={styles.simpleHeader}><button type="button" onClick={() => navigate(-1)}><Icon name="back" /></button><h1>Detail Pertumbuhan</h1></header><p className={styles.emptyNote}>Data adopsi belum tersedia.</p></div>;
  return (
    <div className={styles.detailPage}>
      <header className={styles.simpleHeader}><button type="button" onClick={() => navigate(-1)} aria-label="Kembali"><Icon name="back" size={28} /></button><h1>Detail Pertumbuhan</h1></header>
      <div className={styles.growthHero}><Icon name="leaf" size={70} /></div>
      <div className={styles.growthHeading}><span>Fase: {adoption.stage}</span><h1>{adoption.name}</h1><p>{adoption.id}</p></div>
      <section className={styles.timelineSection}><h2>Timeline Pertumbuhan</h2>
        <div className={styles.timelineItem}><i className={styles.timelineActive} /><div><strong>{adoption.stage} (Aktif)</strong><small>4 Nov 2026</small><p>Benih telah disemai dan sedang dipantau suhu serta kelembapannya di nursery.</p></div></div>
        <div className={styles.timelineItem}><i /><div><strong>Vegetatif</strong><small>Menunggu fase</small></div></div>
        <div className={styles.timelineItem}><i /><div><strong>Siap Panen</strong><small>Estimasi {adoption.estimate}</small></div></div>
      </section>
    </div>
  );
}

