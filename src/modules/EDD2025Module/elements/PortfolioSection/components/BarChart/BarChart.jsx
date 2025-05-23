import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BasicLegend } from "../BasicLegend";
const nf = new Intl.NumberFormat("es-CL");
export const BarChart = ({
  
  subtitle,
  chartData,

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
        fontWeight: "bold",
        color: "rgb(102, 102, 102)",
        fontSize: "14px",
      },
    },
     xAxis: {
       title: { text: null },
        categories: mappedData.categories || [],
        labels: {
        enabled:true,
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
      itemStyle: {
				"fontSize": "13px",
			},
			y: 20,
			margin: 40
    },
    credits: {
      enabled: false,
    },
    
    series: mappedData?.series ?? [],
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
                  {serie.data[i]?.valor ?? 0}
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
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
            <hr />
            <div className="pie-chart-legend">
            {renderTablaValores()}</div>
         
    </>
  );
};

export default BarChart;
