import "./index.css";
import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// eslint-disable-next-line no-unused-vars
import exporting from "highcharts/modules/exporting";
import { numberFormatter } from "../../utils/NumberFormatter";
import { PIE_CONFIG } from "../../constants/CHART_CONFIGS";

export function CustomPieChart({
  setup = PIE_CONFIG,
  legend = true,
  rawData = null,
  customMapper = () => {},
}) {
  const [chartSetup, setChartSetup] = useState(setup);
  const [data, setData] = useState(rawData || null);

  useEffect(() => {
    //if (!setup) return;
    let stagedSetup = setup;
    if (data) {
      const processedData = customMapper(data);
      setData(data);
      stagedSetup = {
        ...chartSetup,
        title: {
          ...PIE_CONFIG.title,
          text: numberFormatter(processedData.total.data),
          number: processedData.total.data,
        },
        subtitle: {
          ...PIE_CONFIG.subtitle,
          text: processedData.total.subtitle,
        },
        series: [
          {
            ...PIE_CONFIG.series[0],
            data: processedData.series,
          },
        ],
      };
    }
    setChartSetup(stagedSetup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setup, data]);
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
