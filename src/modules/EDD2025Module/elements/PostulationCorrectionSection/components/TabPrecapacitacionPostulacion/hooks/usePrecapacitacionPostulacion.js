import { useContext, useEffect, useState } from "react";
import axios from "../../../../../services/axiosInstance";
import { LoadingContext } from "../../../../../../../context/LoadingContext";

export const usePrecapacitacionPostulacion = () => {
  const [data, setData] = useState(null);
  const { queueLoading, dequeueLoading } = useContext(LoadingContext);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_BASE_URL + "/back/public/api2024";

  useEffect(() => {
    queueLoading(true);
    setError(null);

    axios
      .get(`${baseURL}/2024-precapacitacion/-1/-1/-1`)
      .then((res) => {
        setData(res.data);
        console.log("Datos recibidos:", res.data);
      })
      .catch((err) => {
        console.error("Error al obtener datos de precapacitación:", err);
        setError(err);
      })
      .finally(() => {
        dequeueLoading(false);
      });
  }, []);

  return { data, error };
};
