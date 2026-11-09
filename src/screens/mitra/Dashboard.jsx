import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Mitra.Dashboard.module.css'; // Assuming you want modular CSS, or use inline styles below

const MitraDashboard = () => {
  return (
    <div className={styles.container}>
      {/* --- Status Bar Simulation --- */}
      <div className={styles.statusBar}>
        <span>9:41</span>
        <div className={styles.icons}>
          {/* Simple SVG icons for visual fidelity */}
          <svg width="20" height="13" viewBox="0 0 20 13" fill="none">
            <path d="M19.2 1.14623C19.2 0.513183 18.7224 0 18.1333 0H17.0667C16.4776 0 16 0.513183 16 1.14623V11.0802C16 11.7132 16.4776 12.2264 17.0667 12.2264H18.1333C18.7224 12.2264 19.2 11.7132 19.2 11.0802V1.14623ZM11.7659 2.44528H12.8326C13.4217 2.44528 13.8992 2.97078 13.8992 3.61902V11.0527C13.8992 11.7009 13.4217 12.2264 12.8326 12.2264H11.7659C11.1768 12.2264 10.6992 11.7009 10.6992 11.0527V3.61902C10.6992 2.97078 11.1768 2.44528 11.7659 2.44528ZM7.43411 5.09433H6.36745C5.77834 5.09433 5.30078 5.62652 5.30078 6.28301V11.0377C5.30078 11.6942 5.77834 12.2264 6.36745 12.2264H7.43411C8.02322 12.2264 8.50078 11.6942 8.50078 11.0377V6.28301C8.50078 5.62652 8.02322 5.09433 7.43411 5.09433ZM2.13333 7.53962H1.06667C0.477563 7.53962 0 8.06421 0 8.71132V11.0547C0 11.7018 0.477563 12.2264 1.06667 12.2264H2.13333C2.72244 12.2264 3.2 11.7018 3.2 11.0547V8.71132C3.2 8.06421 2.72244 7.53962 2.13333 7.53962Z" fill="black"/>
          </svg>
          <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
             <path d="M8.5713 2.46628C11.0584 2.46639 13.4504 3.38847 15.2529 5.04195C15.3887 5.1696 15.6056 5.16799 15.7393 5.03834L17.0368 3.77487C17.1045 3.70911 17.1422 3.62004 17.1417 3.52735C17.1411 3.43467 17.1023 3.34603 17.0338 3.28104C12.3028 -1.09368 4.83907 -1.09368 0.108056 3.28104C0.039524 3.34598 0.000639766 3.61996 7.82398e-06 3.52728C-0.000624118 3.61996 0.0370483 3.70906 0.104689 3.77487L1.40255 5.03834C1.53615 5.16819 1.75327 5.1698 1.88893 5.04195C3.69167 3.38836 6.08395 2.46628 8.5713 2.46628ZM8.56795 6.68656C9.92527 6.68647 11.2341 7.19821 12.2403 8.12234C12.3763 8.2535 12.5907 8.25065 12.7234 8.11593L14.0106 6.79663C14.0784 6.72742 14.1161 6.63355 14.1151 6.536C14.1141 6.43844 14.0746 6.34536 14.0054 6.27757C10.9416 3.38672 6.19688 3.38672 3.13305 6.27757C3.06384 6.34536 3.02435 6.43849 3.02345 6.53607C3.02254 6.63366 3.06028 6.72752 3.12822 6.79663L4.41513 8.11593C4.54778 8.25065 4.76215 8.2535 4.89823 8.12234C5.90368 7.19882 7.21152 6.68713 8.56795 6.68656ZM11.0924 9.48011C11.0943 9.58546 11.0572 9.68703 10.9899 9.76084L8.81327 12.2156C8.74946 12.2877 8.66247 12.3283 8.5717 12.3283C8.48093 12.3283 8.39394 12.2877 8.33013 12.2156L6.1531 9.76084C6.08585 9.68697 6.04886 9.58537 6.05085 9.48002C6.05284 9.37467 6.09365 9.27491 6.16364 9.20429C7.55374 7.8904 9.58966 7.8904 10.9798 9.20429C11.0497 9.27497 11.0904 9.37476 11.0924 9.48011Z" fill="black"/>
          </svg>
          <svg width="28" height="13" viewBox="0 0 28 13" fill="none">
             <path d="M2 6C2 4.59987 2 3.8998 2.27248 3.36502C2.51217 2.89462 2.89462 2.51217 3.36502 2.27248C3.8998 2 4.59987 2 6 2H19C20.4001 2 21.1002 2 21.635 2.27248C22.1054 2.51217 22.4878 2.89462 2.27275 3.36502C23 3.8998 23 4.59987 23 6V7C23 8.40013 23 9.1002 22.7275 9.63498C22.4878 10.1054 22.1054 10.4878 21.635 10.7275C21.1002 11 20.4001 11 19 11H6C4.59987 11 3.8998 11 3.36502 10.7275C2.89462 10.4878 2.51217 10.1054 2.27248 9.63498C2 9.1002 2 8.40013 2 7V6Z" fill="black"/>
          </svg>
        </div>
      </div>

      {/* --- Header Section --- */}
      <div className={styles.header}>
        <div className={styles.onlineBadge}>
           <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M1.66675 8.33289C6.66675 2.77706 13.3334 2.77706 18.3334 8.33289M5.00008 11.6662C8.00008 8.33289 12.0001 8.33289 15.0001 11.6662" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.8334 14.9993C10.8334 15.4596 10.4603 15.8327 10.0001 15.8327C9.53984 15.8327 9.16675 15.4596 9.16675 14.9993C9.16675 14.5391 9.53984 14.166 10.0001 14.166C10.4603 14.166 10.8334 14.5391 10.8334 14.9993Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
           <span>Online</span>
        </div>
        
        <div className={styles.notificationBell}>
           <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M7.5 23.75V12.5C7.5 10.5109 8.29018 8.60322 9.6967 7.1967C11.1032 5.79018 13.0109 5 15 5C16.9891 5 18.8968 5.79018 20.3033 7.1967C21.7098 8.60322 22.5 10.5109 22.5 12.5V23.75M7.5 23.75H22.5M7.5 23.75H5M22.5 23.75H25M13.75 27.5H16.25" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.25 3.75C16.25 4.44036 15.6904 5 15 5C14.3096 5 13.75 4.44036 13.75 3.75C13.75 3.05964 14.3096 2.5 15 2.5C15.6904 2.5 16.25 3.05964 16.25 3.75Z" stroke="white" strokeWidth="2.5"/>
           </svg>
        </div>

        <h1>Halo!</h1>
        <p className={styles.userName}>Budi Santoso</p>
        <p className={styles.userRole}>PT. Agro Sejahtera</p>
      </div>

      {/* --- Main Content Scrollable Area --- */}
      <div className={styles.content}>
        
        <div className={styles.sectionTitle}>Kuota Panen Mendatang</div>

        {/* Order Card 1 */}
        <div className={styles.orderCard}>
          <div className={styles.productInfo}>
            <div className={styles.productImageWrapper}>
               <img src="/assets/products/melon-kirin-susu.png" alt="Melon Kirin Susu" />
               <span className={styles.batchTag}>BATCH-001</span>
            </div>
            
            <div className={styles.details}>
               <strong>Melon Kirin Susu</strong>
               <span>Panen: 20 Nov 2026</span>
               <div className={styles.line}></div>
               <div className={styles.metaRow}>
                  <span>150 Kg</span>
                  <span>Sisa Kuota</span>
               </div>
            </div>

            <div className={styles.actionArea}>
               <div className={styles.price}>Rp 75.000 / Kg</div>
               <button className={styles.orderBtn}>Pesan</button>
            </div>
          </div>
        </div>

        {/* Order Card 2 */}
        <div className={styles.orderCard}>
          <div className={styles.productInfo}>
            <div className={styles.productImageWrapper}>
               <img src="/assets/products/melon-g-princess.png" alt="Melon Golden Princess" />
               <span className={styles.batchTag}>BATCH-002</span>
            </div>
            
            <div className={styles.details}>
               <strong>Melon Golden Princess</strong>
               <span>Panen: 25 Nov 2026</span>
               <div className={styles.line}></div>
               <div className={styles.metaRow}>
                  <span>300 Kg</span>
                  <span>Sisa Kuota</span>
               </div>
            </div>

            <div className={styles.actionArea}>
               <div className={styles.price}>Rp 60.000 / Kg</div>
               <button className={styles.orderBtn}>Pesan</button>
            </div>
          </div>
        </div>

      </div>

      {/* --- Bottom Navbar --- */}
      <div className={styles.navbar}>
        <div className={styles.navItem}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
             <path d="M25.9653 23.4931V15.168C25.9653 14.4972 25.8289 13.8334 25.5642 13.2169C25.2996 12.6005 24.9123 12.0444 24.426 11.5823L16.5411 4.09314C16.0815 3.65653 15.4718 3.41309 14.8379 3.41309C14.204 3.41309 13.5943 3.65653 13.1347 4.09314L5.24861 11.5823C4.76225 12.0444 4.37498 12.6005 4.11034 13.2169C3.8457 13.8334 3.70923 14.4972 3.70923 15.168V23.4931C3.70923 24.1489 3.96977 24.7779 4.43352 25.2417C4.89728 25.7054 5.52628 25.966 6.18213 25.966H23.4924C24.1483 25.966 24.7773 25.7054 25.241 25.2417C25.7048 24.7779 25.9653 24.1489 25.9653 23.4931Z" fill="#2A7C13" stroke="#2A7C13" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M11.1279 18.5471C11.1279 17.8913 11.3885 17.2623 11.8522 16.7985C12.316 16.3348 12.945 16.0742 13.6008 16.0742H16.0737C16.7296 16.0742 17.3586 16.3348 17.8223 16.7985C18.2861 17.2623 18.5466 17.8913 18.5466 18.5471V25.9658H11.1279V18.5471Z" fill="white" stroke="#2A7C13" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{color: '#2A7C13', fontWeight: 600}}>Beranda</span>
        </div>
        <div className={styles.navItem}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
             <path d="M5 5H10.0125V2.5H2.5V10H5V5ZM5 20H2.5V27.5H10.0125V25H5V20ZM25 25H20V27.5H27.5V20H25V25ZM20 5H25V10H27.5V2.5H20V5Z" fill="#AEAEB2"/>
             <path d="M5 5H10.0125V2.5H2.5V10H5V5ZM5 20H2.5V27.5H10.0125V25H5V20ZM25 25H20V27.5H27.5V20H25V25ZM20 5H25V10H27.5V2.5H20V5Z" stroke="#AEAEB2" strokeWidth="2" mask="url(#mask3)"/>
             <defs><mask id="mask3"><rect x="3" y="3" width="24" height="24" rx="2" fill="white"/></mask></defs>
          </svg>
          <span>Scan QR</span>
        </div>
        <div className={styles.navItem}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
             <path d="M6.875 5H23.125C23.8154 5 24.375 5.55964 24.375 6.25V26.25C24.375 26.9404 23.8154 27.5 23.125 27.5H6.875C6.18464 27.5 5.625 26.9404 5.625 26.25V6.25C5.625 5.55964 6.18464 5 6.875 5Z" stroke="#AEAEB2" strokeWidth="2" strokeLinejoin="round"/>
             <path d="M11.25 2.5V6.25M18.75 2.5V6.25M10 11.875H20M10 16.875H17.5M10 21.875H15" stroke="#AEAEB2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Aktivitas</span>
        </div>
        <div className={styles.navItem}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
             <path d="M4.9458 22.2554C4.9458 20.9437 5.46687 19.6857 6.39439 18.7582C7.32191 17.8306 8.5799 17.3096 9.8916 17.3096H19.7832C21.0949 17.3096 22.3529 17.8306 23.2804 18.7582C24.2079 19.6857 24.729 20.9437 24.729 22.2554C24.729 22.9112 24.4685 23.5402 24.0047 24.004C23.541 24.4677 22.912 24.7283 22.2561 24.7283H7.4187C6.76285 24.7283 6.13386 24.4677 5.6701 24.004C5.20634 23.5402 4.9458 22.9112 4.9458 22.2554Z" stroke="#AEAEB2" strokeWidth="2.5" strokeLinejoin="round"/>
             <path d="M18.5466 8.65467C18.5466 10.7033 16.8859 12.364 14.8373 12.364C12.7887 12.364 11.1279 10.7033 11.1279 8.65467C11.1279 6.60605 12.7887 4.94531 14.8373 4.94531C16.8859 4.94531 18.5466 6.60605 18.5466 8.65467Z" stroke="#AEAEB2" strokeWidth="2.5"/>
          </svg>
          <span>Profil</span>
        </div>
      </div>
      
      {/* Home Indicator */}
      <div className={styles.homeIndicator}></div>
    </div>
  );
};

export default MitraDashboard;