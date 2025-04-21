import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";

export function buildCorrectionModuleChart(data) {
  const correccion_completa = data.completa.cantidad;
  const correccion_incompleta = data.incompleta.cantidad;
  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Corrección Completa",
            y: correccion_completa,
            selected: true,
            color: "#90b8fe",
          },
          {
            name: "Corrección Incompleta",
            y: correccion_incompleta,
            color: "#FF8E53",
          },
        ],
      },
    ],
  };
}
