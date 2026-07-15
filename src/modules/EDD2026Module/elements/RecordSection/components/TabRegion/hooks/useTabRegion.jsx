import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2026 } from "../../../../../../../constants/BASE_API_URL";
import { mapChartData, mapTableData } from "../../../utils/utils";
import { mappers } from "../../../utils/mapSpecs";

export function useTabRegion() {
  const customFetch = useCustomFetch();
  const [chartData, setChartData] = useState({
    docentes: null,
    establecimientos: null,
  });
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2026 + "/grabaciones/tab-region/data",
      shouldCache: true,
      method: "GET",
    }).then((response) => {
      const { data } = response;
      const docentes = mapChartData(
        data?.grabaciones_region_docentes,
        mappers.docentes_region
      );
      const establecimientos = mapChartData(
        data?.grabaciones_region_establecimientos,
        mappers.establecimientos_region
      );

      const dataTabla = mapTableData(
        {
          ...data?.grabaciones_region_docentes,
          ...data?.grabaciones_region_establecimientos,
        },
        mappers.tabla_region
      );
      setTableData(dataTabla);
      setChartData({ docentes, establecimientos });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { chartData, tableData };
}
