import axios from 'axios';

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const API_ORIGIN = isLocalhost
  ? 'http://localhost:8080'
  : (import.meta.env.VITE_API_ORIGIN || 'https://gineracollegemain-01.onrender.com').replace(/\/$/, '');

const baseURL = `${API_ORIGIN}/api`;

export const getMediaUrl = (url, fallback = '/placeholder.png') => {
  if (!url) return fallback;
  if (url.startsWith('http')) return url;
  return `${API_ORIGIN}${url.startsWith('/') ? url : `/${url}`}`;
};

const axiosInstance = axios.create({
  baseURL,
  timeout: 15000,
});

axiosInstance.interceptors.response.use((response) => {
  const contentType = response.headers?.["content-type"] || "";
  if (typeof response.data === "string" && contentType.includes("text/html")) {
    return Promise.reject(new Error("API returned HTML instead of JSON"));
  }
  return response;
});

export default axiosInstance;
