import { useEffect, useState } from "react";
import axios from "../../../../../services/axiosInstance";

export function usePortafolioDataConvocatoria(filtros = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = "http://api-docentemas-dev.3htp.cloud:8095/back/public/api2025";

  useEffect(() => {


    setLoading(true);
    setError(null);

    const body = new FormData();
    axios
      .post(`${baseURL}/2025-portafolio-tab-convocatoria`)
      .then((res) => {
        //console.log("Datos Bar Dependencia", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener datos de portafolio por dependencia:", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [JSON.stringify(filtros)]);

  return {
    general: data?.general || null,
    modulo1: data?.modulo1 || null,
    modulo2: data?.modulo2 || null,
    modulo3: data?.modulo3 || null,
    loading,
    error,
    data
  };
}
