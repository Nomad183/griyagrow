import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from '../auth/icons';
import { ORDER, rupiah } from './staffData';
import { useStaff } from './StaffContext.jsx';
import s from './Staff.module.css';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orderStatus, approveOrder } = useStaff();

  // TODO: ambil pesanan berdasarkan `id` dari backend. Sekarang hanya ada satu pesanan contoh.
  const order = id === ORDER.id ? ORDER : null;
  const approved = orderStatus === 'Disetujui';

  return (
    <div className={s.container}>
            <header className={`${s.topbar} ${s.topbarBack}`}>
        <button type="button" className={s.backBtn} onClick={() => navigate('/staff/home')} aria-label="Kembali"><ChevronLeft /></button>
        <span>Rincian Pesanan Mitra</span>
      </header>

      {!order ? (
        <div className={s.empty}>Pesanan tidak ditemukan. <Link to="/staff/home">Kembali ke Beranda</Link></div>
      ) : (
        <div className={s.body}>
          <section className={s.orderHead}>
            <div className={s.orderRow}>
              <span>{order.no}</span>
              <span className={`${s.pill} ${s.pillLg}${approved ? '' : ` ${s.pillWait}`}`}>{orderStatus}</span>
            </div>
            <h2>{order.client}</h2>
            <p>{order.contact}</p>
          </section>

          <h2 className={s.h2}>Detail Kuota Panen</h2>
          <section className={s.orderHead}>
            <div className={s.kv}><span>Varietas Melon:</span><b>{order.variety}</b></div>
            <div className={s.kv}><span>ID Batch:</span><b>{order.batch}</b></div>
            <div className={s.kv}><span>Jumlah Kuota:</span><b>{order.quotaKg} Kg</b></div>
            <div className={s.kv}><span>Harga per Kg:</span><span>{rupiah(order.pricePerKg)}</span></div>
            <div className={s.total}><span>Total</span><span>{rupiah(order.quotaKg * order.pricePerKg)}</span></div>
          </section>

          <p className={s.note}>Persetujuan Anda akan memotong sisa kuota yang tersedia pada Batch dan otomatis membuat invoice digital untuk mitra bisnis.</p>

          {!approved && <button type="button" className={s.btn} onClick={() => approveOrder(order)}>Setujui Pesanan</button>}
        </div>
      )}
    </div>
  );
}
