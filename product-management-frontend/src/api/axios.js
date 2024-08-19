import axios from "axios";
import store from "../store"; // Import Vuex store

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Request interceptor to add token to headers
instance.interceptors.request.use(
  (config) => {
    const token = store.state.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized access (e.g., logout the user)
      store.dispatch("clearToken");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default instance;
