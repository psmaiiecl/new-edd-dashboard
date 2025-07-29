import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mapChartData, mapTableData } from "../../../utils/utils";
import mappers from "../../../utils/mapSpecs";

export function useTabConvocatoria() {
  const customFetch = useCustomFetch();
  const [chartData, setChartData] = useState({
    docentes: null,
    establecimientos: null,
  });
  const [tableData, setTableData] = useState(null);
  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-grabaciones-tab-convocatoria",
      shouldCache: true,
    }).then((data) => {
      const docentes = mapChartData(
        data.grabaciones_convocatoria_docentes,
        mappers.docentes_convocatoria
      );
      const establecimientos = mapChartData(
        data.grabaciones_convocatoria_establecimientos,
        mappers.establecimientos_convocatoria
      );

      const dataTabla = mapTableData(
        {
          ...data.grabaciones_convocatoria_docentes,
          ...data.grabaciones_convocatoria_establecimientos,
        },
        mappers.tabla_convocatoria
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
