import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import styles from './Customer.module.css';
import { Icon } from './CustomerUI.jsx';

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [panel, setPanel] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/sign-in', { replace: true });
  };

  return (
    <div className={styles.profilePage}>
      <section className={styles.profileHero}>
        <div className={styles.avatar}>FF</div>
        <h1>Fathan F.</h1>
        <p>Fathan@gmail.com</p>
      </section>
      <div className={styles.profileOptions}>
        <h2>Pengaturan Akun</h2>
        <button type="button" onClick={() => setPanel('personal')}><Icon name="user" size={27} /><span>Informasi Pribadi</span><Icon name="arrow" size={23} /></button>
        <button type="button" onClick={() => setPanel('help')}><Icon name="help" size={27} /><span>Pusat Bantuan</span><Icon name="arrow" size={23} /></button>
        <button type="button" className={styles.logoutButton} onClick={handleLogout}>Keluar (Log Out)</button>
      </div>
      {panel && <div className={styles.modalBackdrop} role="presentation" onClick={() => setPanel('')}><section className={styles.profileModal} role="dialog" aria-modal="true" aria-labelledby="profile-modal-title" onClick={(e) => e.stopPropagation()}><button type="button" className={styles.modalClose} onClick={() => setPanel('')} aria-label="Tutup"><Icon name="close" size={22} /></button><h2 id="profile-modal-title">{panel === 'personal' ? 'Informasi Pribadi' : 'Pusat Bantuan'}</h2>{panel === 'personal' ? <div className={styles.profileModalContent}><span>Nama</span><strong>Fathan F.</strong><span>Email</span><strong>Fathan@gmail.com</strong><span>Nomor Telepon</span><strong>081234567890</strong></div> : <p className={styles.profileHelpText}>Butuh bantuan terkait pesanan atau adopsi tanaman? Hubungi tim Melon Adopsiku melalui layanan pelanggan pada jam operasional.</p>}</section></div>}
    </div>
  );
}