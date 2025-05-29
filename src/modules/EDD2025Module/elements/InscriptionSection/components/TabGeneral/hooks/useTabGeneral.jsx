import { useEffect, useState } from "react";
import { DEPENDENCY_LIST } from "../../../data/DependencyList";
import {
  buildAvanceDiario,
  buildDocentesInscritos,
} from "../../../utils/generalTabUtils";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";

export function useTabGeneral() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState(DEPENDENCY_LIST[0]);
  const [docentesSugeridos, setDocentesSugeridos] = useState(null);
  const [docentesAgregados, setDocentesAgregados] = useState(null);
  const [docentesInscritos, setDocentesInscritos] = useState(null);
  const [entidadesSostenedoras, setEntidadesSostenedores] = useState(null);
  const [sostenedoresParticipantes, setSostenedoresParticipantes] =
    useState(null);
  const [avanceDiario, setAvanceDiario] = useState(null);

  useEffect(() => {
    customFetch({
      route:
        BASE_API_URL_2025 +
        "/2025-datos-inscripcion?dependencia=" +
        selectedFilter.value,
      shouldCache: true,
    }).then((data) => {
      setDocentesSugeridos(
        mapPieData(
          data.inscripcion_general.docentes,
          mappers.docentes_sugeridos
        )
      );
      setDocentesAgregados(
        mapPieData(
          data.inscripcion_general.docentes,
          mappers.docentes_agregados
        )
      );
      setDocentesInscritos(buildDocentesInscritos(data.inscripcion_general));
      setEntidadesSostenedores(
        mapPieData(
          data.inscripcion_general.total,
          mappers.entidades_sostenedoras
        )
      );
      setSostenedoresParticipantes(
        mapPieData(
          data.inscripcion_general.sostenedores,
          mappers.sostenedores_participantes
        )
      );
      setAvanceDiario(buildAvanceDiario(data.avance_diario));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  return {
    selectedFilter,
    setSelectedFilter,
    docentesSugeridos,
    docentesAgregados,
    docentesInscritos,
    entidadesSostenedoras,
    sostenedoresParticipantes,
    avanceDiario,
  };
}

//ANTES: 320 Lineas
