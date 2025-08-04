import { useEffect, useState } from "react";
import axiosInstance from "../../../../../services/axiosInstance";
import { useFechasProcesamiento } from "./useFechasProcesamiento";

export function useProcesamientoDiarioChart() {
  const { categories, loadingFechas, errorFechas } = useFechasProcesamiento();
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const response = await axiosInstance.post("/back/public/api2025/2025-procesamiento-diario");
        const rawData = response.data;

        const formattedSeries = rawData.map(serie => {
          const valoresPorFecha = Object.fromEntries(
            serie.data.map(([timestamp, valor]) => {
              const f = new Date(Number(timestamp));
              const fecha = `${f.getDate().toString().padStart(2, '0')}-${(f.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${f.getFullYear()}`;
              return [fecha, valor];
            })
          );

          const data = categories.map(fecha => valoresPorFecha[fecha] ?? 0);
          return { name: serie.name, data };
        });

        setSeries(formattedSeries);
      } catch (err) {
        console.error("Error en gráfico:", err);
      } finally {
        setLoading(false);
      }
    };

    if (categories.length) fetchChart();
  }, [categories]);

  return { series, categories, loading: loading || loadingFechas, error: errorFechas };
}
