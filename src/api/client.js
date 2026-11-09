import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (!response) {
      console.error('[API] Network error:', error.message);
      return Promise.reject({ ...error, code: 'NETWORK_ERROR' });
    }

    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      if (!window.location.pathname.startsWith('/sign-in') &&
          !window.location.pathname.startsWith('/sign-up') &&
          !window.location.pathname.startsWith('/otp-verification') &&
          !window.location.pathname.startsWith('/role-selection') &&
          !window.location.pathname.startsWith('/onboarding')) {
        window.location.href = '/sign-in';
      }
      return Promise.reject({ ...error, code: 'UNAUTHORIZED' });
    }

    if (response.status === 403) {
      console.error('[API] Forbidden:', response.data);
      return Promise.reject({ ...error, code: 'FORBIDDEN' });
    }

    if (response.status >= 500) {
      console.error('[API] Server error:', response.status, response.data);
      return Promise.reject({ ...error, code: 'SERVER_ERROR' });
    }

    return Promise.reject(error);
  }
);

export const apiGet = (url, config) => api.get(url, config).then(r => r.data);
export const apiPost = (url, data, config) => api.post(url, data, config).then(r => r.data);
export const apiPut = (url, data, config) => api.put(url, data, config).then(r => r.data);
export const apiPatch = (url, data, config) => api.patch(url, data, config).then(r => r.data);
export const apiDelete = (url, config) => api.delete(url, config).then(r => r.data);

export default api;
