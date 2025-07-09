import { useCallback, useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2024 } from "../../../../../data/BASE_API_URL";
import { mapChartData, mapTableData } from "../../../utils/generalTabUtils";
import { mappers } from "../../../utils/mapSpecs";

export function useTabRegion() {
  const customFetch = useCustomFetch();
  const [reload, setReload] = useState(0);
  const refresh = useCallback(() => {
    setReload((prev) => prev + 1);
  }, []);
  const [chartData, setChartData] = useState({
    docentes: null,
    establecimientos: null,
  });
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2024 + "/2024-grabaciones-region",
      shouldCache: true,
    }).then((data) => {
      const docentes = mapChartData(data.docentesPorRegion, mappers.docentes_region);
      const establecimientos = mapChartData(data.docentesPorRegion, mappers.establecimientos_region);
      const dataTabla = mapTableData(data.docentesPorRegion, mappers.tabla_region);
      
      setTableData(dataTabla)
      setChartData({
        docentes,
        establecimientos,
      });
    });
  }, [customFetch, reload]);

  return { chartData, tableData, refresh };
}
