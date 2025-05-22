import "./index.css";
import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// eslint-disable-next-line no-unused-vars
import exporting from "highcharts/modules/exporting";
import { numberFormatter } from "../../utils/NumberFormatter";
import { PIE_CONFIG } from "../../constants/CHART_CONFIGS";

export function CustomPieChart({
  setup,
  legend = true,
  rawData = null,
  customMapper = null,
}) {
  const [chartSetup, setChartSetup] = useState(setup || PIE_CONFIG);
  useEffect(() => {
    if (!setup) return;
    let stagedSetup = setup;
    if (customMapper && rawData) {
      stagedSetup = customMapper(setup, rawData);
    }
    setChartSetup(stagedSetup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setup, rawData]);
  return (
    <div className="pie-chart-container">
      <HighchartsReact options={chartSetup} highcharts={Highcharts} />
      <hr />
      {legend && (
        <BasicLegend
          data={chartSetup.series}
          total={+chartSetup.title.number}
        />
      )}
    </div>
  );
}

function BasicLegend({ data, total }) {
  return (
    <div className="pie-chart-legend">
      {data[0].data.map((item, index) => (
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
