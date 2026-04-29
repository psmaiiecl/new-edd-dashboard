import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mapBarChartData } from "../../../utils/dependenciaTabUtils";
import { mappers } from "../../../utils/mapSpecs";

export function useTabRegion() {
  const customFetch = useCustomFetch();
  const [docentesRegion, setDocentesRegion] = useState(null);
  const [sostenedoresRegion, setSostenedoresRegion] = useState(null);

  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-inscripcion-region",
      shouldCache: true,
    }).then((data) => {
      setDocentesRegion(
        mapBarChartData({
          data: data.docentes,
          schema: mappers.docentes_dependencia.series,
        })
      );
      setSostenedoresRegion(
        mapBarChartData({
          data: data.sostenedores,
          schema: mappers.sostenedores_dependencia.series,
          invert: true,
        })
      );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    docentesRegion,
    sostenedoresRegion,
  };
}
