import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2026 } from "../../../../../../../constants/BASE_API_URL";
import { buildAvance } from "../../../utils/utils";

export function useTabRegion() {
  const customFetch = useCustomFetch();
  const [data, setData] = useState(null);
  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2026 + "/portafolio/tab-region/data",
      shouldCache: true,
      method: "GET",
    }).then((response) => {
      const { data } = response;
      setData({
        estado_portafolio: buildAvance(data?.avance_region, "Región"),
        estado_m1: buildAvance(data?.avance_region_m1, "Región"),
        estado_m2: buildAvance(data?.avance_region_m2, "Región"),
        estado_m3: buildAvance(data?.avance_region_m3, "Región"),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { data };
}
