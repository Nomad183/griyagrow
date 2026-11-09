import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { Backspace, ChevronLeft } from './icons';
import './auth.css';

const LENGTH = 4;
const KEYS = [
  ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
  ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
  ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
];

export default function OTPVerification() {
  const navigate = useNavigate();
  const { verifyOTP } = useAuth();
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const timer = useRef(null);

  // Get phone from sessionStorage (set by SignIn or SignUp)
  const phone = sessionStorage.getItem('auth_phone') || '';
  const maskedPhone = phone ? `+62 ${phone.slice(2, 5)}****${phone.slice(-2)}` : '+62 813****71';

  const press = useCallback((digit) => {
    setCode((c) => (c.length < LENGTH ? c + digit : c));
  }, []);
  const erase = useCallback(() => setCode((c) => c.slice(0, -1)), []);

  // Keyboard support for desktop testing.
  useEffect(() => {
    const onKey = (e) => {
      if (/^\d$/.test(e.key)) press(e.key);
      else if (e.key === 'Backspace') erase();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [press, erase]);

  // When all digits are entered → verify with backend.
  useEffect(() => {
    if (code.length !== LENGTH) { setVerifying(false); return; }
    setVerifying(true);
    setError('');

    const doVerify = async () => {
      try {
        const result = await verifyOTP(phone, code);

        if (result.success) {
          // Redirect based on role from backend
          const roleRoutes = {
            customer: '/customer/home',
            mitra: '/mitra/home',
            owner: '/owner',
            staff: '/staff/home',
          };
          const target = roleRoutes[result.role] || '/';
          // Clear session storage
          sessionStorage.removeItem('auth_phone');
          sessionStorage.removeItem('auth_role');
          sessionStorage.removeItem('auth_name');
          navigate(target, { replace: true });
        } else {
          setError(result.message || 'Kode OTP salah');
          setCode('');
        }
      } catch (err) {
        setError('Terjadi kesalahan. Coba lagi.');
        setCode('');
      } finally {
        setVerifying(false);
      }
    };

    timer.current = setTimeout(doVerify, 300);
    return () => clearTimeout(timer.current);
  }, [code, navigate, phone, verifyOTP]);

  const handleBack = () => {
    // Go back to role-selection or sign-in
    const hasRole = sessionStorage.getItem('auth_role');
    navigate(hasRole ? '/role-selection' : '/sign-in');
  };

  return (
    <main className="gg-screen gg-otp">
      <div className="gg-otp-top">
        <button type="button" className="gg-back" aria-label="Kembali" onClick={handleBack}>
          <ChevronLeft />
        </button>
        <h1 className="gg-otp-title">Verifikasi Kode OTP</h1>
        <p className="gg-otp-desc">
          Masukkan kode OTP yang telah dikirimkan melalui WhatsApp ke <strong>{maskedPhone}</strong>
        </p>

        <div className="gg-otp-dots" aria-label={`${code.length} dari ${LENGTH} digit terisi`}>
          {Array.from({ length: LENGTH }, (_, i) => (
            <span key={i} className={`gg-otp-dot${i < code.length ? ' is-filled' : ''}`} />
          ))}
        </div>
        <p className="gg-otp-status" aria-live="polite">{verifying ? 'Memverifikasi…' : ''}</p>
        {error && <p className="gg-error" role="alert">{error}</p>}
      </div>

      <div className="gg-keypad">
        {KEYS.map(([n, l]) => (
          <button key={n} type="button" className="gg-key" onClick={() => press(n)} disabled={verifying}>
            <span className="gg-key-n">{n}</span>
            <span className="gg-key-l">{l}</span>
          </button>
        ))}
        <span />
        <button type="button" className="gg-key" onClick={() => press('0')} disabled={verifying}>
          <span className="gg-key-n">0</span>
        </button>
        <button type="button" className="gg-key is-ghost" aria-label="Hapus" onClick={erase} disabled={verifying}>
          <Backspace />
        </button>
      </div>
    </main>
  );
}