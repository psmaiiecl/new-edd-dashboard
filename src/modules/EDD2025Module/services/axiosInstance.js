import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Define en .env
  headers: {
    "Content-Type": "application/json",
  },
});

// Agrega el token 't' en cada petición
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Guarda el token al iniciar sesión
    if (token) {
      config.headers["t"] = token; // Usamos 't' para enviar el token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
