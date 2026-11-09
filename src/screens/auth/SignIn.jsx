import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import './auth.css';

export default function SignIn() {
  const navigate = useNavigate();
  const { sendOTP } = useAuth();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, '');
    if (digits.startsWith('0')) {
      digits = '62' + digits.slice(1);
    } else if (!digits.startsWith('62')) {
      digits = '62' + digits;
    }
    return digits;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formattedPhone = formatPhone(phone);
    if (!formattedPhone || formattedPhone.length < 10) {
      setError('Masukkan nomor telepon yang valid');
      return;
    }

    setLoading(true);
    try {
      const result = await sendOTP(formattedPhone, 'login');

      if (result.success) {
        // Store phone for next steps
        sessionStorage.setItem('auth_phone', formattedPhone);
        navigate('/role-selection');
      } else {
        setError(result.message || 'Gagal mengirim OTP');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="gg-screen gg-form-screen">
      <h1 className="gg-form-title">Masuk</h1>
      <p className="gg-form-subtitle">Masukkan nomor telepon untuk menerima kode OTP</p>

      <form className="gg-form" onSubmit={handleSubmit} noValidate>
        <div className="gg-input-wrapper">
          <span className="gg-input-prefix">+62</span>
          <input
            className="gg-input"
            type="tel"
            placeholder="8xx-xxxx-xxxx"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            inputMode="numeric"
          />
        </div>

        {error && <p className="gg-error" role="alert">{error}</p>}

        <button type="submit" className="gg-btn" disabled={loading}>
          {loading ? 'Mengirim OTP...' : 'Kirim OTP'}
        </button>
      </form>

      <p className="gg-switch">
        Belum punya akun?{' '}
        <button type="button" className="gg-switch-link" onClick={() => navigate('/sign-up')}>Daftar</button>
      </p>
    </main>
  );
}