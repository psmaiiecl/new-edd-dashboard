import { useEffect, useState } from "react";
import { BAR_CONFIG } from "../../constants/CHART_CONFIGS";
import "./style.css";

export function CustomBarChart({
  setup = BAR_CONFIG,
  processedData ,
  table = true,
}) {
  const [tableData, setTableData] = useState({});
  const [chartSetup, setChartSetup] = useState(setup);
  useEffect(() => {
    console.log("Bar", processedData);
    
  }, [processedData]);

  return <div className="bar-container"></div>;
}
