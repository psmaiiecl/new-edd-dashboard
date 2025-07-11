import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BasicLegend } from "../BasicLegend";
import { ConvertirPalabras } from "../../../../utils/PortfolioUtils";

//import "./index.css";
import { numberFormatter } from "../../../../../../utils/NumberFormatter";

const PieChart = ({
  subtitle = [],
  color = [],
  dataMapper = (data) => data,
  chartData,
  showLegend = true,
}) => {
  const [total, setTotal] = useState(0);
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    Highcharts.setOptions({
      lang: {
        thousandsSep: ".", 
      },
    });
    if (chartData) {
      const newData = dataMapper(chartData, color, subtitle);
      setTotal(chartData.total);
      setMappedData(newData);
    }
  }, [chartData, dataMapper, color, subtitle]);

  const options = {

    chart: {
      type: "pie",
      backgroundColor: null,
      height: null, // hace que use el tamaño del contenedor
      width: null,
    },
    title: {
      text: numberFormatter(total?.data),
      align: "center",
      style: {
        fontWeight: "bold",
        color: "#0f69b5",
        fontSize: "35px",
      },
    },
    subtitle: {
      text: subtitle,

      align: "center",
      style: {
        color: "rgb(102, 102, 102)",
        fontSize: "14px",
      },
    },
    tooltip: {
      pointFormat: "<b>{point.y}</b> ({point.percentage:.0f}%)<br/>",
      style: {
        fontSize: "13px",
        color: "#666666",
      },
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        center: ["50%", "50%"],
        dataLabels: {
          enabled: true,
          format:
            "<b>{point.name}</b>: <b>{point.y:,.0f}</b> ({point.percentage:.0f}%)<br/>",
          style: {
            fontSize: "12px",
            color: "#666666",
          },
        },
        showInLegend: showLegend,
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: showLegend,
      verticalAlign: "bottom",

      layout: "horizontal",
      itemDistance: 1,
      itemStyle: {
        fontSize: "9px",
      },
    },

    series: [
      {
        color: color.data,
        name: "Cantidad",
        data: chartData?.series ?? [],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
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
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <hr />
      {mappedData.series && mappedData?.series.length > 0 && (
        <BasicLegend data={chartData.series} total={total.data} />
      )}
    </>
  );
};

export default PieChart;
