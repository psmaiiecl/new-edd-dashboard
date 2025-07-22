import { useEffect, useState } from "react";
import "./style.css";
import Highcharts from "highcharts";
import GroupedCategories from "highcharts-grouped-categories";
GroupedCategories(Highcharts);

import HighchartsReact from "highcharts-react-official";
import { initColumnChartConfig } from "../../utils/ChartConfigBuilder";

export function CustomColumnChart({
  title,
  type = null,
  data,
  overrideConfig,
}) {
  const [chartSetup, setChartSetup] = useState(
    initColumnChartConfig(title, type, overrideConfig)
  );

  useEffect(() => {
    if (!data) return;
    setChartSetup((prev) => ({
        ...prev,
        series: [...data.series],
        ...data?.override,
      }
    ));
  }, [data]);
  return (
    <div className="column-chart-container">
      <HighchartsReact options={chartSetup} highcharts={Highcharts} />
    </div>
  );
}
