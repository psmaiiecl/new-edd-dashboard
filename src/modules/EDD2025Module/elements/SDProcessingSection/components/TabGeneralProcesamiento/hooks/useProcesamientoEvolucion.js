// hooks/useEvolucionProcesamiento.js
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../services/axiosInstance";

export const useProcesamientoEvolucion = () => {
  const [data, setData] = useState({ series: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvolucion = async () => {
      try {
        const response = await axiosInstance.post("/back/public/api2025/2025-procesamiento-evolucion");

        const rawSeries = response.data?.series || [];
        console.log("Datos crudos evolución:", response.data);
        // Validación básica
        if (!Array.isArray(rawSeries)) {
          throw new Error("Estructura de datos inválida desde el backend");
        }

        const formattedSeries = rawSeries.map((serie) => ({
          name: serie.name,
          data: serie.data.map(([timestamp, value]) => [Number(timestamp), Number(value)]),
        }));
        
        setData({ series: formattedSeries });
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
