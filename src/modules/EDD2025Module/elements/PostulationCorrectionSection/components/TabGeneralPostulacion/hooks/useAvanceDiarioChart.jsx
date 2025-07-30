// hooks/useAvanceDiarioChart.js

import { useMemo } from "react";

const DEFAULT_COLORES = {
  completado: "#2ecc71",
  iniciado: "#f1c40f",
  no_iniciado: "#e74c3c",
};

const DIAS_SEMANA = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

function useAvanceDiarioChart(data, customColors) {
  return useMemo(() => {
    if (!data) return { categories: [], series: [] };

    const fechas = data["postulacion-avance-diario"]?.fechas ?? [];
    const avance = data["postulacion-avance-portafolio"] ?? {};

    const tipos = ["completado", "iniciado", "no_iniciado"];
    const colores = { ...DEFAULT_COLORES, ...customColors };

    const categories = fechas.map((f) => {
      const fecha = new Date(f);
      return DIAS_SEMANA[fecha.getDay()];
    });

    const series = tipos.map((tipo) => ({
      name: tipo.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      color: colores[tipo],
      data: fechas.map((_, index) => {
        const valor = avance[tipo]?.[index] ?? 0;
        const total = tipos.reduce(
          (sum, t) => sum + (avance[t]?.[index] ?? 0),
          0
        );
        const porcentaje = total ? (valor / total) * 100 : 0;

        return {
          y: parseFloat(porcentaje.toFixed(2)),
          valor,
          porcentaje: porcentaje.toFixed(1),
          total,
        };
      }),
    }));

    return { categories, series };
  }, [data, customColors]);
}
export default useAvanceDiarioChart;
