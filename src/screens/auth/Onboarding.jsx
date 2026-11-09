import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from './icons';
import './auth.css';

const SLIDES = [
  {
    img: '/assets/onboarding-1.png',
    title: 'Kelola Greenhouse Lebih Mudah',
    desc: 'Pantau pertumbuhan tanaman dan kelola budidaya melon dalam satu aplikasi.',
  },
  {
    img: '/assets/onboarding-2.png',
    title: 'Panen Terencana, Pasar Lebih Luas',
    desc: 'Hubungkan hasil panen dengan mitra bisnis dan konsumen melalui pemesanan yang praktis.',
  },
  {
    img: '/assets/onboarding-3.png',
    title: 'Bisnis Terkelola dalam Satu Genggaman',
    desc: 'Kelola stok, transaksi, dan laporan keuangan secara terintegrasi.',
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const last = step === SLIDES.length - 1;
  const slide = SLIDES[step];

  const next = () => (last ? navigate('/sign-in') : setStep(step + 1));

  return (
    <main className="gg-screen gg-onb">
      {!last && (
        <button type="button" className="gg-onb-skip" onClick={() => navigate('/sign-in')}>
          Lewati
        </button>
      )}

      <img key={`img-${step}`} className="gg-onb-art" src={slide.img} alt="" />

      <div key={`copy-${step}`} className="gg-onb-copy">
        <h1 className="gg-onb-title">{slide.title}</h1>
        <p className="gg-onb-desc">{slide.desc}</p>
      </div>

      <div className="gg-dots" role="tablist" aria-label="Halaman onboarding">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === step}
            aria-label={`Halaman ${i + 1}`}
            className={`gg-dot${i === step ? ' is-active' : ''}`}
            onClick={() => setStep(i)}
          />
        ))}
      </div>

      <button type="button" className="gg-onb-next" onClick={next} aria-label={last ? 'Mulai' : 'Lanjut'}>
        {last ? 'Mulai' : <ChevronRight />}
      </button>
    </main>
  );
}
