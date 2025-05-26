const nf = new Intl.NumberFormat("es-CL");
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BasicLegend } from "../BasicLegend";

const ColumnChart = ({
  subtitle = [],
  color = {},
  chartData,
  showLegend = true,
}) => {
  const [total, setTotal] = useState(0);
  const [mappedData, setMappedData] = useState({});

  useEffect(() => {
    if (chartData && Object.keys(chartData).length > 0) {
      setTotal(chartData.total);
      setMappedData(chartData);
    }
  }, [chartData]);

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
      text: subtitle,
      align: "center",
      style: {
        fontWeight: "bold",
        color: "#666666",
        fontSize: "14px",
      },
    },
    xAxis: {
      categories: mappedData.categories || [],
      title: { text: null },
      labels: {
        style: {
          fontSize: "11px",
        },
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      title: { text: "Porcentaje (%)" },
      stackLabels: {
        enabled: false,
      },
    },
    tooltip: {
      shared: true,
      formatter: function () {
        let s = `<b>${this.key}</b><br/>`;
        this.points.forEach(function (point) {
          s += `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${nf.format(point.point.valor)}</b> (${point.y}%)<br/>`;
        });
        return s;
      },
    },
    plotOptions: {
      column: {
        stacking: "percent",
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.y ? `${this.y.toFixed(1)}%` : null;
          },
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
    series: mappedData?.series ?? [],
  };
  const renderTablaValores = () => {
    if (!mappedData.series || mappedData.series.length === 0) return null;

    const categorias = mappedData.categories || [];

    return (
      <div className="table-responsive mt-3">
        <table className="table table-bordered table-sm">
          <thead className="table-light">
            <tr>
              <th>Dependencia</th>
              {mappedData.series.map((serie, i) => (
                <th key={i} style={{ borderRadius: '5px', backgroundColor: serie.color }}>{serie.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat, i) => (
              <tr key={i}>
                <td>{cat}</td>
                {mappedData.series.map((serie, j) => (
                  <td key={j}>
                    {nf.format(serie.data[i]?.valor ?? 0)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="column-chart-wrapper">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <hr />
      <div className="pie-chart-legend">
        {renderTablaValores()}
        {showLegend && <BasicLegend series={mappedData.series} />}
      </div>
    </div>
  );
};

export default ColumnChart;