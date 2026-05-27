import { useEffect, useState } from "react";
import { DEPENDENCY_LIST } from "../../../data/DependencyList";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";
import { BASE_API_URL_2026 } from "../../../../../../../constants/BASE_API_URL";

export function useTabGeneral() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState(DEPENDENCY_LIST[0]);

  const [charts, setCharts] = useState({
    entidades_sostenedoras: null,
    representantes_participantes: null,
    validacion_representantes: null,
    encargados_sostenedor: null,
    directores_inscritos: null,
  });

  useEffect(() => {
    customFetch({
      route:
        BASE_API_URL_2026 +
        "/representantes-legales/tab-general/data?dependencia=" +
        selectedFilter.value,
      shouldCache: true,
      method: "GET",
    }).then((res) => {
      const { data } = res;
      setCharts((prev) => ({
        ...prev,
        entidades_sostenedoras: mapPieData(
          data.totales,
          mappers.entidades_sostenedoras,
        ),
        representantes_participantes: mapPieData(
          data.participacion,
          mappers.representantes_legales,
        ),
        validacion_representantes: mapPieData(
          data.validacion,
          mappers.validacion_representantes,
        ),
        encargados_sostenedor: mapPieData(
          data.encargados,
          mappers.sostenedor_encargados,
        ),
        directores_inscritos:  mapPieData(
          data.directores,
          mappers.directores_inscritos,
        ),
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  return {
    selectedFilter,
    setSelectedFilter,
    charts
  };
}

//ANTES: 320 Lineas
