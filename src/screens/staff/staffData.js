// Data contoh untuk alur Staff Operasional.
// TODO: ganti dengan panggilan API saat backend siap (lihat StaffContext.jsx).

export const USER = {
  name: 'Andi Saputra',
  email: 'Andisaputra@gmail.com',
  role: 'Staff Operasional',
  workplace: 'Griya Mello',
};

export const STATUS_OPTIONS = ['Baik', 'Perlu Cek', 'Bermasalah', 'Siap Panen'];
export const FILTERS = ['Semua', ...STATUS_OPTIONS];

// Foto produk ada di public/assets/products/
export const CATALOG = [
  { id: 'c1', name: 'Melon Kirin', grade: 'Brix 14–16', price: 85000, status: 'Baik', img: '/assets/products/melon-kirin.png' },
  { id: 'c2', name: 'Melon Kirin Susu', grade: 'Brix 14–16', price: 95000, status: 'Perlu Cek', img: '/assets/products/melon-kirin-susu.png' },
  { id: 'c3', name: 'Bibit Melon Sumo', grade: 'Bibit Adopsi', price: 85000, status: 'Bermasalah', img: '/assets/products/bibit-melon-sumo.png' },
  { id: 'c4', name: 'Bibit Melon Kimono', grade: 'Bibit Adopsi', price: 85000, status: 'Siap Panen', img: '/assets/products/bibit-melon-kimono.png' },
];

export const INITIAL_PLANTS = [
  { code: 'POT-A001', no: 'A-001', variety: 'Melon Inthanon', batch: 'BATCH-001', location: 'Greenhouse Block A', planted: '15 Sep 2026', phase: 'Pematangan', status: 'Baik', checked: true },
  { code: 'POT-A002', no: 'A-002', variety: 'Melon Kirin Susu', batch: 'BATCH-001', location: 'Greenhouse Block A', planted: '15 Sep 2026', phase: 'Pembungaan', status: 'Perlu Cek', checked: false },
  { code: 'POT-A003', no: 'A-003', variety: 'Melon Kimono', batch: 'BATCH-002', location: 'Greenhouse Block A', planted: '10 Sep 2026', phase: 'Pematangan', status: 'Siap Panen', checked: false },
  { code: 'POT-A004', no: 'A-004', variety: 'Melon Sumo', batch: 'BATCH-002', location: 'Greenhouse Block A', planted: '20 Sep 2026', phase: 'Vegetatif', status: 'Baik', checked: false },
  { code: 'POT-A005', no: 'A-005', variety: 'Melon Kirin', batch: 'BATCH-003', location: 'Greenhouse Block A', planted: '22 Sep 2026', phase: 'Vegetatif', status: 'Baik', checked: false },
];

export const INITIAL_HISTORY = [
  { id: 2, title: 'Scan QR tanaman', desc: 'POT-A001 • Membuka data Melon Inthanon', time: '4/11/2026, 17.36.00' },
  { id: 1, title: 'Scan QR tanaman', desc: 'POT-A001 • Membuka data Melon Inthanon', time: '4/11/2026, 17.36.00' },
];

export const ORDER = {
  id: 'PRE-849201', // dipakai di URL: /staff/order/PRE-849201
  no: 'PRE/849201',
  client: 'Resto Clarita Suites',
  contact: 'Ibu Maya (Procurement)',
  variety: 'Melon Fujisawa Horeca',
  batch: 'BATCH-002',
  quotaKg: 50,
  pricePerKg: 82000,
};

export const HELP_ITEMS = [
  { q: 'Bagaimana cara memperbarui data tanaman?', a: 'Buka tab Scan QR, pindai QR pada pot atau masukkan kodenya manual, lalu ubah status, tambahkan catatan dan foto, dan tekan Simpan.' },
  { q: 'Kapan memakai tombol Siap Panen?', a: 'Tekan Siap Panen saat buah sudah matang dan layak dipetik. Status tanaman akan berubah dan tercatat di Riwayat.' },
  { q: 'Kode tanaman tidak ditemukan, apa yang harus dilakukan?', a: 'Pastikan format kodenya benar, misalnya POT-A001. Jika tetap tidak ada, hubungi admin agar pot didaftarkan.' },
];

export const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID');
