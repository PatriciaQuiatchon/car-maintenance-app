import axios from "axios";
import getBackendURL from "./config";

const api = axios.create({
  baseURL: getBackendURL(),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('site');
  if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;