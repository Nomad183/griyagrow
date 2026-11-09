import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import './auth.css';

export default function SignUp() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', phone: '', role: 'customer' });
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

    const formattedPhone = formatPhone(form.phone);
    if (!form.name.trim()) {
      setError('Nama lengkap wajib diisi');
      return;
    }
    if (!formattedPhone || formattedPhone.length < 10) {
      setError('Masukkan nomor telepon yang valid');
      return;
    }

    setLoading(true);
    try {
      // Register + send OTP in one call
      const result = await register(form.name.trim(), formattedPhone, form.role);

      if (result.success) {
        // Store phone and role for OTP verification
        sessionStorage.setItem('auth_phone', formattedPhone);
        sessionStorage.setItem('auth_role', form.role);
        sessionStorage.setItem('auth_name', form.name.trim());
        // Skip role-selection since role was already chosen
        navigate('/otp-verification');
      } else {
        setError(result.message || 'Registrasi gagal');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="gg-screen gg-form-screen">
      <h1 className="gg-form-title">Daftar Akun</h1>
      <p className="gg-form-subtitle">Isi data untuk membuat akun baru</p>

      <form className="gg-form" onSubmit={handleSubmit} noValidate>
        <input
          className="gg-input"
          type="text"
          placeholder="Nama Lengkap"
          autoComplete="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          disabled={loading}
        />

        <div className="gg-input-wrapper">
          <span className="gg-input-prefix">+62</span>
          <input
            className="gg-input"
            type="tel"
            placeholder="8xx-xxxx-xxxx"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            disabled={loading}
            inputMode="numeric"
          />
        </div>

        <fieldset className="gg-role-fieldset" disabled={loading}>
          <legend>Daftar Sebagai</legend>
          <div className="gg-role-options">
            <label className="gg-role-option">
              <input
                type="radio"
                name="role"
                value="customer"
                checked={form.role === 'customer'}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              <span className="gg-role-option-text">
                <strong>Customer</strong>
                <small>Beli & adopsi melon</small>
              </span>
            </label>
            <label className="gg-role-option">
              <input
                type="radio"
                name="role"
                value="mitra"
                checked={form.role === 'mitra'}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              <span className="gg-role-option-text">
                <strong>Mitra</strong>
                <small>Pre-order kuota panen HORECA</small>
              </span>
            </label>
            <label className="gg-role-option">
              <input
                type="radio"
                name="role"
                value="owner"
                checked={form.role === 'owner'}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              <span className="gg-role-option-text">
                <strong>Owner</strong>
                <small>Kelola usaha & laporan</small>
              </span>
            </label>
            <label className="gg-role-option">
              <input
                type="radio"
                name="role"
                value="staff"
                checked={form.role === 'staff'}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              <span className="gg-role-option-text">
                <strong>Staff</strong>
                <small>Operasional & scan tanaman</small>
              </span>
            </label>
          </div>
        </fieldset>

        {error && <p className="gg-error" role="alert">{error}</p>}

        <button type="submit" className="gg-btn" disabled={loading}>
          {loading ? 'Mendaftar & Kirim OTP...' : 'Daftar & Kirim OTP'}
        </button>
      </form>

      <p className="gg-switch">
        Sudah punya akun?{' '}
        <button type="button" className="gg-switch-link" onClick={() => navigate('/sign-in')}>Masuk</button>
      </p>
    </main>
  );
}