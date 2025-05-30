import { useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import { LoadingContext } from "../context/LoadingContext";

export function useCustomDownload() {
  const { getToken } = useContext(AuthContext);
  const { notificate } = useContext(NotificationContext);
  const { queueLoading, dequeueLoading } = useContext(LoadingContext);

  const customDownload = useCallback(
    async (route, options, filename = "file.xlsx", hasLoadPanel = true) => {
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
        notificate({ type: "success", message: `Descargando ${filename}` });
        const blob = await response.blob();
        const urlBlob = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = urlBlob;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(urlBlob);
        if (hasLoadPanel) dequeueLoading();
      } catch (error) {
        notificate({ type: "error", message: error.message });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return customDownload;
}
