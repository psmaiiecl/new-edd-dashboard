import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { precapacitacionChartOptions } from "../utils/precapacitacionChartOptions";

export default function PrecapacitacionPieChart({ title, data }) {
  const estados = [
    { name: "No Iniciada", color: "#f85a8b" },
    { name: "En Unidad 1", color: "#ffd54f" },
    { name: "En Unidad 2", color: "#ffecb3" },
    { name: "En Unidad 3", color: "#90caf9" },
    { name: "En Unidad 4", color: "#81d4fa" },
    { name: "Terminada", color: "#80cbc4" },
  ];

  // Mapear datos garantizando que todos los estados aparezcan
  const seriesData = estados.map((estado) => {
    const valor = data?.find((d) => d.name === estado.name)?.y ?? 0;
    return {
      name: estado.name,
      y: valor,
      color: estado.color,
      showInLegend: true
    };
  });

  const options = {
    ...precapacitacionChartOptions,
    title: { text: title },
    legend: {
      enabled: true,
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      itemStyle: {
        fontSize: "13px",
        fontWeight: "normal",
      },
    },
    plotOptions: {
      pie: {
        // ...precapacitacionChartOptions.plotOptions.pie,
        showInLegend: true,
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f}%",
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Cantidad",
        data: seriesData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
