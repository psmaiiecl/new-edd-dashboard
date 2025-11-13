import { useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import { LoadingContext } from "../context/LoadingContext";

export function useCustomDownload() {
  const { getToken } = useContext(AuthContext);
  const { notificate } = useContext(NotificationContext);
  const { queueLoading, dequeueLoading } = useContext(LoadingContext);

  const customDownload = useCallback(
    async ({
      route,
      options,
      filename = "file.xlsx",
      hasLoadPanel = true,
      rawURL,
    }) => {
      if (hasLoadPanel) queueLoading();
      let URL = import.meta.env.VITE_BASE_URL + route;
      if (rawURL) URL = rawURL;
      try {
        const response = await fetch(URL, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            t: getToken(),
            ...options?.headers,
          },
        });

        if(response.status === 429){
          throw new Error("Demasiadas solicitudes al servidor, espere unos momentos");

        }
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
      } catch (error) {
        notificate({ type: "error", message: error.message });
      } finally {
        if (hasLoadPanel) dequeueLoading();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return customDownload;
}
