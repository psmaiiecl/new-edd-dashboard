import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const nf = new Intl.NumberFormat("es-CL");

export const BarChart = ({
  subtitle = [],
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
      type: "bar",
      backgroundColor: null,
    },
    title: {
      text: total?.data,
      align: "center",
      style: {
        fontWeight: "bold",
        color: "#5157FF",
        fontSize: "24px",
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
    xAxis: {
      title: { text: null },
      categories: mappedData.categories || [],
      labels: {
        enabled: true,
        style: {
          fontSize: "11px",
        },
      },

    },
    yAxis: {
      min: 0,
      title: {
        enabled: false
      },
      labels: {
        style: {
          fontSize: "11px",
        },
      },
      tickInterval: 10,
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
      bar: {
        stacking: "percent",
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}%",
          style: {
            fontSize: "12px",
            color: "#666666",
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
        fontSize: "10px"
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
      <div className="tab-dependencia-table-container">
        <table className="legend-table">
          <thead className="legend-table__head">
            <tr>
              <th>Dependencia</th>
              {mappedData.series.map((serie, i) => (
                <th key={i} ><div style={{
                  alignItems: "center",
                  backgroundColor: serie.color,
                  borderRadius: "5px",
                  width: "70px",
                  textAlign: "center",
                  padding: "2px",
                  fontWeight: "500",
                  placeSelf: "center",
                  margin: "0 auto",
                }}><span>{serie.name}</span></div></th>
              ))}
            </tr>
          </thead>
          <tbody className="legend-table__body">
            {categorias.map((cat, i) => (
              <tr key={i}>
                <td className="centered-cell">{cat}</td>
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
    <div className="tab-dependencia-grupo">

      <HighchartsReact highcharts={Highcharts} options={options} />
      {renderTablaValores()}
      {/* <div className="pie-chart-legend">
            {showLegend && <BasicLegend series={mappedData.series} />}
          </div> */}
    </div>
  );
};

export default BarChart;