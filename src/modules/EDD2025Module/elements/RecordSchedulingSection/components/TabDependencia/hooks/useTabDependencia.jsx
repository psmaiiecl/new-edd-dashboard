import { useCallback, useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mapChartData, mapTableData } from "../../../utils/generalTabUtils";
import { mappers } from "../../../utils/mapSpecs";

export function useTabDependencia() {
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
      route: BASE_API_URL_2025 + "/2025-agendamiento-grabaciones-tab-dependencia",
      shouldCache: true,
    }).then((data) => {
      const docentes = mapChartData(
        data.agendamiento_dependencia_docentes,
        mappers.docentes_dependencia
      );
      const establecimientos = mapChartData(
        data.agendamiento_dependencia_establecimientos,
        mappers.establecimientos_dependencia
      );
      const dataTabla = mapTableData(
        {
          ...data.agendamiento_dependencia_docentes,
          ...data.agendamiento_dependencia_establecimientos
        },
        mappers.tabla_dependencia
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
