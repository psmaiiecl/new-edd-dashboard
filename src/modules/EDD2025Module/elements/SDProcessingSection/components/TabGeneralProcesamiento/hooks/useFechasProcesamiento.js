import { useEffect, useState } from "react";
import axiosInstance from "../../../../../services/axiosInstance";

function formatFecha(timestamp) {
  const fecha = new Date(Number(timestamp));
  return `${fecha.getDate().toString().padStart(2, '0')}-${(fecha.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${fecha.getFullYear()}`;
}

export function useFechasProcesamiento() {
  const [categories, setCategories] = useState([]);
  const [loadingFechas, setLoadingFechas] = useState(true);
  const [errorFechas, setErrorFechas] = useState(null);

  useEffect(() => {
    const fetchFechas = async () => {
      try {
        const response = await axiosInstance.post("/back/public/api2025/2025-procesamiento-diario");
        const rawData = response.data;

        if (!Array.isArray(rawData)) throw new Error("Formato inesperado");

        const allTimestamps = new Set();
        rawData.forEach(serie =>
          serie.data.forEach(([timestamp]) => {
            allTimestamps.add(Number(timestamp));
          })
        );

        const sortedTimestamps = Array.from(allTimestamps).sort((a, b) => a - b);
        const fechas = sortedTimestamps.map(formatFecha);
        setCategories(fechas);
      } catch (err) {
        setErrorFechas(err);
        console.error("Error cargando fechas:", err);
      } finally {
        setLoadingFechas(false);
      }
    };

    fetchFechas();
  }, []);

  return { categories, loadingFechas, errorFechas };
}
