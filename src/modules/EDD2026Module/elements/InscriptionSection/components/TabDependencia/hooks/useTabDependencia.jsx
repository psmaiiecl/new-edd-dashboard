import { useEffect, useState } from "react";
import { mapBarChartData } from "../../../utils/dependenciaTabUtils";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { mappers } from "../../../utils/mapSpecs";
import { BASE_API_URL_2026 } from "../../../../../../../constants/BASE_API_URL";

export function useTabDependencia() {
  const customFetch = useCustomFetch();
  const [charts, setCharts] = useState({
    docentes: null,
  });

  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2026 + "/inscripcion/tab-dependencia/data",
      shouldCache: true,
      method: "GET",
    }).then((res) => {
      const {data} = res      
      setCharts((prev) => ({
        ...prev,

        docentes: mapBarChartData({
          data: data.distribucion,
          schema: mappers.docentes_dependencia.series,
        }),
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    charts,
  };
}

//130 LINEAS
