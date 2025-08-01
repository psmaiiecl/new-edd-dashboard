import { useEffect, useState } from "react";
import axios from "../../../../../services/axiosInstance";

export function usePortafolioDataDependencia(filtros = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_BASE_URL + "/back/public/api2025";

  useEffect(() => {
    //(modificado por Roberto) se comenta esta línea porque en esta pestaña no hay filtros
    //if (!filtros || Object.keys(filtros).length === 0) return;

    setLoading(true);
    setError(null);

    //(modificado por Roberto) se comentan estas líneas porque en esta pestaña no hay filtros (hasta la 22)
    //Object.entries(filtros).forEach(([key, value]) => {
    //  //if (value !== "") body.append(key, value);
    //});
    // en conocimiento
    const body = new FormData();
    axios
      .post(`${baseURL}/2025-portafolio-tab-dependencia`, body)
      .then((res) => {
        //console.log("pulento", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error(
          "Error al obtener datos de portafolio por agrupacion:",
          err
        );
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [JSON.stringify(filtros)]);

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
