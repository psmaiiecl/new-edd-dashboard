import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2026 } from "../../../../../../../constants/BASE_API_URL";
import { buildAvance } from "../../../utils/utils";

export function useTabConvocatoria() {
  const customFetch = useCustomFetch();
  const [data, setData] = useState(null);
  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2026 + "/portafolio/tab-convocatoria/data",
      shouldCache: true,
      method: "GET",
    }).then((response) => {
      const { data } = response;
      setData({
        estado_portafolio: buildAvance(data?.avance_convocatoria, "Convocatoria"),
        estado_m1: buildAvance(data?.avance_convocatoria_m1, "Convocatoria"),
        estado_m2: buildAvance(data?.avance_convocatoria_m2, "Convocatoria"),
        estado_m3: buildAvance(data?.avance_convocatoria_m3, "Convocatoria"),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { data };
}
