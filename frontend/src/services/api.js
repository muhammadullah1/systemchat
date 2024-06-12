import axios from "axios";
import io from "socket.io-client";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

// Configurando o Socket.IO
const socket = io(process.env.REACT_APP_BACKEND_URL);

socket.on("connect", () => {
  console.log("Socket connected successfully!");
});

socket.on("disconnect", () => {
  console.log("Socket disconnected.");
});


// Interceptando as requisições do Axios
api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptando as respostas do Axios
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Erro de resposta:", error.response);
    } else if (error.request) {
      console.error("Erro de requisição:", error.request);
    } else {
      console.error("Erro ao configurar requisição:", error.message);
    }
    return Promise.reject(error);
  }
);

export { api, socket };
