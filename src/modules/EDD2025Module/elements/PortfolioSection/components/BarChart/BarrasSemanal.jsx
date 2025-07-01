import React from "react";
import { AvanceDiarioStackedBarChart } from "./AvanceDiarioStackedBarChart";
import { useAvanceDiarioChart } from "./hooks/useAvanceDiarioChart";

function mapAvanceSemanal(data) {
  if (!data) return null;

  // Extrae fechas
  const fechas = data["portafolio-avance-diario"]?.fechas ?? [];

  // Series de avance
  const avance = data["portafolio-avance-portafolio"] ?? {};

  const tipos = ["completado", "iniciado", "no_iniciado"];

  const colores = {
    completado: "#2ecc71",
    iniciado: "#f1c40f",
    no_iniciado: "#e74c3c"
  };

  // Construir series apiladas
  const series = tipos.map(tipo => {
    return {
      name: tipo.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase()),
      color: colores[tipo],
      data: fechas.map((fecha, index) => {
        const valor = avance[tipo]?.[index] ?? 0;

        const total = tipos.reduce((sum, t) => sum + (avance[t]?.[index] ?? 0), 0);
        const porcentaje = total ? (valor / total) * 100 : 0;

        return {
          y: parseFloat(porcentaje.toFixed(2)),
          valor,
          porcentaje: porcentaje.toFixed(1),
          total
        };
      })
    };
  });
  return {
    categories: fechas,
    series
  };
}

export default function BarrasSemanal() {
  const { data } = useAvanceDiarioChart();

  const customColors = {
    completado: "#4CAF50",
    iniciado: "#FFC107",
    no_iniciado: "#F44336",
  };

  return (
    <div>
      <AvanceDiarioStackedBarChart
        data={data}
        colors={customColors}
        title="Avance Diario Personalizado"
      />
    </div>
  );
}
