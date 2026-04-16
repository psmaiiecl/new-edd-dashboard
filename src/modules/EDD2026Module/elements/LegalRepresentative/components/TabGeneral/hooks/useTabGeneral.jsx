import { useEffect, useState } from "react";
import { DEPENDENCY_LIST } from "../../../data/DependencyList";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";
import { BASE_API_URL_2026 } from "../../../../../../../constants/BASE_API_URL.JS";

export function useTabGeneral() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState(DEPENDENCY_LIST[0]);
  const [entidadesSostenedoras, setEntidadesSostenedores] = useState(null);
  const [sostenedoresParticipantes, setSostenedoresParticipantes] =
    useState(null);

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

      setEntidadesSostenedores(
        mapPieData(data.totales, mappers.entidades_sostenedoras),
      );
      setSostenedoresParticipantes(
        mapPieData(data.participacion, mappers.sostenedores_participantes),
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  return {
    selectedFilter,
    setSelectedFilter,
    entidadesSostenedoras,
    sostenedoresParticipantes,
  };
}

//ANTES: 320 Lineas
