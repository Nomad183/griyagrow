import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

/**
 * Protect routes by role.
 * Usage:
 *   <RequireAuth roles={['customer']}><CustomerTabsLayout /></RequireAuth>
 *   <RequireAuth roles={['mitra', 'owner']}><AdminPanel /></RequireAuth>
 *   <RequireAuth><AnyAuthedPage /></RequireAuth> // any logged-in user
 */
export function RequireAuth({ children, roles, fallback }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-brand-green border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    // Redirect to sign-in with return URL
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    // Role mismatch - redirect to appropriate dashboard
    const roleRoutes = {
      customer: '/customer/home',
      mitra: '/mitra/home',
      owner: '/owner',
      staff: '/staff/home',
    };
    const target = roleRoutes[user.role] || '/';
    return <Navigate to={target} replace />;
  }

  return children;
}

// Convenience wrappers for each role
export const RequireCustomer = ({ children }) => (
  <RequireAuth roles={['customer']}>{children}</RequireAuth>
);

export const RequireMitra = ({ children }) => (
  <RequireAuth roles={['mitra']}>{children}</RequireAuth>
);

export const RequireOwner = ({ children }) => (
  <RequireAuth roles={['owner']}>{children}</RequireAuth>
);

export const RequireStaff = ({ children }) => (
  <RequireAuth roles={['staff']}>{children}</RequireAuth>
);

// For pages accessible by any authenticated user
export const RequireAnyAuth = ({ children }) => (
  <RequireAuth>{children}</RequireAuth>
);
