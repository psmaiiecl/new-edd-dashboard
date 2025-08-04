import { useEffect, useState } from "react";
import axiosInstance from "../../../../../services/axiosInstance";


export function useProcesamientoTable() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcesamientoDiario = async () => {
      try {
        const response = await axiosInstance.post("/back/public/api2025/2025-procesamiento-diario");
        const rawData = response.data;

        if (!Array.isArray(rawData)) {
          throw new Error("Formato inesperado en el backend.");
        }

        const formattedSeries = rawData.map(serie => ({
          name: serie.name,
          data: serie.data.map(([timestamp, value]) => [Number(timestamp), Number(value)])
        }));

        setSeries(formattedSeries);
        console.log('grafico diario:'+formattedSeries);
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
