import Axios from "axios";
import useAuthStore from '@/lib/authStore';

const axios = Axios.create({
  // Use relative path to leverage the Vite proxy
  baseURL: '/api',
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withXSRFToken: true,
  timeout: 30000,
});

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    // Try store first, fallback to localStorage
    const authStore = useAuthStore.getState();
    const token = authStore.token || localStorage.getItem("token");
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log detailed error for debugging
    console.error("API Error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    // Handle expired token or unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }

    // Handle server errors
    if (error.response?.status === 500) {
      console.error("Server error:", error);
    }

    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error);
    }

    return Promise.reject(error);
  }
);

export default axios;