import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mapChartData, mapTableData } from "../../../utils/utils";
import mappers from "../../../utils/mapSpecs";

export function useTabCTG() {
  const customFetch = useCustomFetch();
  const [chartData, setChartData] = useState({
    docentes: null,
    establecimientos: null,
  });
  const [tableData, setTableData] = useState(null);
  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-grabaciones-tab-ctg",
      shouldCache: true,
    }).then((data) => {
      const docentes = mapChartData(
        data.grabaciones_ctg_docentes,
        mappers.docentes_ctg
      );
      const establecimientos = mapChartData(
        data.grabaciones_ctg_establecimientos,
        mappers.establecimientos_ctg
      );

      const dataTabla = mapTableData(
        {
          ...data.grabaciones_ctg_docentes,
          ...data.grabaciones_ctg_establecimientos,
        },
        mappers.tabla_ctg
      );
      setTableData(dataTabla);
      setChartData({
        docentes,
        establecimientos,
      });
    });
  }, [customFetch]);
  return { chartData, tableData };
}
