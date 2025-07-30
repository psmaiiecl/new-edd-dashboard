import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";

export function useTabRegion() {
  const customFetch = useCustomFetch();

  const [chartData, setChartData] = useState({
    docentes: null,
    establecimientos: null,
  });
  const [tableData, setTableData] = useState(null);

  useEffect(() => {}, []);

  return { chartData, tableData };
}
