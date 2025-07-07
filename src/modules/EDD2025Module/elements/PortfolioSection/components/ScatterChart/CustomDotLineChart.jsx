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
        formatter: function () {
          return new Intl.NumberFormat('es-CL').format(this.value);
        },
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        let tooltip = `<b>${this.x}</b><br/>`;
        this.points.forEach(point => {
          const valor = new Intl.NumberFormat('es-CL').format(point.y);
          tooltip += `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${valor}</b><br/>`;
        });
        return tooltip;
      },
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

  return (
    <div className="dot-line-container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
