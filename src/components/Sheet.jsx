import { useEffect } from 'react';
import styles from './Sheet.module.css';

// Panel yang naik dari bawah (bottom sheet). Tutup dengan ketuk latar atau tombol Esc.
export default function Sheet({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className={styles.grab} />
        {title && <h3 className={styles.title}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}
