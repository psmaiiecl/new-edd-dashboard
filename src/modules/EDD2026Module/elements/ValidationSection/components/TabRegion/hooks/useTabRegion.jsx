import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { mapBarChartData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";
import { BASE_API_URL_2026 } from "../../../../../../../constants/BASE_API_URL";

export function useTabRegion() {
  const customFetch = useCustomFetch();
  const [charts, setCharts] = useState({
    docentes: null,
    solicitudes_cambio_nivel: null,
    solicitudes_suspension: null,
  });

  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2026 + "/validacion/tab-region/data",
      shouldCache: true,
      method: "GET",
    }).then((response) => {
      setCharts((prev) => ({
        ...prev,
        docentes: mapBarChartData({
          data: response.data.validacion,
          schema: mappers.estado_validacion.series,
        }),
        solicitudes_suspension: mapBarChartData({
          data: response.data.solicitudes_suspension,
          schema: mappers.estado_solicitudes.series,
        }),
        solicitudes_cambio_nivel: mapBarChartData({
          data: response.data.solicitudes_cambio_nivel,
          schema: mappers.estado_solicitudes.series,
        }),
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    charts,
  };
}
