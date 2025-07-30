import { useEffect, useState } from "react";
import axios from "../../../../../services/axiosInstance";

export function useProcesamientoDiario() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcesamientoDiario = async () => {
      try {
        const response = await axiosInstance.get("/back/public/api2025/2025-procesamiento-diario");
        setSeries(response.data.series || []); // asegúrate que `series` esté bien definido
      } catch (err) {
        setError(err);
        console.error("Error al obtener procesamiento diario:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProcesamientoDiario();
  }, []);

  return { series, loading, error };
}
