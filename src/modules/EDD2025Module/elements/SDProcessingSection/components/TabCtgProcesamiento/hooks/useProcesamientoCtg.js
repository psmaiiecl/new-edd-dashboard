import { useEffect, useState } from 'react';
import axiosInstance from "../../../../../services/axiosInstance";

export function useProcesamientoCtg() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.post('/back/public/api2025/2025-procesamiento-ctg');

        if (!cancel) {
          const data = response.data;

          console.log("✅ Respuesta CTG:", data);

          if (!data.ctg || !data.series) {
            throw new Error("Faltan datos en la respuesta del backend");
          }

          setData({
            categories: data.ctg,
            series: data.series,
          });
        }
      } catch (err) {
        if (!cancel) {
          setError(err);
          console.error("Error al obtener procesamiento CTG:", err);
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

