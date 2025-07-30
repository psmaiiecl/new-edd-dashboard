import { useCallback, useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mapChartData, mapTableData } from "../../../utils/generalTabUtils";
import { mappers } from "../../../utils/mapSpecs";

export function useTabConvocatoria() {
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
      route:
        BASE_API_URL_2025 + "/2025-agendamiento-grabaciones-tab-convocatoria",
      shouldCache: true,
    }).then((data) => {
      const docentes = mapChartData(
        data.agendamiento_convocatoria_docentes,
        mappers.docentes_convocatoria
      );
      const establecimientos = mapChartData(
        data.agendamiento_convocatoria_establecimientos,
        mappers.establecimientos_convocatoria
      );
      const dataTabla = mapTableData(
        {
          ...data.agendamiento_convocatoria_docentes,
          ...data.agendamiento_convocatoria_establecimientos,
        },
        mappers.tabla_convocatoria
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
