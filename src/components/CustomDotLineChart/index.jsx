import "./style.css";
import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// eslint-disable-next-line no-unused-vars
import exporting from "highcharts/modules/exporting";
import { DOT_CONFIG } from "../../constants/CHART_CONFIGS";

export function CustomDotLineChart({
  setup = DOT_CONFIG,
}) {
  const [chartSetup, setChartSetup] = useState(setup);
    const [data, setData] = useState( null);
  
    useEffect(() => {
      //if (!setup) return;
      setChartSetup(setup);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setup]);
    return (
      <div className="dot-line-container">
        <HighchartsReact options={chartSetup} highcharts={Highcharts} />
      </div>
    );
}
