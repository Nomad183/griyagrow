import { useSearchParams } from 'react-router-dom';
import { CATALOG, FILTERS, rupiah } from './staffData';
import { useStaff } from './StaffContext.jsx';
import s from './Staff.module.css';

// URL: /staff/activity?status=Perlu%20Cek&tab=riwayat
export default function Activity() {
  const { history } = useStaff();
  const [params, setParams] = useSearchParams();

  const seg = params.get('tab') === 'riwayat' ? 'riwayat' : 'aktivitas';
  const status = params.get('status');
  const filter = FILTERS.includes(status) ? status : 'Semua';
  const list = filter === 'Semua' ? CATALOG : CATALOG.filter((c) => c.status === filter);

  const update = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    setParams(next, { replace: true });
  };

  return (
    <div className={s.container}>
            <header className={s.topbar}>Aktivitas Operasional</header>

      <div className={s.body}>
        <div className={s.seg} role="tablist">
          <button type="button" role="tab" aria-selected={seg === 'aktivitas'} className={seg === 'aktivitas' ? s.segOn : ''} onClick={() => update({ tab: null })}>Aktivitas</button>
          <button type="button" role="tab" aria-selected={seg === 'riwayat'} className={seg === 'riwayat' ? s.segOn : ''} onClick={() => update({ tab: 'riwayat' })}>Riwayat</button>
        </div>

        {seg === 'aktivitas' ? (
          <>
            <div className={s.chips} role="group" aria-label="Filter status">
              {FILTERS.map((f) => (
                <button key={f} type="button" aria-pressed={filter === f} className={`${s.chip}${filter === f ? ` ${s.chipOn}` : ''}`} onClick={() => update({ status: f === 'Semua' ? null : f })}>{f}</button>
              ))}
            </div>

            {list.length === 0 && <div className={s.empty}>Belum ada item dengan status ini.</div>}
            {list.map((c) => (
              <div key={c.id} className={`${s.card} ${s.item}`}>
                <img className={s.thumb} src={c.img} alt={c.name} />
                <div className={s.itemMeta}>
                  <div className={s.itemName}>{c.name}</div>
                  <div className={s.itemGrade}>Grade: {c.grade}</div>
                  <div className={s.itemPrice}>{rupiah(c.price)}</div>
                </div>
                <span className={s.pill}>{c.status}</span>
              </div>
            ))}
          </>
        ) : (
          <div style={{ marginTop: 22 }}>
            {history.length === 0 && <div className={s.empty}>Belum ada riwayat.</div>}
            {history.map((h) => (
              <div key={h.id} className={s.hist}>
                <b>{h.title}</b>
                <p>{h.desc}</p>
                <small>{h.time}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
