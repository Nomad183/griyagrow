# Griya Grow - Local Development Setup

## Prerequisites

1. **Node.js** 18+ (for frontend)
2. **PostgreSQL** 14+ (for backend database)
3. **ngrok** (optional, for mobile testing/sharing)

---

## 1. Database Setup (PostgreSQL)

### Option A: Local PostgreSQL
```bash
# 1. Start PostgreSQL service
# Windows: Start "postgresql-x64-16" service
# macOS: brew services start postgresql@16
# Linux: sudo systemctl start postgresql

# 2. Create database and user (run as postgres superuser)
psql -U postgres -c "CREATE DATABASE griya_melon_db;"
psql -U postgres -c "CREATE USER gria_user WITH PASSWORD 'admin';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE griya_melon_db TO gria_user;"

# 3. Run schema
psql -U gria_user -d griya_melon_db -f backend/schema.sql
```

### Option B: Docker (Easiest)
```bash
# Start PostgreSQL container
docker run -d --name pg-griyagrow \
  -e POSTGRES_PASSWORD=admin \
  -e POSTGRES_USER=gria_user \
  -e POSTGRES_DB=griya_melon_db \
  -p 5432:5432 \
  postgres:16

# Run schema (wait 5s for DB to be ready)
sleep 5 && docker exec -i pg-griyagrow psql -U gria_user -d griya_melon_db < backend/schema.sql
```

---

## 2. Backend Setup

```bash
cd C:\KULIAH_WOI\Codingan\Project\bisa_jadi\griyagrow\backend

# Install dependencies (if not already)
npm install

# Start backend (runs on http://localhost:3000)
node server.js
```

**Expected output:**
```
Berhasil terhubung ke database PostgreSQL!
Backend server berjalan di http://localhost:3000
```

---

## 3. Frontend Setup

```bash
cd C:\KULIAH_WOI\Codingan\Project\bisa_jadi\griyagrow

# Install dependencies (if not already)
npm install

# Start frontend (runs on http://localhost:5173)
npm run dev
```

---

## 4. Testing the Auth Flow

1. Open http://localhost:5173
2. Click "Mulai" on Splash → Onboarding → "Mulai" → Sign In
3. Enter a phone number (e.g., `08123456789` or `628123456789`)
4. If user doesn't exist → Click "Daftar" → Fill name, phone, select role → Daftar
5. Go back to Sign In → Enter phone → Masuk
6. Should redirect to role-specific dashboard

---

## 5. Mobile Testing / Sharing with ngrok

### Expose Backend
```bash
# Install ngrok: https://ngrok.com/download
ngrok http 3000
```

You'll get a URL like: `https://abc123.ngrok-free.app`

### Configure Frontend to Use Tunnel
Create `.env.local` in project root:
```env
VITE_API_URL=https://abc123.ngrok-free.app/api
```

Then restart frontend:
```bash
npm run dev
```

Now you can:
- Test on real phone via the ngrok URL
- Share with teammates
- Test WhatsApp/webhook integrations

---

## 6. Project Structure (Key Files)

```
griyagrow/
├── backend/
│   ├── server.js          # Express API (register, login)
│   ├── db.js              # PostgreSQL connection
│   ├── schema.sql         # Database schema
│   └── .env               # DB config
├── src/
│   ├── auth/
│   │   ├── AuthContext.jsx    # Auth state (token, user, login, register)
│   │   └── RequireAuth.jsx    # Route guards by role
│   ├── screens/auth/
│   │   ├── SignIn.jsx         # Phone login → calls /api/auth/login
│   │   └── SignUp.jsx         # Name/phone/role → calls /api/auth/register
│   └── api/client.js          # Axios instance with auth interceptor
└── package.json
```

---

## 7. Troubleshooting

| Issue | Solution |
|-------|----------|
| `connection refused` to DB | Check PostgreSQL is running, verify `.env` credentials |
| `relation "users" does not exist` | Run `schema.sql` |
| `CORS error` | Backend has `cors()` enabled, check frontend calls `localhost:3000` |
| `401 Unauthorized` | Token expired or invalid → clear localStorage, re-login |
| Frontend shows splash but no navigation | Check browser console for errors, verify backend is running |

---

## 8. API Endpoints

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | `{name, phone, role}` | Register new user |
| POST | `/api/auth/login` | `{phone}` | Login with phone, returns JWT |

**Headers for authenticated requests:**
```
Authorization: Bearer <token>
```

---

## 9. Default Test Accounts (after running schema.sql)

Run this to add test users:
```sql
INSERT INTO users (name, phone, role) VALUES
  ('Customer Test', '628111111111', 'customer'),
  ('Mitra Test', '628222222222', 'mitra'),
  ('Owner Test', '628333333333', 'owner'),
  ('Staff Test', '628444444444', 'staff')
ON CONFLICT (phone) DO NOTHING;
```

Then login with any of these phone numbers.