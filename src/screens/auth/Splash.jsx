import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

// Splash 1: logo only. After a moment → Splash 2: the "Mulai" button fades in.
export default function Splash() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="gg-screen gg-splash">
      <img className="gg-splash-logo" src="/assets/splash-logo.png" alt="Griya Grow" />
      <button
        type="button"
        className={`gg-splash-cta${ready ? ' is-visible' : ''}`}
        onClick={() => navigate('/onboarding')}
        tabIndex={ready ? 0 : -1}
      >
        Mulai
      </button>
    </main>
  );
}
