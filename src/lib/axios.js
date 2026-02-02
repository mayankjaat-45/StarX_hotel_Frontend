// lib/axios.js
import axios from "axios";

export const publicApi = axios.create({
  baseURL: "http://76.13.176.202/api",
});

const api = axios.create({
  baseURL: "http://76.13.176.202/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
