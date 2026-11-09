import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrBig } from './icons';
import { useStaff } from './StaffContext.jsx';
import s from './Staff.module.css';

export default function Scan() {
  const navigate = useNavigate();
  const { plants, findPlant, logScan } = useStaff();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);
  const cursor = useRef(0);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const open = (value) => {
    const plant = findPlant(value);
    if (!plant) {
      setError(`Kode "${value.trim()}" tidak ditemukan. Periksa lagi, contoh: POT-A001.`);
      return;
    }
    setError('');
    logScan(plant);
    navigate(`/staff/plant/${plant.code}`);
  };

  // TODO: ganti dengan kamera sungguhan (mis. html5-qrcode / @zxing/browser).
  // Sekarang setiap ketukan "memindai" pot berikutnya.
  const simulateScan = () => {
    if (scanning) return;
    setScanning(true);
    timer.current = setTimeout(() => {
      const plant = plants[cursor.current % plants.length];
      cursor.current += 1;
      setScanning(false);
      open(plant.code);
    }, 900);
  };

  return (
    <div className={s.container}>
            <header className={s.topbar}>Scan QR Tanaman</header>

      <div className={s.body}>
        <p className={s.lead}>Pindai QR pada pot tanaman untuk melihat dan memperbarui data.</p>

        <button type="button" className={s.scanArea} onClick={simulateScan} aria-label="Area pemindaian QR, ketuk untuk memindai">
          <div className={`${s.scanBox}${scanning ? ` ${s.scanRun}` : ''}`}><QrBig width="110" height="110" /></div>
          <b>{scanning ? 'Memindai…' : 'Area Pemindaian QR'}</b>
        </button>

        <div className={s.panel}>
          <h3>Masukkan kode secara manual</h3>
          <input
            className={s.input}
            placeholder="Contoh: POT-A001"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(''); }}
            onKeyDown={(e) => { if (e.key === 'Enter' && code.trim()) open(code); }}
            autoCapitalize="characters"
            aria-label="Kode tanaman"
          />
          {error && <p className={s.error} role="alert">{error}</p>}
          <button type="button" className={s.btn} disabled={!code.trim()} onClick={() => open(code)}>Cari Tanaman</button>
        </div>
      </div>
    </div>
  );
}
