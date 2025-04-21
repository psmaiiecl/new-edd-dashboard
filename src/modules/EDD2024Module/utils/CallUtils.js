import { NF } from "../../../utils/NumberFormatter";

export function buildCallModuleInfo(data) {
  let porcentaje = 0;
  if (data.llamadas_entrantes_habiles != 0) {
    porcentaje =
      (data.llamadas_atendidas * 100) / data.llamadas_entrantes_habiles;
  }

  return {
    entrantes: data.llamadas_entrantes_habiles
      ? data.llamadas_entrantes_habiles
      : 0,
    atendidas: data.llamadas_atendidas ? data.llamadas_atendidas : 0,
    respondidas: NF(porcentaje.toFixed(1)),
  };
}
