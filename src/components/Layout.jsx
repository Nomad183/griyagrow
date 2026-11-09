import { Outlet } from 'react-router-dom';
import './Layout.css';

// Responsive phone frame: max 440px, full width on mobile, centered on desktop
export default function Layout() {
  return (
    <div className="layout">
      <div className="phone-frame">
        <Outlet />
      </div>
    </div>
  );
}