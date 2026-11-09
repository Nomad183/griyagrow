import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from '../auth/icons';
import { Check, ChevronDown, ImagePlus } from './icons';
import { STATUS_OPTIONS } from './staffData';
import { useStaff } from './StaffContext.jsx';
import s from './Staff.module.css';

export default function PlantDetail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { findPlant, savePlant, harvestPlant, toast } = useStaff();
  const plant = findPlant(code);

  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState(null);
  const fileRef = useRef(null);

  // Lepas URL preview foto saat diganti atau layar ditutup.
  useEffect(() => () => { if (photo) URL.revokeObjectURL(photo.url); }, [photo]);

  const back = () => navigate('/staff/scan');

  if (!plant) {
    return (
      <div className={s.container}>
                <header className={`${s.topbar} ${s.topbarBack}`}>
          <button type="button" className={s.backBtn} onClick={back} aria-label="Kembali"><ChevronLeft /></button>
          <span>Detail Tanaman</span>
        </header>
        <div className={s.empty}>Tanaman dengan kode "{code}" tidak ditemukan. <Link to="/staff/scan">Kembali ke Scan QR</Link></div>
      </div>
    );
  }

  const pickPhoto = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    // TODO: unggah file ke backend/storage di sini; simpan URL hasil unggahnya.
    setPhoto({ name: f.name, url: URL.createObjectURL(f) });
  };

  const save = () => {
    if (!status) { toast('Pilih status tanaman dulu'); return; }
    savePlant(plant.code, { status, note: note.trim(), photo: !!photo });
    navigate('/staff/scan');
  };

  const harvest = () => {
    harvestPlant(plant.code, { note: note.trim(), photo: !!photo });
    navigate('/staff/scan');
  };

  return (
    <div className={`${s.container} ${s.hasActions}`}>
            <header className={`${s.topbar} ${s.topbarBack}`}>
        <button type="button" className={s.backBtn} onClick={back} aria-label="Kembali"><ChevronLeft /></button>
        <span>Detail Tanaman</span>
      </header>

      <div className={s.body}>
        <section className={s.plantCard}>
          <span className={s.plantBadge}>{plant.status}</span>
          <div className={s.plantCode}>{plant.code}</div>
          <b>{plant.variety}</b>
          <p>{plant.batch} • {plant.location}</p>
        </section>

        <section className={s.info}>
          <div><small>Nomor tanaman</small><b>{plant.no}</b></div>
          <div><small>Tanggal tanam</small><b>{plant.planted}</b></div>
          <div><small>Fase pertumbuhan</small><b>{plant.phase}</b></div>
          <div><small>Kondisi terakhir</small><b>{plant.status}</b></div>
        </section>

        <section className={s.panel} style={{ marginTop: 0 }}>
          <h3 className={s.panelTitle}>Perbarui Inventaris</h3>

          <label className={s.field} htmlFor="plant-status">Status Tanaman</label>
          <div className={s.selWrap}>
            <select id="plant-status" className={s.select} value={status} onChange={(e) => setStatus(e.target.value)} style={{ color: status ? '#000' : '#8A8A8E' }}>
              <option value="" disabled>Pilih Status</option>
              {STATUS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <ChevronDown className={s.selIcon} width="22" height="22" />
          </div>

          <label className={s.field} htmlFor="plant-note">Catatan perkembangan</label>
          <textarea id="plant-note" className={s.textarea} placeholder="Tambahkan catatan kondisi tanaman....." value={note} onChange={(e) => setNote(e.target.value)} />

          <span className={s.field}>Foto perkembangan</span>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={pickPhoto} />
          <button type="button" className={s.upload} onClick={() => fileRef.current && fileRef.current.click()}>
            {photo ? (
              <>
                <span className={s.uploadCheck}><Check width="20" height="20" /></span>
                Berhasil Mengunggah
              </>
            ) : (
              <><ImagePlus width="30" height="30" /> Pilih Foto</>
            )}
          </button>
          {photo && (
            <p className={s.uploadNote}>
              {photo.name} · <button type="button" className={s.linkBtn} onClick={() => setPhoto(null)}>Hapus</button>
            </p>
          )}
        </section>
      </div>

      <div className={s.actions}>
        <button type="button" className={s.harvest} onClick={harvest}>Siap Panen</button>
        <button type="button" className={s.save} onClick={save}>Simpan</button>
      </div>
    </div>
  );
}
