import { useEffect, useState } from "react";
import axios from "../../../../../services/axiosInstance";

export function usePortafolioDataRegion(filtros = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL =
    import.meta.env.VITE_BASE_URL + "/back/public/api2025";

  useEffect(() => {
    //if (!filtros || Object.keys(filtros).length === 0) {
    //	console.log("entra acá");
    //	return;
    //}

    setLoading(true);
    setError(null);

    axios
      .post(`${baseURL}/2025-portafolio-tab-region`)
      .then((res) => {
        //console.log("Region", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener datos de portafolio por Region:", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [JSON.stringify()]);

  return {
    //general: data?.general || null,
    //modulo1: data?.modulo1 || null,
    //modulo2: data?.modulo2 || null,
    //modulo3: data?.modulo3 || null,
    loading,
    error,
    data,
  };
}
