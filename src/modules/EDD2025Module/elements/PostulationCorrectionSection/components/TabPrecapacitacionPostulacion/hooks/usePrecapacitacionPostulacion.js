import { useContext, useEffect, useState } from "react";
import axios from "../../../../../services/axiosInstance";
import { LoadingContext } from "../../../../../../../context/LoadingContext";

export const usePrecapacitacionPostulacion = (filtros) => {
  const [data, setData] = useState(null);
  const { queueLoading, dequeueLoading } = useContext(LoadingContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_BASE_URL + "/back/public/api2024";

  useEffect(() => {
    if (!filtros || Object.keys(filtros).length === 0) return;

    queueLoading(true);
    setError(null);

    const body = new FormData();
    Object.entries(filtros).forEach(([key, value]) => {
      body.append(key, value);
    });

    axios
      .post(`${baseURL}/2024-precapacitacion`, body)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener datos de precapacitación:", err);
        setError(err);
      })
      .finally(() => {
        dequeueLoading(false);
      });

  }, [filtros]);

  return { data, error };
};
