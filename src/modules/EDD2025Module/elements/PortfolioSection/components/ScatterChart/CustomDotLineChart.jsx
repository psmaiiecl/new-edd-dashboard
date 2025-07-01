import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export function CustomDotLineChart({ title, fechas, series, textGraph }) {
  if (!fechas || !series) return null;

  const options = {
    chart: {
      align: "center",
      type: "line",
      backgroundColor: "transparent",
    },
    title: {
      useHTML: true,
      text: title,
      align: "center",
      style: {
        fontWeight: "bold",
        fontSize: "18px",
      },
    },
    xAxis: {
      categories: fechas,
      title: {
        textGraph,
      },
      labels: {
        rotation: -45,
        style: {
          fontSize: "10px",
        },
      },
    },
    yAxis: {
      title: {
        enabled: false,
      },
      labels: {
        format: "{value}",
      },
    },
    tooltip: {
      shared: true,
      valueSuffix: "",
      useHTML: true,
    },
    plotOptions: {
      series: {
        color: "#FFA500",
        label: {
          connectorAllowed: false,
          valueDecimals: 2,
        },
      },
    },

    series: series.map((s) => ({
      name: s.name,
      data: s.data,
      color: s.color,
    })),
    credits: {
      enabled: false,
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
    },
  };

  //TODO: CREAR COMPONENTE  PARA QUE GRAFIQUE
  console.log("Crear grafico de linea");

  return (
    <div className="dot-line-container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
