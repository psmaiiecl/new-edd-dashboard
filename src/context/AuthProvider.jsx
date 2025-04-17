import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const login = async (
    email,
    password,
    navigate,
    notificate,
    queueLoading,
    dequeueLoading
  ) => {
    const URL = import.meta.env.VITE_BASE_URL + "/public/api/login";
    const body = { usuario: email, contrasena: password };
    if (queueLoading) queueLoading();
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (dequeueLoading) dequeueLoading();
    if (response.status !== 200) {
      notificate({ type: "Error", message: "Error al hacer login" });
      return;
    }
    const data = await response.json();
    localStorage.token = data.token;
    navigate("/dashboard");
  };

  const logout = async (navigate) => {
    const URL = `https://resultados-ee-2024.iie.cl/resultados_api/auth/logout`;
    await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    localStorage.clear();
    navigate("/");
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return token;
  };

  const getUsuario = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const { usuario } = jwtDecode(token);
    return usuario;
  };

  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const { id_usuario } = jwtDecode(token);
    return id_usuario;
  };

  const getRol = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const { rol } = jwtDecode(token);
    return rol;
  };

  const getNombre = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const { nombre } = jwtDecode(token);
    return nombre;
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        getToken,
        getUsuario,
        getUserId,
        getRol,
        getNombre,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
