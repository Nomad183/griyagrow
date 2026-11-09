import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { INITIAL_HISTORY, INITIAL_PLANTS, USER } from './staffData';
import s from './Staff.module.css';

const StaffContext = createContext(null);

export function useStaff() {
  const ctx = useContext(StaffContext);
  if (!ctx) throw new Error('useStaff harus dipakai di dalam <StaffProvider>');
  return ctx;
}

const stamp = () => new Date().toLocaleString('id-ID');

// Dipasang sebagai route layout di App.jsx: <Route path="staff" element={<StaffProvider />}>
// Semua layar staff berbagi data tanaman, riwayat, dan status pesanan lewat sini.
export function StaffProvider() {
  const [plants, setPlants] = useState(INITIAL_PLANTS);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [orderStatus, setOrderStatus] = useState('Menunggu');
  const [toastMsg, setToastMsg] = useState('');
  const nextId = useRef(100);
  const timer = useRef(null);

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(''), 2400);
  }, []);

  const addHistory = useCallback((title, desc) => {
    const id = nextId.current++;
    setHistory((h) => [{ id, title, desc, time: stamp() }, ...h]);
  }, []);

  const findPlant = useCallback(
    (code) => plants.find((p) => p.code.toLowerCase() === String(code).trim().toLowerCase()),
    [plants]
  );

  // TODO: semua fungsi di bawah ini tempat yang pas untuk memanggil backend.
  const logScan = useCallback((plant) => {
    addHistory('Scan QR tanaman', `${plant.code} • Membuka data ${plant.variety}`);
  }, [addHistory]);

  const savePlant = useCallback((code, { status, note, photo }) => {
    setPlants((arr) => arr.map((p) => (p.code === code ? { ...p, status, checked: true } : p)));
    addHistory('Perbarui inventaris', `${code} • Status ${status}${note ? ` • ${note}` : ''}${photo ? ' • + foto' : ''}`);
    toast(`${code} diperbarui: ${status}`);
  }, [addHistory, toast]);

  const harvestPlant = useCallback((code, { note, photo }) => {
    setPlants((arr) => arr.map((p) => (p.code === code ? { ...p, status: 'Siap Panen', phase: 'Panen', checked: true } : p)));
    addHistory('Tandai siap panen', `${code} • Status Siap Panen${note ? ` • ${note}` : ''}${photo ? ' • + foto' : ''}`);
    toast(`${code} ditandai Siap Panen`);
  }, [addHistory, toast]);

  const approveOrder = useCallback((order) => {
    setOrderStatus('Disetujui');
    addHistory('Setujui pesanan mitra', `${order.no} • ${order.client}`);
    toast('Pesanan disetujui. Invoice digital dibuat.');
  }, [addHistory, toast]);

  const value = useMemo(
    () => ({ user: USER, plants, history, orderStatus, toast, findPlant, logScan, savePlant, harvestPlant, approveOrder }),
    [plants, history, orderStatus, toast, findPlant, logScan, savePlant, harvestPlant, approveOrder]
  );

  return (
    <StaffContext.Provider value={value}>
      <Outlet />
      {toastMsg && <div className={s.toast} role="status">{toastMsg}</div>}
    </StaffContext.Provider>
  );
}
