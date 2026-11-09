import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth from localStorage on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('auth_user');

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          // Optionally validate token with backend
          // await api.get('/auth/me');
        } catch {
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Send OTP for login or register
  const sendOTP = useCallback(async (phone, type) => {
    setError(null);
    try {
      const res = await api.post('/auth/send-otp', { phone, type });

      if (!res.success) throw new Error(res.message || 'Gagal mengirim OTP');

      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Terjadi kesalahan';
      setError(msg);
      return { success: false, message: msg };
    }
  }, []);

  // Verify OTP and complete login/register
  const verifyOTP = useCallback(async (phone, otp) => {
    setError(null);
    try {
      const res = await api.post('/auth/verify-otp', { phone, otp });

      if (!res.success) throw new Error(res.message || 'Kode OTP salah');

      const { token, role: userRole, ...userData } = res;

      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify({ ...userData, role: userRole }));
      setUser({ ...userData, role: userRole });

      return { success: true, role: userRole };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Terjadi kesalahan';
      setError(msg);
      return { success: false, message: msg };
    }
  }, []);

  // Legacy login (direct phone login without OTP) - kept for compatibility
  const login = useCallback(async (phone, role) => {
    setError(null);
    try {
      const res = await api.post('/auth/login', { phone });

      if (!res.success) throw new Error(res.message || 'Login gagal');

      const { token, role: userRole, ...userData } = res;

      if (role && userRole !== role) {
        throw new Error(`Akun ini terdaftar sebagai ${userRole}, bukan ${role}`);
      }

      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify({ ...userData, role: userRole }));
      setUser({ ...userData, role: userRole });

      return { success: true, role: userRole };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Terjadi kesalahan';
      setError(msg);
      return { success: false, message: msg };
    }
  }, []);

  const register = useCallback(async (name, phone, role) => {
    setError(null);
    try {
      const res = await api.post('/auth/register', { name, phone, role });

      if (!res.success) throw new Error(res.message || 'Registrasi gagal');

      // After registration, typically need OTP verification
      // Don't auto-login yet - let OTP flow handle it
      return { success: true, userId: res.data?.id };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Terjadi kesalahan';
      setError(msg);
      return { success: false, message: msg };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
    window.location.href = '/sign-in';
  }, []);

  const updateUser = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('auth_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const hasRole = useCallback((...roles) => {
    return user && roles.includes(user.role);
  }, [user]);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    sendOTP,
    verifyOTP,
    logout,
    updateUser,
    hasRole,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}