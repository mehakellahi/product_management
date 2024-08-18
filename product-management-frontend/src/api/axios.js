import axios from "axios";
import store from "../store"; // Adjust the import path based on your project structure

// Set the base URL for your API

axios.defaults.baseURL = "http://127.0.0.1:8000";

// Add a request interceptor to include the token in headers
axios.interceptors.request.use(
  (config) => {
    const token = store.state.token || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
