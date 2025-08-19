import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { buildPostulacionChart } from "../../../utils/utils";

function useTabPostulacion() {
  const customFetch = useCustomFetch();
  const [data, setData] = useState(null);
  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-postulacion",
      method: "GET",
      shouldCache: true,
    }).then((res) => {
      const mapped = buildPostulacionChart(
        res?.postulacion.avance_diario_postulaciones
      );

      setData(mapped);
    });
  }, [customFetch]);

  return { data };
}

export default useTabPostulacion;
