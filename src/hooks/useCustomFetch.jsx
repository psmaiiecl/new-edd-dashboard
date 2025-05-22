import { useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import { LoadingContext } from "../context/LoadingContext";

export function useCustomFetch() {
  const { getToken } = useContext(AuthContext);
  const { notificate } = useContext(NotificationContext);
  const { queueLoading, dequeueLoading } = useContext(LoadingContext);

  const customFetch = useCallback(
    async (route, options, hasLoadPanel = true) => {
      if (hasLoadPanel) queueLoading();
      const URL = import.meta.env.VITE_BASE_URL + route;
      try {
        const response = await fetch(URL, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            t: getToken(),
            ...options?.headers,
          },
        });

        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        if (hasLoadPanel) dequeueLoading();
        return await response.json();
      } catch (error) {
        notificate({ type: "error", message: error.message });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return customFetch;
}
