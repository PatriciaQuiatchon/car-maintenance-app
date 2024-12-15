import axios from "axios";
import getBackendURL from "./config";

const api = axios.create({
  baseURL: getBackendURL(),
});

export default api;