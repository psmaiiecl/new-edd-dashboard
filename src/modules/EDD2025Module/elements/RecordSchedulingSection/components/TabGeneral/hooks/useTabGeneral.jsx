import { useCallback, useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
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

  const [reload, setReload] = useState(0);
  const reloadFn = useCallback(() => {
    setReload((prev) => prev + 1);
  }, []);

  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-agendamiento-grabaciones-tab-general",
      shouldCache: true,
    }).then((data) => {
      setDocentesAgendados(
        mapPieData(data.agendamiento_docentes, mappers.docentes_agendados)
      );
      setEstablecimientosAgendados(
        mapPieData(
          data.agendamiento_establecimientos,
          mappers.establecimientos_agendados
        )
      );
      setAgendamientoApilado(
        buildAgendamientoApilado(data.agendamiento_semanal_apilado)
      );
      setAgendamientoSemanal(
        buildAgendamientoGeneral(data.agendamiento_semanal.normal)
      );
      setAgendamientoGlobal(
        buildAgendamientoGeneral(data.agendamiento_semanal.acumulado)
      );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return {
    docentesAgendados,
    establecimientosAgendados,
    agendamientoApilado,
    agendamientoSemanal,
    agendamientoGlobal,
    reloadFn,
  };
}
