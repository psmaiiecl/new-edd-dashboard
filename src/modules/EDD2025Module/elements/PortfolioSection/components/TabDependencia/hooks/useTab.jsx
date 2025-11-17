import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { buildAvance } from "../../../utils/utils";

export function useTab() {
  const customFetch = useCustomFetch();
  const [data, setData] = useState(null);
useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-portafolio-tab-dependencia",
      shouldCache: true,
    }).then((data) => {
      setData({
        estado_portafolio: buildAvance(data?.['portafolio-avance-dependencia'], 'Dependencia'),
        estado_m1: buildAvance(data?.['portafolio-avance-dependencia-m1'], 'Dependencia'),
        estado_m2: buildAvance(data?.['portafolio-avance-dependencia-m2'], 'Dependencia'),
        estado_m3: buildAvance(data?.['portafolio-avance-dependencia-m3'], 'Dependencia'),
      });
    });
  }, [customFetch]);
  return { data };
}
