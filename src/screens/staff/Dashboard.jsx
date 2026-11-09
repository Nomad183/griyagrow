import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sheet from '../../components/Sheet.jsx';
import { ChevronRight } from '../auth/icons';
import { ORDER } from './staffData';
import { useStaff } from './StaffContext.jsx';
import styles from './Staff.Dashboard.module.css';
import s from './Staff.module.css';

const StaffDashboard = () => {
  const { user, plants, orderStatus } = useStaff();
  const [showNotif, setShowNotif] = useState(false);

  const total = plants.length;
  const checked = plants.filter((p) => p.checked).length;
  const attention = plants.filter((p) => p.status === 'Perlu Cek' || p.status === 'Bermasalah').length;
  const ready = plants.filter((p) => p.status === 'Siap Panen').length;

  return (
    <div className={styles.container}>

      {/* --- Header Section --- */}
      <div className={styles.header}>
        <div className={styles.onlineBadge}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M1.66675 8.33289C6.66675 2.77706 13.3334 2.77706 18.3334 8.33289M5.00008 11.6662C8.00008 8.33289 12.0001 8.33289 15.0001 11.6662" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.8334 14.9993C10.8334 15.4596 10.4603 15.8327 10.0001 15.8327C9.53984 15.8327 9.16675 15.4596 9.16675 14.9993C9.16675 14.5391 9.53984 14.166 10.0001 14.166C10.4603 14.166 10.8334 14.5391 10.8334 14.9993Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Online</span>
        </div>

        <button type="button" className={`${styles.notificationBell} ${s.bellReset}`} onClick={() => setShowNotif(true)} aria-label="Notifikasi">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
            <path d="M7.5 23.75V12.5C7.5 10.5109 8.29018 8.60322 9.6967 7.1967C11.1032 5.79018 13.0109 5 15 5C16.9891 5 18.8968 5.79018 20.3033 7.1967C21.7098 8.60322 22.5 10.5109 22.5 12.5V23.75M7.5 23.75H22.5M7.5 23.75H5M22.5 23.75H25M13.75 27.5H16.25" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.25 3.75C16.25 4.44036 15.6904 5 15 5C14.3096 5 13.75 4.44036 13.75 3.75C13.75 3.05964 14.3096 2.5 15 2.5C15.6904 2.5 16.25 3.05964 16.25 3.75Z" stroke="white" strokeWidth="2.5" />
          </svg>
          {orderStatus === 'Menunggu' && <i className={s.bellDot} />}
        </button>

        <h1>Halo!</h1>
        <p className={styles.userName}>{user.name}</p>
        <p className={styles.userRole}>{user.role} • {user.workplace}</p>
      </div>

      {/* --- Main Content --- */}
      <div className={styles.content}>
        {/* QR Scan Card */}
        <Link to="/staff/scan" className={styles.qrCard}>
          <div className={styles.qrIconWrapper}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path d="M6.66659 6.66634H13.3499V3.33301H3.33325V13.333H6.66659V6.66634ZM6.66659 26.6663H3.33325V36.6663H13.3499V33.333H6.66659V26.6663ZM33.3333 33.333H26.6666V36.6663H36.6666V26.6663H33.3333V33.333ZM26.6666 6.66634H33.3333V13.333H36.6666V3.33301H26.6666V6.66634Z" stroke="white" strokeWidth="2" />
              <path d="M25.0166 24.9997V21.6663H21.6833V24.9997H25.0166ZM25.0166 24.9997H28.3499M25.0166 24.9997V28.333H28.3499M28.3499 24.9997V28.333M28.3499 24.9997H31.6833V21.6663H28.3499V24.9997ZM28.3499 28.333H31.6833V31.6663H28.3499V28.333ZM8.33325 18.333H18.3333V8.33301H8.33325V18.333ZM11.6666 11.6663H14.9999V14.9997H11.6666V11.6663ZM8.33325 31.6663H18.3333V21.6663H8.33325V31.6663ZM11.6666 24.9997H14.9999V28.333H11.6666V24.9997ZM31.6666 8.33301H21.6666V18.333H31.6666V8.33301ZM28.3333 14.9997H24.9999V11.6663H28.3333V14.9997Z" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <div className={styles.qrText}>
            <strong>Mulai Scan QR</strong>
            <span>Periksa dan perbarui data tanaman</span>
          </div>
          <ChevronRight width="35" height="35" />
        </Link>

        {/* Stats Summary */}
        <div className={styles.sectionTitle}>Ringkasan Pekerjaan</div>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Tanaman</span>
            <span className={styles.statNumber}>{total}</span>
          </div>
          <div className={`${styles.statCard} ${styles.green}`}>
            <span className={styles.statLabel}>Sudah diperiksa</span>
            <span className={styles.statNumber}>{checked}</span>
          </div>
          <div className={`${styles.statCard} ${styles.orange}`}>
            <span className={styles.statLabel}>Perlu Perhatian</span>
            <span className={styles.statNumber}>{attention}</span>
          </div>
          <div className={`${styles.statCard} ${styles.green}`}>
            <span className={styles.statLabel}>Siap Panen</span>
            <span className={styles.statNumber}>{ready}</span>
          </div>
        </div>

        {/* Tasks List */}
        <div className={styles.sectionTitle}>Tugas Hari Ini</div>

        <Link to="/staff/activity?status=Perlu%20Cek" className={`${styles.taskCard} ${s.linkReset}`}>
          <div className={styles.taskIconBg}><TaskIcon /></div>
          <div className={styles.taskInfo}>
            <strong>Periksa Kondisi Tanaman</strong>
            <span>Periksa tanaman yang membutuhkan perhatian.</span>
          </div>
          <ChevronRight width="35" height="35" style={{ color: '#8E8E93' }} />
        </Link>

        <Link to="/staff/scan" className={`${styles.taskCard} ${s.linkReset}`}>
          <div className={styles.taskIconBg}><TaskIcon /></div>
          <div className={styles.taskInfo}>
            <strong>Lakukan stock opname Block A</strong>
            <span>Pastikan jumlah dan status tanaman sesuai.</span>
          </div>
          <ChevronRight width="35" height="35" style={{ color: '#8E8E93' }} />
        </Link>
      </div>

      {showNotif && (
        <Sheet title="Notifikasi" onClose={() => setShowNotif(false)}>
          <Link to={`/staff/order/${ORDER.id}`} className={`${s.notif} ${s.linkReset}`}>
            <span className={`${s.notifDot}${orderStatus === 'Disetujui' ? ` ${s.notifRead}` : ''}`} />
            <span>
              <b>Pesanan baru dari {ORDER.client}</b>
              <small>{ORDER.no} • {ORDER.quotaKg} Kg {ORDER.variety} • {orderStatus}</small>
            </span>
          </Link>
          <Link to="/staff/activity?status=Perlu%20Cek" className={`${s.notif} ${s.linkReset}`}>
            <span className={`${s.notifDot} ${s.notifRead}`} />
            <span>
              <b>Ada tanaman yang perlu dicek</b>
              <small>Buka Aktivitas untuk melihat daftarnya.</small>
            </span>
          </Link>
        </Sheet>
      )}
    </div>
  );
};

function TaskIcon() {
  return (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" aria-hidden="true">
      <path d="M7.24943 6.36914H28.1036C28.9896 6.36914 29.7078 7.03681 29.7078 7.86042V31.7209C29.7078 32.5445 28.9896 33.2122 28.1036 33.2122H7.24943C6.36347 33.2122 5.64526 32.5445 5.64526 31.7209V7.86042C5.64526 7.03681 6.36347 6.36914 7.24943 6.36914Z" stroke="#2A7C13" strokeWidth="3" strokeLinejoin="round" />
      <path d="M12.8639 3.38672V7.86056M22.4889 3.38672V7.86056M11.2598 14.5713H24.0931M11.2598 20.5365H20.8848M11.2598 26.5016H17.6764" stroke="#2A7C13" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default StaffDashboard;
