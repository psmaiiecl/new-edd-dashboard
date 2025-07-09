import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2024 } from "../../../../../data/BASE_API_URL";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";
import {
  buildAgendamientoApilado,
  buildAgendamientoGeneral,
} from "../../../utils/generalTabUtils";

export function useTabGeneral() {
  const customFetch = useCustomFetch();
  const [docentesAgendados, setDocentesAgendados] = useState(null);
  const [establecimientosAgendados, setEstablecimientosAgendados] =
    useState(null);
  const [agendamientoApilado, setAgendamientoApilado] = useState(null);
  const [agendamientoSemanal, setAgendamientoSemanal] = useState(null);
  const [agendamientoGlobal, setAgendamientoGlobal] = useState(null);

  useEffect(() => {
    setDocentesAgendados(
      mapPieData(
        {
          docentes_agendados: 100,
          docentes_contacto_inicial_exitoso: 100,
          docentes_contacto_inicial_fallido: 100,
          docentes_sin_contactar: 100,
        },
        mappers.docentes_agendados
      )
    );
    setEstablecimientosAgendados(
      mapPieData(
        {
          ee_agendamiento_completo: 100,
          ee_agendamiento_iniciado: 100,
          ee_contacto_inicial_exitoso: 100,
          ee_contacto_inicial_fallido: 100,
          ee_sin_contactar: 100,
        },
        mappers.establecimientos_agendados
      )
    );
    customFetch({
      route:
        BASE_API_URL_2024 +
        "/datos-json?etiqueta=2024-grabaciones-agendamiento-semanal-apilado",
    }).then((data) =>
      setAgendamientoApilado(
        buildAgendamientoApilado(data.agendamiento_semanal)
      )
    );
    customFetch({
      route:
        BASE_API_URL_2024 +
        "/datos-json?etiqueta=2024-grabaciones-agendamiento-semanal",
    }).then((data) => {
      setAgendamientoSemanal(
        buildAgendamientoGeneral(data.agendamiento_semanal)
      );
      setAgendamientoGlobal(
        buildAgendamientoGeneral(data.agendamiento_acumulado)
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    docentesAgendados,
    establecimientosAgendados,
    agendamientoApilado,
    agendamientoSemanal,
    agendamientoGlobal,
  };
}
