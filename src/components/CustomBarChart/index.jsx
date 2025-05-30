import "./style.css";
import { useEffect, useState } from "react";
import { initBarChartConfig } from "../../utils/ChartConfigBuilder";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// eslint-disable-next-line no-unused-vars
import exporting from "highcharts/modules/exporting";

/**
 * La data que debe llegar a este componente para poder renderizarse debe tener la siguiente estructura:
 * data{
 *  series: {},
 *  total: {
 *     numeric: total,
 *     text: numberFormatter(total),
 *  },
 *  table:{},
 *  override: {}
 *}
 */
export function CustomBarChart({
  subtitle,
  height,
  data,
  table = true,
  overrideConfig,
}) {
  const [chartSetup, setChartSetup] = useState(
    initBarChartConfig(subtitle, height, overrideConfig)
  );
  const [tableData, setTableData] = useState(null);
  useEffect(() => {
    console.log("Bar", data);
  }, [data]);

  return (
    <div className={`bar-chart-container ${table ? "" : "single-column"}`}>
      <HighchartsReact options={chartSetup} highcharts={Highcharts} />
      <div className="bar-chart-table-container">

      </div>
    </div>
  );
}
