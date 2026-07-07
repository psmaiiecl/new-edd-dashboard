import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2026 } from "../../../../../../../constants/BASE_API_URL";
import { buildAvance } from "../../../utils/utils";

export function useTabDependencia() {
  const customFetch = useCustomFetch();
  const [data, setData] = useState(null);
  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2026 + "/portafolio/tab-dependencia/data",
      shouldCache: true,
      method: "GET",
    }).then((response) => {
      const { data } = response;
      setData({
        estado_portafolio: buildAvance(data?.avance_dependencia, "Dependencia"),
        estado_m1: buildAvance(data?.avance_dependencia_m1, "Dependencia"),
        estado_m2: buildAvance(data?.avance_dependencia_m2, "Dependencia"),
        estado_m3: buildAvance(data?.avance_dependencia_m3, "Dependencia"),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { data };
}
