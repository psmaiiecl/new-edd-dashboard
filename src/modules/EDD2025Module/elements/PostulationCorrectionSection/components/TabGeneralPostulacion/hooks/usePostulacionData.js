// ./hooks/usePostulacionData.js
import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../../../../services/axiosInstance"; // importa tu instancia personalizada

export function usePostulacionData(url, filtros = null) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(url); // usa axiosInstance en lugar de axios
        const d = res.data?.postulacion?.avance_diario_postulaciones;

        setData({
          fechas: d?.fechas || [],
          series: [
            { name: "Postulantes Totales", total_postulantes: d?.postulantes_totales || 0 },
            { name: "Pueden ser Supervisores", total_correctores: d?.total_correctores || 0 },
            { name: "Supervisores Requeridos", total_supervisores: d?.total_supervisores || 0 },
            { name: "Total de Seleccionados Requeridos", data: d?.correctores || [] },
          ],
          resumen: {
            total_postulantes: d?.postulantes_totales || 0,
            total_correctores: d?.total_correctores || 0,
            total_supervisores: d?.total_supervisores || 0,
          },
        });
      } catch (error) {
        console.error("Error al obtener datos de postulaciones:", error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, filtros]);

  return { data, isLoading };
}
