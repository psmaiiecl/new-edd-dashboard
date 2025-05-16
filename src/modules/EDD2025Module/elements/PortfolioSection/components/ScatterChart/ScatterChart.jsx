import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const ScatterChart = ({ title, chartData, showLegend = true }) => {
  const options = {
    chart: {
      type: "scatter",
      zoomType: "xy",
      backgroundColor: null,
    },
    title: {
      text: title,
      align: "center",
      style: {
        fontWeight: "bold",
        color: "#5157FF",
        fontSize: "18px",
      },
    },
    xAxis: {
      type: "category",
      categories: [],
      title: { text: "Fecha" },
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
        format: "{value}%",
      },
    },
    tooltip: {
      shared: true,
      crosshairs: true,
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          symbol: "circle",
        },
        dataLabels: {
          enabled: false,
        },
        showInLegend: showLegend,
      },
    },
    credits: { enabled: false },
    legend: {
      enabled: showLegend,
      verticalAlign: "bottom",
      layout: "horizontal",
      itemDistance: 1,
      itemStyle: {
        fontSize: "9px",
        fontWeight: "bold",
      },
    },
    series: chartData?.series ?? [],
    responsive: {
      rules: [
        {
          condition: { maxWidth: 500 },
          chartOptions: {
            legend: {
              align: "center",
              verticalAlign: "bottom",
              layout: "horizontal",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="general-scatter-chart-container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ScatterChart;
