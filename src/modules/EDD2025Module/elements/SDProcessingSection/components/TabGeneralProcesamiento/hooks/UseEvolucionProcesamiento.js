import { useEffect, useState } from "react";
import axiosInstance from "../../../../../services/axiosInstance";

export const useEvolucionProcesamiento = () => {
  const [data, setData] = useState({ series: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvolucion = async () => {
      try {
        const response = await axiosInstance.post(
          "/back/public/api2025/2025-procesamiento-evolucion"
        );

        setData(response.data); // 👈 ya viene en formato Highcharts
      } catch (err) {
        console.error("Error al obtener evolución:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvolucion();
  }, []);

  return { data, loading, error };
};
