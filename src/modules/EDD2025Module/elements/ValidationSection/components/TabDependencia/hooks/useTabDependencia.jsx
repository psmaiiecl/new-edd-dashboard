import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mapBarChartData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";

export function useTabDependencia() {
  const customFetch = useCustomFetch();
  const [docentesDependencia, setDocentesDependencia] = useState();
  const [agrupacionDependencia, setAgrupacionDependencia] = useState();
  const [suspensionDependencia, setSuspensionDependencia] = useState();
  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-validacion?endpoint=vista-dependencia",
      shouldCache: true,
    }).then((data) =>
      setDocentesDependencia(
        mapBarChartData({
          data: data.docentes,
          schema: mappers.estado_validacion.series,
        })
      )
    );
    customFetch({
      route:
        BASE_API_URL_2025 +
        "/2025-validacion?endpoint=cambio-nivel-vista-dependencia",
      shouldCache: true,
    }).then((data) => {
      setAgrupacionDependencia(
        mapBarChartData({
          data: data.docentes,
          schema: mappers.estado_solicitudes.series,
        })
      );
    });
    customFetch({
      route:
        BASE_API_URL_2025 +
        "/2025-validacion?endpoint=solicita-suspender-vista-dependencia",
      shouldCache: true,
    }).then((data) => {
      setSuspensionDependencia(
        mapBarChartData({
          data: data.docentes,
          schema: mappers.estado_solicitudes.series,
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    docentesDependencia,
    agrupacionDependencia,
    suspensionDependencia,
  };
}
