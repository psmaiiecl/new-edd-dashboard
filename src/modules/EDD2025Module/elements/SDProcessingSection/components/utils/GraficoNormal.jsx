
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function GraficoNormal({ data }) {
  if (!data) return null; 
  const options = {
    chart: {
      type: "bar",
      height: 600,
      style: { color: "#333333", fontSize: "14px", fontWeight: "bold" },
    },
    title: {
      text: "",
      align: "center",
      style: { fontWeight: "bold", color: "#5157FF", fontSize: "35px" },
    },
    xAxis: {
      categories: data.categories,
      labels: { style: { fontSize: "12px" } },
    },
    yAxis: {
      visible: true,
      title: { text: "" },
      labels: { format: "{value}", style: { fontSize: "13px" } },
    },
    tooltip: {
      pointFormat:
        '<span style="font-size:12px;"><span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> </span><br/>',
      shared: true,
    },
    plotOptions: { bar: { stacking: "normal", dataLabels: { enabled: false } } },
    series: data.series
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
