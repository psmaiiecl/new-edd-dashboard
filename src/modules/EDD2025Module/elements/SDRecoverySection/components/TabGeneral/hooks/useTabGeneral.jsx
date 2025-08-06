import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import mappers from "../../../utils/mapSpecs";
import { buildGrabacionesRecibidasDiarias } from "../../../utils/utils";

function useTabGeneral() {
  const customFetch = useCustomFetch();
  const [recuperacionGrabaciones, setRecuperacionGrabaciones] = useState(null);
  const [recuperacionSD, setRecuperacionSD] = useState(null);
  const [grabacionesRecibidas, setGrabacionesRecibidas] = useState(null);
  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-recuperacion-tab-general",
      shouldCache: true,
    }).then((data) => {
      setRecuperacionGrabaciones(
        mapPieData(data.recuperacion_grabaciones, mappers.recuperacion_grabaciones)
      );
      setRecuperacionSD(
        mapPieData(data.recuperacion_sd, mappers.recuperacion_sd)
      );
      setGrabacionesRecibidas(
        buildGrabacionesRecibidasDiarias(data.recuperacion_sd_avance_diario)
      );
    });
  }, [customFetch]);
  return {
    recuperacionGrabaciones,
    recuperacionSD,
    grabacionesRecibidas
  };
}

export default useTabGeneral;
