// hooks/useProcesamientoDependencia.js
import { useEffect, useState } from 'react';
import axiosInstance from "../../../../../services/axiosInstance";

export function useProcesamientoDependencia() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.post(
          '/back/public/api2025/2025-procesamiento-dependencia'
        );

        if (!cancel) {
          const raw = response.data;

          console.log("✅ Respuesta Dependencia:", raw);

          // Revisa que venga en la forma esperada
          if (!raw.procesamientoPorDependencia?.categories || !raw.procesamientoPorDependencia?.series) {
            throw new Error("Formato de datos inesperado del backend");
          }

          setData({
            categories: raw.procesamientoPorDependencia.categories,
            series: raw.procesamientoPorDependencia.series
          });
        }
      } catch (err) {
        if (!cancel) {
          setError(err);
          console.error("Error al obtener procesamiento Dependencia:", err);
        }
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    fetchData();
    return () => { cancel = true; };
  }, []);

  return { data, loading, error };
}
