// Ikon khusus layar staff. ChevronLeft/ChevronRight pakai yang di ../auth/icons.
const GREEN = '#2A7C13';
const GREY = '#AEAEB2';

export const NavHome = ({ active }) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    <path d="M25.9653 23.4931V15.168C25.9653 14.4972 25.8289 13.8334 25.5642 13.2169C25.2996 12.6005 24.9123 12.0444 24.426 11.5823L16.5411 4.09314C16.0815 3.65653 15.4718 3.41309 14.8379 3.41309C14.204 3.41309 13.5943 3.65653 13.1347 4.09314L5.24861 11.5823C4.76225 12.0444 4.37498 12.6005 4.11034 13.2169C3.8457 13.8334 3.70923 14.4972 3.70923 15.168V23.4931C3.70923 24.1489 3.96977 24.7779 4.43352 25.2417C4.89728 25.7054 5.52628 25.966 6.18213 25.966H23.4924C24.1483 25.966 24.7773 25.7054 25.241 25.2417C25.7048 24.7779 25.9653 24.1489 25.9653 23.4931Z" fill={active ? GREEN : 'none'} stroke={active ? GREEN : GREY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.1279 18.5471C11.1279 17.8913 11.3885 17.2623 11.8522 16.7985C12.316 16.3348 12.945 16.0742 13.6008 16.0742H16.0737C16.7296 16.0742 17.3586 16.3348 17.8223 16.7985C18.2861 17.2623 18.5466 17.8913 18.5466 18.5471V25.9658H11.1279V18.5471Z" fill={active ? '#fff' : 'none'} stroke={active ? GREEN : GREY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const NavScan = ({ active }) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    <path d="M5 5H10.0125V2.5H2.5V10H5V5ZM5 20H2.5V27.5H10.0125V25H5V20ZM25 25H20V27.5H27.5V20H25V25ZM20 5H25V10H27.5V2.5H20V5Z" fill={active ? GREEN : GREY} stroke={active ? GREEN : GREY} strokeWidth="1" />
  </svg>
);

export const NavActivity = ({ active }) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    <path d="M6.875 5H23.125C23.8154 5 24.375 5.55964 24.375 6.25V26.25C24.375 26.9404 23.8154 27.5 23.125 27.5H6.875C6.18464 27.5 5.625 26.9404 5.625 26.25V6.25C5.625 5.55964 6.18464 5 6.875 5Z" stroke={active ? GREEN : GREY} fill={active ? GREEN : 'none'} strokeWidth="2" strokeLinejoin="round" />
    <path d="M11.25 2.5V6.25M18.75 2.5V6.25M10 11.875H20M10 16.875H17.5M10 21.875H15" stroke={active ? '#fff' : GREY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const NavProfile = ({ active }) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    <path d="M4.9458 22.2554C4.9458 20.9437 5.46687 19.6857 6.39439 18.7582C7.32191 17.8306 8.5799 17.3096 9.8916 17.3096H19.7832C21.0949 17.3096 22.3529 17.8306 23.2804 18.7582C24.2079 19.6857 24.729 20.9437 24.729 22.2554C24.729 22.9112 24.4685 23.5402 24.0047 24.004C23.541 24.4677 22.912 24.7283 22.2561 24.7283H7.4187C6.76285 24.7283 6.13386 24.4677 5.6701 24.004C5.20634 23.5402 4.9458 22.9112 4.9458 22.2554Z" stroke={active ? GREEN : GREY} fill={active ? GREEN : 'none'} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M18.5466 8.65467C18.5466 10.7033 16.8859 12.364 14.8373 12.364C12.7887 12.364 11.1279 10.7033 11.1279 8.65467C11.1279 6.60605 12.7887 4.94531 14.8373 4.94531C16.8859 4.94531 18.5466 6.60605 18.5466 8.65467Z" stroke={active ? GREEN : GREY} fill={active ? GREEN : 'none'} strokeWidth="2.5" />
  </svg>
);

export const QrBig = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3" />
    <rect x="8" y="8" width="3" height="3" /><rect x="13" y="8" width="3" height="3" /><rect x="8" y="13" width="3" height="3" /><path d="M13 13h3v3h-3z" />
  </svg>
);

export const ChevronDown = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}><path d="M5 9l7 7 7-7" /></svg>
);
export const ArrowRight = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}><path d="M4 12h16M14 6l6 6-6 6" /></svg>
);
export const ImagePlus = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <rect x="3" y="5" width="15" height="15" rx="2" /><path d="M3 16l5-5 4 4 2-2 4 4M19 2v6M16 5h6" />
  </svg>
);
export const Check = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}><path d="M5 12.5l4.5 4.5L19 7" /></svg>
);
export const UserOutline = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3 3-5 7-5s7 2 7 5z" />
  </svg>
);
export const BookSearch = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M3 5l6-2 6 2v12l-6-2-6 2z" /><circle cx="16" cy="16" r="3" /><path d="M18.5 18.5L21 21" />
  </svg>
);
