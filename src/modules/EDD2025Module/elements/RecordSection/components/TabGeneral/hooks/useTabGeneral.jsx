import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import mappers from "../../../utils/mapSpecs";
import { buildAvanceDiarioGrabaciones } from "../../../utils/utils";

function useTabGeneral() {
  const customFetch = useCustomFetch();
  const [docentesRinde, setDocentesRinde] = useState(null);
  const [docentesGrabados, setDocentesGrabados] = useState(null);
  const [establecimientosAGrabar, setEstablecimientosAGrabar] = useState(null);
  const [sostenedoresParticipantes, setSostenedoresParticipantes] =
    useState(null);
  const [avanceDiario, setAvanceDiario] = useState(null);
  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-grabaciones-tab-general",
      shouldCache: true,
    }).then((data) => {
      setDocentesRinde(
        mapPieData(data.docentes_estado_rinde, mappers.docentes_rinde)
      );
      setDocentesGrabados(
        mapPieData(
          data.total_docentes_grabados,
          mappers.total_docentes_grabados
        )
      );
      setEstablecimientosAGrabar(
        mapPieData(
          mapEstablecimientsAGrabarResponse(data.establecimientos_grabar),
          mappers.establecimientos_a_grabar
        )
      );
      setSostenedoresParticipantes(
        mapPieData(
          data.sostenedores_participantes,
          mappers.sostenedores_participantes
        )
      );
      setAvanceDiario(buildAvanceDiarioGrabaciones(data.avance_diario_grabaciones));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    docentesRinde,
    docentesGrabados,
    establecimientosAGrabar,
    sostenedoresParticipantes,
    avanceDiario
  };
}

function mapEstablecimientsAGrabarResponse(data) {
  return {
    at_grabaciones_terminadas: data.grabaciones_terminadas[2] ?? 0,
    at_grabaciones_iniciadas: data.grabaciones_iniciadas[2] ?? 0,
    at_sin_grabaciones: data.sin_grabaciones[2] ?? 0,
    ai_grabaciones_iniciadas: data.grabaciones_iniciadas[1] ?? 0,
    ai_sin_grabaciones: data.sin_grabaciones[1] ?? 0,
    sa_sin_grabaciones: data.sin_grabaciones[0] ?? 0,
  };
}

export default useTabGeneral;
