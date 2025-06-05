import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mapBarChartData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";

export function useTabConvocatoria() {
  const customFetch = useCustomFetch();
  const [docentesConvocatoria, setDocentesConvocatoria] = useState();
  const [agrupacionConvocatoria, setAgrupacionConvocatoria] = useState();
  const [suspensionConvocatoria, setSuspensionConvocatoria] = useState();

  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-validacion?endpoint=vista-convocatoria",
      shouldCache: true,
    }).then((data) => {
      setDocentesConvocatoria(
        mapBarChartData({
          data: data.docentes,
          schema: mappers.estado_validacion.series,
        })
      );
    });
    customFetch({
      route:
        BASE_API_URL_2025 +
        "/2025-validacion?endpoint=cambio-nivel-vista-convocatoria",
      shouldCache: true,
    }).then((data) => {
      setAgrupacionConvocatoria(
        mapBarChartData({
          data: data.docentes,
          schema: mappers.estado_solicitudes.series,
        })
      );
    });
    customFetch({
      route:
        BASE_API_URL_2025 +
        "/2025-validacion?endpoint=solicita-suspender-vista-convocatoria",
      shouldCache: true,
    }).then((data) => {
      setSuspensionConvocatoria(
        mapBarChartData({
          data: data.docentes,
          schema: mappers.estado_solicitudes.series,
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    docentesConvocatoria,
    agrupacionConvocatoria,
    suspensionConvocatoria,
  };
}
