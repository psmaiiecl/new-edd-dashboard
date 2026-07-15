import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2026 } from "../../../../../../../constants/BASE_API_URL";
import { mapChartData, mapTableData } from "../../../utils/generalTabUtils";
import { mappers } from "../../../utils/mapSpecs";

export function useTabCTG() {
  const customFetch = useCustomFetch();
  const [chartData, setChartData] = useState({
    docentes: null,
    establecimientos: null,
  });
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2026 + "/agendamiento/tab-ctg/data",
      shouldCache: true,
      method: "GET",
    }).then((response) => {
      const { data } = response;
      const docentes = mapChartData(
        data?.agendamiento_ctg_docentes,
        mappers.docentes_ctg
      );
      const establecimientos = mapChartData(
        data?.agendamiento_ctg_establecimientos,
        mappers.establecimientos_ctg
      );
      const dataTabla = mapTableData(
        {
          ...data?.agendamiento_ctg_docentes,
          ...data?.agendamiento_ctg_establecimientos,
        },
        mappers.tabla_ctg
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
