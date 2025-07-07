import React, { useEffect } from "react";
import axios from "axios";

export default function AvanceDiarioFetcher({
  convocatoria,
  estado,
  region,
  dependencia,
  valorJSON = "etiqueta",
  webservice,
  onSuccess,
  onError,
  loadingId,
}) {
  useEffect(() => {
    const fetchData = async () => {
      const etiqueta = `2024-portafolio-avance-diario#convocatoria:${convocatoria}$estado:${estado}$dependencia:${dependencia}$region:${region}`;
      
      let url =
        webservice.replace("/api", "/api2024") +
        `/datos-json?etiqueta=${encodeURIComponent(etiqueta)}`;

      if (valorJSON === "original") {
        url =
          webservice.replace("/api", "/api2024") +
          "/2024-portafolio-avance-diario";
      }

      if (loadingId) {
        document.getElementById(loadingId)?.classList.remove("d-none");
      }

      try {
        const response = await axios.post(
          url,
          { convocatoria, estado, region, dependencia, etiqueta },
          {
            headers: { t: localStorage.getItem("token") },
          }
        );

        onSuccess?.(response.data);
      } catch (error) {
        console.error("Error al obtener avance diario:", error);
        onError?.(error);
      } finally {
        if (loadingId) {
          document.getElementById(loadingId)?.classList.add("d-none");
        }
      }
    };

    fetchData();
  }, [convocatoria, estado, region, dependencia, valorJSON, webservice]);

  return null;
}
