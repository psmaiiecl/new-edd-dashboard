import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";

export function useCustomFetch() {
  const { getToken } = useContext(AuthContext);
  const { notificate } = useContext(NotificationContext);

  const customFetch = async (route, options) => {
    const URL = import.meta.env.VITE_BASE_URL + route;
    try {
      const response = await fetch(URL, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          t: getToken(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      return await response.json();
    } catch (error) {
      notificate({ type: "error", message: error.message });
    }
  };

  return customFetch;
}
