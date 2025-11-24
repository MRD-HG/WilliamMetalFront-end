import axios from "axios";

const api = axios.create({
  // Use /api when in dev (proxied to backend), or full URL for production
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : import.meta.env.VITE_API_URL || "http://localhost:5062/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000
});

// attach token dynamically using request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Add response interceptor to handle 403 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.error("Unauthorized: Token may be invalid or expired");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
