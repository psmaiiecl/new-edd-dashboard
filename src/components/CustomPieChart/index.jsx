import "./style.css";
import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// eslint-disable-next-line no-unused-vars
import exporting from "highcharts/modules/exporting";
import { numberFormatter } from "../../utils/NumberFormatter";
import { initPieChartConfig } from "../../utils/ChartConfigBuilder";

/**
 * La data que debe llegar a este componente para poder renderizarse debe tener la siguiente estructura:
 * data{  
 *  series: {
 *     name: item.name,
 *     y: parseInt(data[item.key]),
 *     color: item.color,
 *     sliced: item.sliced || false,
 *     selected: item.selected || false,
 *  },
 *  total: {
 *     numeric: total,
 *     text: numberFormatter(total),
 *  },
 *  override: {}
 *}
 */
export function CustomPieChart({
  subtitle,
  data,
  legend = true,
  overrideConfig,
}) {
  const [chartSetup, setChartSetup] = useState(
    initPieChartConfig(subtitle, overrideConfig)
  );

  useEffect(() => {
    if (!data) return;
    setChartSetup((prev) => ({
      ...prev,
      title: {
        ...prev.title,
        number: data.total.numeric,
        text: data.total.text,
      },
      series: [
        {
          ...prev.series[0],
          data: data.series,
        },
      ],
      ...data?.override,
    }));
  }, [data]);
  return (
    <div className="pie-chart-container">
      <HighchartsReact options={chartSetup} highcharts={Highcharts} />
      <hr />
      {legend && chartSetup && (
        <BasicLegend
          data={chartSetup.series.length > 0 ? chartSetup.series[0]?.data : []}
          total={+chartSetup.title.number || 0}
        />
      )}
    </div>
  );
}

function BasicLegend({ data, total }) {
  return (
    <div className="pie-chart-legend">
      {data.map((item, index) => (
        <LegendItem item={item} total={total} key={index} />
      ))}
    </div>
  );
}

function LegendItem({ item, total }) {
  const percentage = ((item.y / total) * 100).toFixed(1);
  return (
    <div className="pie-chart-legend__item roboto-light">
      <span className="legend__item__title">{item.name}</span>
      <div
        style={{
          alignItems: "center",
          backgroundColor: item.color,
          borderRadius: "5px",
          width: "60px",
          textAlign: "center",
          fontSize: "15px",
          padding: "2px",
          fontWeight: "500",
          margin: "5px 0",
        }}
      >
        <span>{numberFormatter(item.y)}</span>
      </div>
      <span>{isNaN(percentage) ? 0 : percentage}%</span>
    </div>
  );
}
