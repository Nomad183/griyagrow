// Small inline SVG icons used by the auth screens (no extra packages needed).
const G = '#2a7c13';

export const ChevronRight = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const ChevronLeft = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M15 5l-7 7 7 7" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Backspace = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M9 5h10a2 2 0 012 2v10a2 2 0 01-2 2H9l-6-7z" fill="none" stroke="#000" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M12 9.5l5 5M17 9.5l-5 5" stroke="#000" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
export const PersonIcon = (p) => (
  <svg viewBox="0 0 24 24" fill={G} aria-hidden="true" {...p}>
    <circle cx="12" cy="7.5" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" />
  </svg>
);
export const StoreIcon = (p) => (
  <svg viewBox="0 0 24 24" fill={G} aria-hidden="true" {...p}>
    <path d="M3.5 3h17L22 9.5c0 1.4-1.1 2.5-2.5 2.5S17 10.9 17 9.5c0 1.4-1.1 2.5-2.5 2.5S12 10.9 12 9.5c0 1.4-1.1 2.5-2.5 2.5S7 10.9 7 9.5C7 10.9 5.9 12 4.5 12S2 10.9 2 9.5z" />
    <path d="M4.5 13.5H7v6h10v-6h2.5V21h-15z" />
  </svg>
);
export const PersonCheckIcon = (p) => (
  <svg viewBox="0 0 24 24" fill={G} aria-hidden="true" {...p}>
    <circle cx="9" cy="7.5" r="4" />
    <path d="M1.5 20c0-3.9 3.1-6 7.5-6s7.5 2.1 7.5 6z" />
    <path d="M16.5 11.5l2.2 2.2 4-4.4" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const GoogleIcon = (p) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...p}>
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
    <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
);
export const FacebookIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="#1877F2" d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.9c-.3 0-1.3-.2-2.4-.2-2.5 0-4.1 1.5-4.1 4.2v2.6H7.6v3.3h2.8V22z" />
  </svg>
);
export const LinkedInIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <rect width="24" height="24" rx="3" fill="#0A66C2" />
    <path fill="#fff" d="M6.5 9.5h2.4V18H6.5zM7.7 5.7a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8zM10.4 9.5h2.3v1.2c.4-.7 1.3-1.4 2.6-1.4 2.7 0 3.2 1.8 3.2 4V18h-2.4v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V18h-2.4z" />
  </svg>
);
