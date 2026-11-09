import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory OTP store (prototype only - use Redis in production)
// Format: { phone: { otp: '1234', type: 'login|register', expires: timestamp, name?: '', role?: '' } }
const otpStore = new Map();

// Clean expired OTPs every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [phone, data] of otpStore.entries()) {
    if (data.expires < now) otpStore.delete(phone);
  }
}, 5 * 60 * 1000);

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit
}

// Send OTP for login or register
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { phone, type } = req.body; // type: 'login' | 'register'

    if (!phone) {
      return res.status(400).json({ success: false, message: 'Nomor telepon wajib diisi' });
    }

    // Format phone
    let formattedPhone = phone.replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '62' + formattedPhone.slice(1);
    } else if (!formattedPhone.startsWith('62')) {
      formattedPhone = '62' + formattedPhone;
    }

    if (type === 'login') {
      // Check if user exists
      const query = 'SELECT * FROM users WHERE phone = $1';
      const result = await pool.query(query, [formattedPhone]);

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Nomor telepon tidak terdaftar' });
      }

      const user = result.rows[0];
      const otp = generateOTP();

      otpStore.set(formattedPhone, {
        otp,
        type: 'login',
        expires: Date.now() + 5 * 60 * 1000, // 5 minutes
        userId: user.id,
        role: user.role,
        name: user.name
      });

      console.log(`[DEV] OTP for ${formattedPhone} (login): ${otp}`);

      return res.json({ success: true, message: 'OTP dikirim ke WhatsApp' });
    }

    if (type === 'register') {
      // For register, we expect name and role in session/storage
      // The frontend will call register first, then send-otp
      // But we can also handle register+send-otp in one go
      return res.status(400).json({ success: false, message: 'Gunakan endpoint register untuk pendaftaran baru' });
    }

    return res.status(400).json({ success: false, message: 'Type tidak valid' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Verify OTP and return JWT
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: 'Nomor telepon dan OTP wajib diisi' });
    }

    // Format phone
    let formattedPhone = phone.replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '62' + formattedPhone.slice(1);
    } else if (!formattedPhone.startsWith('62')) {
      formattedPhone = '62' + formattedPhone;
    }

    const stored = otpStore.get(formattedPhone);

    if (!stored) {
      return res.status(400).json({ success: false, message: 'OTP kadaluarsa atau tidak ditemukan. Minta kode baru.' });
    }

    if (stored.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Kode OTP salah' });
    }

    if (stored.expires < Date.now()) {
      otpStore.delete(formattedPhone);
      return res.status(400).json({ success: false, message: 'OTP kadaluarsa. Minta kode baru.' });
    }

    // OTP valid - get user data
    let user;
    if (stored.type === 'login') {
      const query = 'SELECT * FROM users WHERE phone = $1';
      const result = await pool.query(query, [formattedPhone]);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
      }
      user = result.rows[0];
    } else if (stored.type === 'register') {
      // For register flow, user was already created, stored has userId
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await pool.query(query, [stored.userId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
      }
      user = result.rows[0];
    }

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET || 'rahasia_token_super_aman';
    const token = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      jwtSecret,
      { expiresIn: '1d' }
    );

    // Clear OTP
    otpStore.delete(formattedPhone);

    res.json({
      success: true,
      message: 'Verifikasi berhasil',
      role: user.role,
      token,
      id: user.id,
      name: user.name,
      phone: user.phone,
      created_at: user.created_at
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, phone, role } = req.body;
    const validRoles = ['owner', 'mitra', 'customer', 'staff'];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'Role tidak valid' });
    }

    // Format phone
    let formattedPhone = phone.replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '62' + formattedPhone.slice(1);
    } else if (!formattedPhone.startsWith('62')) {
      formattedPhone = '62' + formattedPhone;
    }

    const query = `
      INSERT INTO users (name, phone, role)
      VALUES ($1, $2, $3)
      RETURNING id, name, phone, role, created_at;
    `;
    const result = await pool.query(query, [name, formattedPhone, role]);

    const user = result.rows[0];

    // Send OTP for verification
    const otp = generateOTP();
    otpStore.set(formattedPhone, {
      otp,
      type: 'register',
      expires: Date.now() + 5 * 60 * 1000,
      userId: user.id,
      role: user.role,
      name: user.name
    });

    console.log(`[DEV] OTP for ${formattedPhone} (register): ${otp}`);

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil, OTP dikirim ke WhatsApp',
      data: { id: user.id, name: user.name, phone: user.phone, role: user.role }
    });
  } catch (error) {
    console.error(error.message);
    if (error.code === '23505') {
      return res.status(400).json({ success: false, message: 'Nomor telepon sudah terdaftar' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { phone } = req.body;

    // Format phone
    let formattedPhone = phone.replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '62' + formattedPhone.slice(1);
    } else if (!formattedPhone.startsWith('62')) {
      formattedPhone = '62' + formattedPhone;
    }

    const query = 'SELECT * FROM users WHERE phone = $1';
    const result = await pool.query(query, [formattedPhone]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Nomor telepon tidak ditemukan' });
    }

    const user = result.rows[0];

    const jwtSecret = process.env.JWT_SECRET || 'rahasia_token_super_aman';

    const token = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      jwtSecret,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      role: user.role,
      token: token,
      id: user.id,
      name: user.name,
      phone: user.phone,
      created_at: user.created_at
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(3000, () => {
  console.log('Backend server berjalan di http://localhost:3000');
});