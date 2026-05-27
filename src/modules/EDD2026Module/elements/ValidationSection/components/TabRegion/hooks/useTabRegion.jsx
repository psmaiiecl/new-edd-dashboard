import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mapBarChartData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";

export function useTabRegion() {
  const customFetch = useCustomFetch();
  const [docentesRegion, setDocentesRegion] = useState();
  const [agrupacionRegion, setAgrupacionRegion] = useState();
  const [suspensionRegion, setSuspensionRegion] = useState();
  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-validacion?endpoint=vista-region",
      shouldCache: true,
    }).then((data) => {
      setDocentesRegion(
        mapBarChartData({
          data: data.docentes,
          schema: mappers.estado_validacion.series,
        })
      );
    });
    customFetch({
      route:
        BASE_API_URL_2025 +
        "/2025-validacion?endpoint=cambio-nivel-vista-region",
      shouldCache: true,
    }).then((data) => {
      setAgrupacionRegion(
        mapBarChartData({
          data: data,
          schema: mappers.estado_solicitudes.series,
        })
      );
    });
    customFetch({
      route:
        BASE_API_URL_2025 +
        "/2025-validacion?endpoint=solicita-suspender-vista-region",
      shouldCache: true,
    }).then((data) => {
      setSuspensionRegion(
        mapBarChartData({
          data: data,
          schema: mappers.estado_solicitudes.series,
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    docentesRegion,
    agrupacionRegion,
    suspensionRegion,
  };
}
