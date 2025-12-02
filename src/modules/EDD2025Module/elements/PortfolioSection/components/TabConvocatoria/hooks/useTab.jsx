import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { buildAvance } from "../../../utils/utils";

export function useTab() {
  const customFetch = useCustomFetch();
  const [data, setData] = useState(null);
  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-portafolio-tab-convocatoria",
      shouldCache: true,
    }).then((data) => {
      setData({
        estado_portafolio: buildAvance(
          data?.["portafolio-avance-convocatoria"],
          "Convocatoria"
        ),
        estado_m1: buildAvance(
          data?.["portafolio-avance-convocatoria-m1"],
          "Convocatoria"
        ),
        estado_m2: buildAvance(
          data?.["portafolio-avance-convocatoria-m2"],
          "Convocatoria"
        ),
        estado_m3: buildAvance(
          data?.["portafolio-avance-convocatoria-m3"],
          "Convocatoria"
        ),
      });
    });
  }, [customFetch]);
  return { data };
}
