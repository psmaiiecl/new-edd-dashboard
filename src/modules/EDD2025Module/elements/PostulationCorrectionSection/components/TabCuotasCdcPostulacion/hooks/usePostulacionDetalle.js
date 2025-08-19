// ./hooks/usePostulacionDetalle.js
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../services/axiosInstance";

export const usePostulacionDetalle = (centroId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!centroId) return;

    const fetchDetalle = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: response } = await axiosInstance.get(
          "/back/public/api2024/2024-cuotas-cdc/",
          { params: { centro: centroId } }
        );

        setData(response ?? []);
      } catch (err) {
        console.error("Error obteniendo detalle:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalle();
  }, [centroId]);

  return { data, loading, error };
};
