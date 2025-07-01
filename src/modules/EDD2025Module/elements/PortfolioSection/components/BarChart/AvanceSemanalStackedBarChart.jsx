import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useAvanceDiarioChart from "../TabGeneralPortafolio/hooks/useAvanceDiarioChart";

function AvanceSemanalStackedBarChart({ data, colors, title = "AVANCE SEMANAL DE PORTAFOLIO" }) {
  const { categories, series } = useAvanceDiarioChart(data, colors);

  const options = {
    chart: {
      type: "bar",
      backgroundColor: "transparent",
    },
    title: {
      text: title,
      align: "center",
      style: {
        fontWeight: "bold",
        fontSize: "18px",
      },
    },
    xAxis: {
      categories,
      title: { text: null },
      labels: {
        rotation: -45,
        style: { fontSize: "10px" },
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      title: { text: "Porcentaje (%)" },
      labels: {
        format: "{value}%",
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        const puntos = this.points;
        const dia = this.x;
        let html = `<b>${dia}</b><br/>`;
        puntos.forEach((p) => {
          html += `<span style="color:${p.series.color}">\u25CF</span> ${p.series.name}: <b>${p.point.valor}</b> (${p.y.toFixed(1)}%)<br/>`;
        });
        return html;
      },
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    series,
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
    <div className="avance-diario-stacked-bar-chart">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
export default AvanceSemanalStackedBarChart;