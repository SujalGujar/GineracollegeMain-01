import axios from 'axios';

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const API_ORIGIN = isLocalhost
  ? 'http://localhost:8080'
  : (import.meta.env.VITE_API_ORIGIN || 'https://gineracollegemain-01.onrender.com').replace(/\/$/, '');

const baseURL = `${API_ORIGIN}/api`;

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
  return config;
}, (error) => Promise.reject(error));

axiosInstance.interceptors.response.use((response) => {
  activeRequests = Math.max(0, activeRequests - 1);
  notifyLoadingListeners();
  const contentType = response.headers?.["content-type"] || "";
  if (typeof response.data === "string" && contentType.includes("text/html")) {
    return Promise.reject(new Error("API returned HTML instead of JSON"));
  }
  return response;
}, async (error) => {
  const config = error.config;
  if (config && (!config._retryCount || config._retryCount < 2) && (error.code === 'ECONNABORTED' || !error.response || error.response.status >= 500)) {
    config._retryCount = (config._retryCount || 0) + 1;
    await new Promise(r => setTimeout(r, 1200 * config._retryCount));
    return axiosInstance(config);
  }
  activeRequests = Math.max(0, activeRequests - 1);
  notifyLoadingListeners();
  return Promise.reject(error);
});

export default axiosInstance;
