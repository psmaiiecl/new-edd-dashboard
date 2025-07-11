const nf = new Intl.NumberFormat("es-CL");
import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BasicLegend } from "../BasicLegend";

const ColumnChart = ({ subtitle = [], chartData, showLegend = true }) => {
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
          s += `<span style="color:${point.color}">\u25CF</span> ${
            point.series.name
          }: <b>${nf.format(point.point.valor)}</b> (${point.y}%)<br/>`;
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
      <div style={{ width: "60%", margin: "0 auto" }}>
        <table className="legend-table">
          <thead className="legend-table__head">
            <tr>
              <th>{mappedData?.tableName || ''}</th>
              {mappedData.series.map((serie, i) => (
                <th
                  key={i}
                  style={{
                    alignItems: "center",
                    backgroundColor: serie.color,
                    borderRadius: "5px",
                    width: "60px",
                    textAlign: "center",
                    padding: "2px",
                    fontWeight: "500",
                    placeSelf: "center",
                    margin: "0 auto",
                  }}
                >
                  {serie.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="legend-table__body">
            {categorias.map((cat, i) => (
              <tr key={i}>
                <td>{cat}</td>
                {mappedData.series.map((serie, j) => (
                  <td key={j}>{nf.format(serie.data[i]?.valor ?? 0)}</td>
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
      {renderTablaValores()}
      {/* <div className="pie-chart-legend">
        {showLegend && <BasicLegend series={mappedData.series} />}
      </div> */}
    </div>
  );
};

export default ColumnChart;
