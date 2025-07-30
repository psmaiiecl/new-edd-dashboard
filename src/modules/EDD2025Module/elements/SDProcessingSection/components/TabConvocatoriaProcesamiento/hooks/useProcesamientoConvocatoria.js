// hooks/useProcesamientoConvocatoria.js
import { useEffect, useState } from 'react';
import axiosInstance from "../../../../../services/axiosInstance";

export function useProcesamientoConvocatoria() {
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
          '/back/public/api2025/2025-procesamiento-convocatoria'
        );

        if (!cancel) {
          const result = response.data;

          if (result && result.categories && result.series) {
            setData(result);
          } else {
            throw new Error('Estructura inesperada en datos de convocatoria');
          }
        }
      } catch (err) {
        if (!cancel) {
          setError(err);
          console.error("Error al obtener procesamiento convocatoria:", err);
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
