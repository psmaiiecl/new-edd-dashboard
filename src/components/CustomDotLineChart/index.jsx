import "./style.css";
import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// eslint-disable-next-line no-unused-vars
import exporting from "highcharts/modules/exporting";
import { initDotChartConfig } from "../../utils/ChartConfigBuilder";

export function CustomDotLineChart({ title, data, overrideConfig }) {
  const [chartSetup, setChartSetup] = useState(
    initDotChartConfig(title, overrideConfig)
  );

  useEffect(() => {
    if (!data) return;
    setChartSetup((prev) => ({
      ...prev,
      series: data.series,
      ...data?.override,
    }));
  }, [data]);
  return (
    <div className="dot-line-container">
      <HighchartsReact options={chartSetup} highcharts={Highcharts} />
    </div>
  );
}
