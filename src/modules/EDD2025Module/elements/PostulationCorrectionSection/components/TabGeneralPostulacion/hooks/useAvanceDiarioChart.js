import { useMemo } from "react";

import axios from "axios";

/**
 * Hook para obtener los datos del gráfico de avance diario de postulaciones.
 * @param {Object} filtros - Parámetros para el POST.
 * @param {String} anio - Año a consultar, por ejemplo "2025".
 */
export function useAvanceDiarioChart(filtros, anio = "2025") {
  const endpoint = `/back/public/api${anio}/${anio}-avance-diario-postulaciones`;

  const { data, isLoading, error } = useSWR(
    filtros ? [endpoint, filtros] : null,
    ([url, filtros]) => axios.post(url, filtros).then((res) => res.data)
  );

  const chartData = useMemo(() => {
    const avance = data?.postulacion?.avance_diario_postulaciones;
    if (!avance) return null;

    const fechas = avance.fechas;
    const correctores = avance.correctores;
    const supervisores = avance.supervisores;

    const supervisores_requeridos = 127;
    const total_seleccionados_requeridos = 1328;
    const correctores_requeridos = 1201;

    return {
      fechas,
      series: [
        {
          name: "Postulantes Totales",
          color: "#ff537c",
          data: correctores,
        },
        {
          name: "Pueden ser Supervisores",
          color: "#c1d9ca",
          data: supervisores,
        },
        {
          name: "Supervisores Requeridos",
          color: "#ff8e53",
          dashStyle: "longdash",
          data: fechas.map(() => supervisores_requeridos),
        },
        {
          name: "Total Seleccionados Requeridos",
          color: "#65d7aa",
          dashStyle: "longdash",
          data: fechas.map(() => total_seleccionados_requeridos),
        },
      ],
      resumen: {
        total_seleccionados_requeridos,
        correctores_requeridos,
        supervisores_requeridos,
        postulantes_totales: avance.postulantes_totales,
        total_correctores: avance.total_correctores,
        total_supervisores: avance.total_supervisores,
      },
    };
  }, [data]);

  return {
    data: chartData,
    isLoading,
    error,
  };
}
