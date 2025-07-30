import { useEffect, useState } from 'react';
import axiosInstance from "../../../../../services/axiosInstance";

export function useProcesamientoRegion() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.post('/back/public/api2025/2025-procesamiento-region');

        if (!cancel) {
          const responseData = response.data;

          console.log("✅ Respuesta Region:", responseData);

          if (!responseData.categories || !responseData.series) {
            throw new Error("Faltan datos en la respuesta del backend");
          }

          setData({
            categories: responseData.categories,
            series: responseData.series,
          });
        }
      } catch (err) {
        if (!cancel) {
          setError(err);
          console.error("❌ Error al obtener procesamiento Región:", err);
        }
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancel = true;
    };
  }, []);

  return { data, loading, error };
}
