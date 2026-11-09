import { useEffect, useState } from 'react';

const W = 440, H = 956;
const calc = () => Math.min(1, window.innerWidth / W, window.innerHeight / H);

/** Renders a 440x956 design frame, scaled down to fit small viewports. */
export default function Phone({ children }) {
  const [s, setS] = useState(calc);
  useEffect(() => {
    const on = () => setS(calc());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return (
    <div className="stage">
      <div className="phone-shadow" style={{ width: W * s, height: H * s, overflow: 'hidden' }}>
        <div style={{ width: W, height: H, transform: `scale(${s})`, transformOrigin: 'top left' }}>{children}</div>
      </div>
    </div>
  );
}
