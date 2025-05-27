import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { usePortafolioData } from "../TabGeneralPortafolio/hooks/usePortafolioData";
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { usePortafolioData } from "../TabGeneralPortafolio/hooks/usePortafolioData";

export default function GraficoAvanceDiario({ filtros }) {
  const { data, loading, error } = usePortafolioData(filtros);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar datos.</p>;
  if (!data || !data["portafolio-avance-diario"])
    return <p>No hay datos disponibles.</p>;

  const avance = data["portafolio-avance-diario"];
  const fechas = avance.fechas || [];
  const pfCompletado = avance.pfCompletado || [];
  const pfIniciados = avance.pfIniciados || [];
  const pfCompletado_cant = avance.pfCompletado_cant || [];
  const pfIniciados_cant = avance.pfIniciados_cant || [];

  const chartOptions = {
    chart: { type: "line" },
    title: { text: "Avance Diario de Portafolio (%)" },
    xAxis: { categories: fechas, title: { text: "Fecha" } },
    yAxis: {
      title: { text: "Porcentaje (%)" },
      max: 100,
      min: 0,
    },
    tooltip: {
      shared: true,
      valueSuffix: "%",
    },
    series: [
      { name: "Completado", data: pfCompletado, color: "#27ae60" },
      { name: "Iniciado", data: pfIniciados, color: "#f39c12" },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <h3>Datos absolutos diarios</h3>
      <table
        border="1"
        cellPadding="5"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Portafolio Completado</th>
            <th>Portafolio Iniciado</th>
          </tr>
        </thead>
        <tbody>
          {fechas.map((fecha, i) => (
            <tr key={i}>
              <td>{fecha}</td>
              <td>{pfCompletado_cant[i]}</td>
              <td>{pfIniciados_cant[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
