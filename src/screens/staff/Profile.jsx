import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sheet from '../../components/Sheet.jsx';
import { ArrowRight, BookSearch, ChevronDown, UserOutline } from './icons';
import { HELP_ITEMS } from './staffData';
import { useStaff } from './StaffContext.jsx';
import { useAuth } from '../../auth/AuthContext';
import s from './Staff.module.css';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useStaff();
  const { logout } = useAuth();
  const [sheet, setSheet] = useState(null); // 'info' | 'help' | 'logout'
  const [openFaq, setOpenFaq] = useState(0);

  const initials = user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  const close = () => setSheet(null);

  const handleLogout = () => {
    logout();
    navigate('/sign-in', { replace: true });
  };

  return (
    <div className={s.container}>
      <header className={s.profileHero}>
        <div className={s.avatar}>{initials}</div>
        <div className={s.profileName}>{user.name}</div>
        <div className={s.profileEmail}>{user.email}</div>
      </header>

      <div className={s.body}>
        <h2 className={s.h2}>Pengaturan Akun</h2>
        <button type="button" className={`${s.card} ${s.menu}`} onClick={() => setSheet('info')}>
          <UserOutline width="30" height="30" /><span>Informasi Pribadi</span><ArrowRight width="26" height="26" />
        </button>
        <button type="button" className={`${s.card} ${s.menu}`} onClick={() => setSheet('help')}>
          <BookSearch width="30" height="30" /><span>Pusat Bantuan</span><ArrowRight width="26" height="26" />
        </button>
        <button type="button" className={s.logout} onClick={() => setSheet('logout')}>Keluar (Log Out)</button>
      </div>

      {sheet === 'info' && (
        <Sheet title="Informasi Pribadi" onClose={close}>
          <div className={s.row}><span>Nama</span><b>{user.name}</b></div>
          <div className={s.row}><span>Email</span><b>{user.email}</b></div>
          <div className={s.row}><span>Peran</span><b>{user.role}</b></div>
          <div className={s.row}><span>Lokasi kerja</span><b>{user.workplace}</b></div>
        </Sheet>
      )}

      {sheet === 'help' && (
        <Sheet title="Pusat Bantuan" onClose={close}>
          {HELP_ITEMS.map((h, i) => (
            <div key={h.q} className={s.faq}>
              <button type="button" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                {h.q}
                <ChevronDown width="20" height="20" style={{ flex: 'none', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
              </button>
              {openFaq === i && <p>{h.a}</p>}
            </div>
          ))}
        </Sheet>
      )}

      {sheet === 'logout' && (
        <Sheet title="Keluar dari akun?" onClose={close}>
          <p className={s.sheetText}>Anda perlu masuk lagi untuk memperbarui data tanaman.</p>
          <div className={s.two}>
            <button type="button" className={s.ghost} onClick={close}>Batal</button>
            <button type="button" className={s.danger} onClick={handleLogout}>Keluar</button>
          </div>
        </Sheet>
      )}
    </div>
  );
}