import { ConvertirPalabras } from "../../../../../../utils/portafolioUtils.js";

export const mapAvanceDiario = (data, dataGeneral) => {
  const fechas = data.fechas;

  const completados = data.pfCompletado;
  const iniciados = data.pfiniciados;
  const m1Iniciado = data.m1Iniciado_cant;
  const m2Iniciado = data.m2Iniciado_cant;
  const m3Iniciado = data.m3Iniciado_cant;

  // 🔑 Datos generales (valores fijos)
  const rindenPortafolioTotal =
    dataGeneral?.["portafolio-docentes-validados"]?.docentes
      ?.rinden_portafolio || 0;
  const suspendidosTotal =
    dataGeneral?.["portafolio-docentes-validados"]?.docentes?.suspendidos || 0;

  const rindenPortafolioPorFecha = fechas.map(
    () => rindenPortafolioTotal - suspendidosTotal
  );

  return {
    fechas,
    series: [
      {
        name: ConvertirPalabras("Portafolios Completados"),
        color: "#5157FF",
        data: completados,
      },
      {
        name: ConvertirPalabras("Portafolios Iniciados"),
        color: "#FF8E53",
        data: iniciados,
      },
      {
        name: ConvertirPalabras("Módulo 1 Iniciado"),
        color: "#65D9AB",
        data: m1Iniciado,
      },
      {
        name: ConvertirPalabras("Módulo 2 Iniciado"),
        color: "#FFD153",
        data: m2Iniciado,
      },
      {
        name: ConvertirPalabras("Módulo 3 Iniciado"),
        color: "#FF5880",
        data: m3Iniciado,
      },
      {
        name: ConvertirPalabras("Docentes que Rinden Portafolio"),
        color: "#b5ef59",
        data: rindenPortafolioPorFecha,
      },
    ],
  };
};
