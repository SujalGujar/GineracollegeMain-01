import axios from 'axios';

// Smart host detection: handles localhost, loopback, and local network Wi-Fi/LAN IPs (e.g. 192.168.x.x, 10.x.x.x)
const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const isLocalOrLan = 
  hostname === 'localhost' || 
  hostname === '127.0.0.1' || 
  hostname.startsWith('192.168.') || 
  hostname.startsWith('10.') || 
  hostname.startsWith('172.') || 
  hostname.endsWith('.local');

export const API_ORIGIN = (import.meta.env.VITE_API_ORIGIN)
  ? import.meta.env.VITE_API_ORIGIN.replace(/\/$/, '')
  : (isLocalOrLan
      ? `http://${hostname}:8080`
      : 'https://gineracollegemain-01.onrender.com');

const baseURL = `${API_ORIGIN}/api`;

// ─── Fast Client-Side Cache Layer (SWR) ──────────────────────────────────────
const memoryCache = new Map();

export const getCachedData = (key, fallback = null) => {
  if (!key) return fallback;
  if (memoryCache.has(key)) return memoryCache.get(key);
  try {
    const raw = localStorage.getItem(`ginera_cache_${key}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      memoryCache.set(key, parsed);
      return parsed;
    }
  } catch (e) {}
  return fallback;
};

export const setCachedData = (key, data) => {
  if (!key || data === undefined || data === null) return;
  memoryCache.set(key, data);
  try {
    localStorage.setItem(`ginera_cache_${key}`, JSON.stringify(data));
  } catch (e) {}
};

// Background pre-warm for cloud backends (e.g. Render free tier cold-start)
let warmedUp = false;
export const warmUpBackend = () => {
  if (warmedUp) return;
  warmedUp = true;
  try {
    fetch(`${API_ORIGIN}/health`, { method: 'GET', keepalive: true }).catch(() => {});
  } catch (e) {}
};

export const getMediaUrl = (url, fallback = '/placeholder.png') => {
  if (!url || typeof url !== 'string') return fallback;

  let cleanUrl = url.replace(/\\/g, '/').trim();

  // If DB contains absolute localhost / 127.0.0.1 or old backend URLs with /uploads/
  if (cleanUrl.includes('/uploads/')) {
    const uploadIndex = cleanUrl.indexOf('/uploads/');
    const uploadPath = cleanUrl.substring(uploadIndex); // '/uploads/filename.ext'
    return `${API_ORIGIN}${uploadPath}`;
  }

  if (cleanUrl.startsWith('uploads/')) {
    return `${API_ORIGIN}/${cleanUrl}`;
  }

  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://') || cleanUrl.startsWith('data:') || cleanUrl.startsWith('blob:')) {
    if ((cleanUrl.includes('localhost') || cleanUrl.includes('127.0.0.1')) && cleanUrl.includes('uploads')) {
      const idx = cleanUrl.indexOf('/uploads');
      if (idx !== -1) {
        return `${API_ORIGIN}${cleanUrl.substring(idx)}`;
      }
    }
    return cleanUrl;
  }

  if (cleanUrl.startsWith('/')) {
    return `${API_ORIGIN}${cleanUrl}`;
  }

  return `${API_ORIGIN}/${cleanUrl}`;
};

const axiosInstance = axios.create({
  baseURL,
  timeout: 45000,
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
});

let activeRequests = 0;
const loadingListeners = new Set();
const notifyLoadingListeners = () => loadingListeners.forEach(listener => listener(activeRequests));

export const subscribeToApiLoading = (listener) => {
  loadingListeners.add(listener);
  listener(activeRequests);
  return () => loadingListeners.delete(listener);
};

// Allows route changes to wait for requests started by page effects.
export const waitForApiIdle = (settleDelay = 75) => new Promise((resolve) => {
  let timer;
  const check = (count) => {
    if (timer) clearTimeout(timer);
    if (count === 0) {
      timer = setTimeout(() => {
        if (activeRequests === 0) {
          unsubscribe();
          resolve();
        }
      }, settleDelay);
    }
  };
  const unsubscribe = subscribeToApiLoading(check);
});

axiosInstance.interceptors.request.use((config) => {
  activeRequests += 1;
  notifyLoadingListeners();
  if (config.method === 'get' || !config.method) {
    config.params = { ...config.params, _cb: Date.now() };
  }
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

axiosInstance.interceptors.response.use((response) => {
  activeRequests = Math.max(0, activeRequests - 1);
  notifyLoadingListeners();
  const contentType = response.headers?.["content-type"] || "";
  if (typeof response.data === "string" && contentType.includes("text/html")) {
    return Promise.reject(new Error("API returned HTML instead of JSON"));
  }

  // Automatically cache successful read queries for instant future reloads
  if (response.config?.method === 'get' || !response.config?.method) {
    const rawUrl = response.config?.url || '';
    if (rawUrl && response.data && typeof response.data === 'object') {
      const cleanKey = rawUrl.split('?')[0];
      setCachedData(cleanKey, response.data);
    }
  }

  return response;
}, async (error) => {
  activeRequests = Math.max(0, activeRequests - 1);
  notifyLoadingListeners();
  const config = error.config;
  if (config && (!config._retryCount || config._retryCount < 2) && (error.code === 'ECONNABORTED' || !error.response || error.response.status >= 500)) {
    config._retryCount = (config._retryCount || 0) + 1;
    await new Promise(r => setTimeout(r, 1200 * config._retryCount));
    return axiosInstance(config);
  }
  return Promise.reject(error);
});

export default axiosInstance;
