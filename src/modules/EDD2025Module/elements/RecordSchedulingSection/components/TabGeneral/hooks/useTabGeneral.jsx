import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2024 } from "../../../../../data/BASE_API_URL";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";

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
          establecimientos_agendamiento_completo: 100,
          establecimientos_agendamiento_iniciado: 100,
          establecimientos_contacto_inicial_exitoso: 100,
          establecimientos_contacto_inicial_fallido: 100,
          establecimientos_sin_contactar: 100,
        },
        mappers.establecimientos_agendados
      )
    );
    customFetch({
      route:
        BASE_API_URL_2024 +
        "/datos-json?etiqueta=2024-grabaciones-agendamiento-semanal-apilado",
    }).then((data) => console.log(data));
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
