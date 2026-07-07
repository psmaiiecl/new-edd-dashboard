import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2026 } from "../../../../../../../constants/BASE_API_URL";
import { buildAvance } from "../../../utils/utils";

export function useTabAgrupacion() {
  const customFetch = useCustomFetch();
  const [data, setData] = useState(null);
  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2026 + "/portafolio/tab-agrupacion/data",
      shouldCache: true,
      method: "GET",
    }).then((response) => {
      const { data } = response;
      setData({
        estado_portafolio: buildAvance(data?.avance_agrupacion, "Agrupación"),
        estado_m1: buildAvance(data?.avance_agrupacion_m1, "Agrupación"),
        estado_m2: buildAvance(data?.avance_agrupacion_m2, "Agrupación"),
        estado_m3: buildAvance(data?.avance_agrupacion_m3, "Agrupación"),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { data };
}
