import { useMemo } from "react";
import useSWR from "swr";
import axios from "axios";

/**
 * Hook para obtener el avance diario de postulaciones.
 * @param {Object} filtros - Filtros a enviar al backend (por ejemplo: { region: '13' }).
 * @param {String} anio - Año del endpoint, por ejemplo: "2024" o "2025".
 */
export function useAvanceDiarioPostulaciones(filtros, anio = "2025") {
  const endpoint = `/back/public/api${anio}/${anio}-avance-diario-postulaciones`;

  const { data, isLoading, error } = useSWR(
    filtros ? [endpoint, filtros] : null,
    ([url, filtros]) => axios.post(url, filtros).then((res) => res.data)
  );

  const dataProcesada = useMemo(() => {
    const avance = data?.postulacion?.avance_diario_postulaciones;
    if (!avance) return null;

    return {
      fechas: avance.fechas ?? [],
      correctores: avance.correctores ?? [],
      supervisores: avance.supervisores ?? [],
      postulantes_totales: avance.postulantes_totales ?? 0,
      total_correctores: avance.total_correctores ?? 0,
      total_supervisores: avance.total_supervisores ?? 0,
    };
  }, [data]);

  return {
    data: dataProcesada,
    isLoading,
    error,
  };
}
