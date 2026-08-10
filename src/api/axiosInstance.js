import axios from 'axios';

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const API_ORIGIN = isLocalhost
  ? 'http://localhost:8080'
  : (import.meta.env.VITE_API_ORIGIN || 'https://gineracollegemain-01.onrender.com').replace(/\/$/, '');

const baseURL = `${API_ORIGIN}/api`;

export const getMediaUrl = (url, fallback = '/placeholder.png') => {
  if (!url) return fallback;
  if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('blob:')) return url;
  if (url.startsWith('uploads') || url.startsWith('/uploads')) {
    return `${API_ORIGIN}${url.startsWith('/') ? url : `/${url}`}`;
  }
  return url;
};

const axiosInstance = axios.create({
  baseURL,
  timeout: 15000,
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
}, (error) => {
  activeRequests = Math.max(0, activeRequests - 1);
  notifyLoadingListeners();
  return Promise.reject(error);
});

export default axiosInstance;
