import { useCallback, useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
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
      route: BASE_API_URL_2025 + "/2025-agendamiento-grabaciones-tab-region",
      shouldCache: true,
    }).then((data) => {
      const docentes = mapChartData(
        data.agendamiento_region_docentes,
        mappers.docentes_region
      );
      const establecimientos = mapChartData(
        data.agendamiento_region_establecimientos,
        mappers.establecimientos_region
      );
      const dataTabla = mapTableData(
        {
          ...data.agendamiento_region_docentes,
          ...data.agendamiento_region_establecimientos,
        },
        mappers.tabla_region
      );

      setTableData(dataTabla);
      setChartData({
        docentes,
        establecimientos,
      });
    });
  }, [customFetch, reload]);

  return { chartData, tableData, refresh };
}
