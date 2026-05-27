import { useCallback, useEffect, useState } from "react";
import {
  CAMBIO_LIST,
  CONVOCATORIA_LIST,
  ESTADO_LIST,
  SUSPENSION_LIST,
} from "../../../data/FilterList";
import {
  buildAvanceDiario,
  buildEvolucion,
} from "../../../utils/generalTabUtils";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";
import { BASE_API_URL_2026 } from "../../../../../../../constants/BASE_API_URL";

export function useTabGeneral() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState({
    convocatoria: CONVOCATORIA_LIST[0],
    estado: ESTADO_LIST[0],
    nivel: CAMBIO_LIST[0],
    suspension: SUSPENSION_LIST[0],
  });

  const [charts, setCharts] = useState({
    docentes: null,
    solicitudes_cambio_nivel: null,
    solicitudes_suspension: null,
    estado_participacion: null,
    causales: null,
    avance_diario_validacion: null,
    avance_diario_sol_cambio_nivel: null,
    avance_diario_sol_susp_exim: null,
  });

  const handleFilter = (key, option) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [key]: option,
    }));
  };

  const concatFilters = useCallback(() => {
    const [path, queryString] =
      (BASE_API_URL_2026 + "/validacion/tab-general/data").split("?");

    const params = new URLSearchParams(queryString ?? "");

    Object.entries(selectedFilter).forEach(([key, value]) => {
      if (value?.value && value?.value?.trim() !== "") {
        params.set(key, value.value);
      } else {
        params.delete(key);
      }
    });
    if(params.toString() === "") return path;

    return `${path}?${params.toString()}`;
  }, [selectedFilter]);

  useEffect(() => {
    customFetch({
      route: concatFilters(),
      shouldCache: true,
      method: "GET",
    }).then((response) => {
      const dataDocentes = mapPieData(response?.data?.validacion, mappers.docentes);
      const dataSolicitudesNivel = mapPieData(response?.data?.solicitudes_suspension, mappers.solicitudes);
      const dataSolicitudesSuspension = mapPieData(response?.data?.solicitudes_cambio_nivel, mappers.solicitudes);
      const dataEstadoParticipacion = mapPieData(response?.data?.participacion, mappers.estado_participacion);
      const dataCausales = mapPieData(response?.data?.causales, mappers.causales);
      
      const dataAvanceDiario = buildAvanceDiario(response?.data?.avance_diario);
      const dataAvanceDiarioSolCambioNivel = buildEvolucion(response?.data?.avance_diario_sol_cambio_nivel);
      const dataAvanceDiarioSolSuspensionEximicion = buildEvolucion(response?.data?.avance_diario_sol_susp_exim);

      setCharts((prev) => ({
        ...prev,
        docentes: dataDocentes,
        solicitudes_suspension: dataSolicitudesNivel,
        solicitudes_cambio_nivel: dataSolicitudesSuspension,
        estado_participacion: dataEstadoParticipacion,
        causales: dataCausales,
        avance_diario_validacion: dataAvanceDiario,
        avance_diario_sol_cambio_nivel: dataAvanceDiarioSolCambioNivel,
        avance_diario_sol_susp_exim: dataAvanceDiarioSolSuspensionEximicion,
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  return {
    selectedFilter,
    handleFilter,
    charts,
  };
}
