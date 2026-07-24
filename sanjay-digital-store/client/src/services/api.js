import axios from "axios";

const api = axios.create({
  baseURL: "https://sanjaydigital.onrender.com/api",
  withCredentials: false,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("authToken") || localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");

      // Prevent redirecting if we're already on the login page or if it's the initial auth check
      if (
        window.location.pathname !== "/admin/login" &&
        error.config.url !== "/auth/check"
      ) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
