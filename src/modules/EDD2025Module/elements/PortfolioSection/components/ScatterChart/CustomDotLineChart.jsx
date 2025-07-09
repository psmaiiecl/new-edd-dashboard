import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Utilidad para formatear
function formatValue(val, type = "integer") {
  if (type === "percent") return `${parseFloat(val).toFixed(2)}%`;
  if (type === "integer") return new Intl.NumberFormat("es-CL").format(val);
  return val;
}

export function CustomDotLineChart({ title, fechas, series, textGraph, valueFormat = "integer" }) {
  if (!fechas || !series) return null;

  Highcharts.setOptions({
    lang: {
      thousandsSep: ".",
    },
  });

  const options = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
    },
	  title: {
		text: title,
		align: "center",
		style: {
		  fontWeight: "normal",
		  fontSize: "15px",
		  color: "#666666",
		},
	  },
  /*
    title: {
      useHTML: true,
      text: title,
      align: 'center',
            style: {
                fontWeight: 400,
                fontSize: '18px',
            }
        },
		*/
    xAxis: {
      categories: fechas,
      title: {
        text: textGraph,
      },
      labels: {
        rotation: -45,
        style: {
          fontSize: "0.8em",
		  fill: "rgb(51, 51, 51)",
        },
      },
    },
    yAxis: {
      title: { enabled: false },
      labels: {
        formatter: function () {
          return formatValue(this.value, valueFormat);
        },
        style: { fontSize: "12px" },
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        let tooltip = `<b>${this.key}</b><br/>`;
        this.points.forEach((point) => {
          tooltip += `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${formatValue(point.y, valueFormat)}</b><br/>`;
        });
        return tooltip;
      },
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          formatter: function () {
            return formatValue(this.y, valueFormat);
          },
          style: { fontSize: "10px" },
        },
        label: {
          connectorAllowed: false,
        },
      },
    },
    series: series.map((s) => ({
      name: s.name,
      data: s.data,
      color: s.color,
    })),
    credits: { enabled: false },
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
