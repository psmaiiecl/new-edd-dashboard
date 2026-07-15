import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2026 } from "../../../../../../../constants/BASE_API_URL";
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
    customFetch({
      route: BASE_API_URL_2026 + "/agendamiento/tab-general/data",
      shouldCache: true,
      method: "GET",
    }).then((response) => {
      const { data } = response;
      setDocentesAgendados(
        mapPieData(data?.agendamiento_docentes, mappers.docentes_agendados)
      );
      setEstablecimientosAgendados(
        mapPieData(
          data?.agendamiento_establecimientos,
          mappers.establecimientos_agendados
        )
      );
      setAgendamientoApilado(
        buildAgendamientoApilado(data?.agendamiento_semanal_apilado)
      );
      setAgendamientoSemanal(
        buildAgendamientoGeneral(data?.agendamiento_semanal?.normal)
      );
      setAgendamientoGlobal(
        buildAgendamientoGeneral(data?.agendamiento_semanal?.acumulado)
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
