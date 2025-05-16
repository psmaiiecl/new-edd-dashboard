import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BasicLegend } from "../BasicLegend";

const ColumnChart = ({
  subtitle = [],
  color = {},
  dataMapper = (data) => data,
  chartData,
  showLegend = true,
}) => {
  const [total, setTotal] = useState(0);
  const [mappedData, setMappedData] = useState({});

  useEffect(() => {
    if (chartData) {
      const newData = dataMapper(chartData, color, subtitle);
      setTotal(chartData.total);
      setMappedData(newData);
    }
  }, [chartData, dataMapper, color, subtitle]);

  const options = {
    chart: {
      type: "column",
      backgroundColor: null,
    },
    title: {
      text: total?.data,
      align: "center",
      style: {
        fontWeight: "bold",
        color: "#5157FF",
        fontSize: "28px",
      },
    },
    subtitle: {
      text: total?.subtitulo,
      align: "center",
      style: {
        fontWeight: "bold",
        color: "#666666",
        fontSize: "14px",
      },
    },
    xAxis: {
      type: "category",
      title: { text: null },
      labels: {
        style: {
          fontSize: "11px",
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      pointFormat: "<b>{point.name}</b><br/>Valor: {point.y}",
      style: {
        fontSize: "13px",
        color: "#666666",
      },
    },
    plotOptions: {
      column: {
        colorByPoint: true,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y}",
        },
      },
    },
    legend: {
      enabled: showLegend,
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      itemStyle: {
        fontSize: "10px",
        fontWeight: "bold",
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Categorías",
        colorByPoint: true,
        data: mappedData?.series ?? [],
      },
    ],
  };

  return (
    <div className="column-chart-wrapper">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <hr />
      {mappedData.series && mappedData.series.length > 0 && (
        <BasicLegend data={mappedData.series} total={total?.data} />
      )}
    </div>
  );
};

export default ColumnChart;
