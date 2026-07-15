import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2026 } from "../../../../../../../constants/BASE_API_URL";
import { mapChartData, mapTableData } from "../../../utils/generalTabUtils";
import { mappers } from "../../../utils/mapSpecs";

export function useTabConvocatoria() {
  const customFetch = useCustomFetch();
  const [chartData, setChartData] = useState({
    docentes: null,
    establecimientos: null,
  });
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2026 + "/agendamiento/tab-convocatoria/data",
      shouldCache: true,
      method: "GET",
    }).then((response) => {
      const { data } = response;
      const docentes = mapChartData(
        data?.agendamiento_convocatoria_docentes,
        mappers.docentes_convocatoria
      );
      const establecimientos = mapChartData(
        data?.agendamiento_convocatoria_establecimientos,
        mappers.establecimientos_convocatoria
      );
      const dataTabla = mapTableData(
        {
          ...data?.agendamiento_convocatoria_docentes,
          ...data?.agendamiento_convocatoria_establecimientos,
        },
        mappers.tabla_convocatoria
      );

      setTableData(dataTabla);
      setChartData({
        docentes,
        establecimientos,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { chartData, tableData };
}
