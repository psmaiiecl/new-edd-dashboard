import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";

export function buildResultsModuleChart(data) {
  const descargados = data.informes_individuales_descargados
    ? data.informes_individuales_descargados
    : 0;
  const total = data.informes_individuales ? data.informes_individuales : 0;
  const no_descargados = total - descargados;
  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Informes descargados",
            y: descargados,
            color: "#65D9AB",
          },
          {
            name: "Informes no descargados",
            y: no_descargados,
            color: "#FF8E53",
          },
        ],
      },
    ],
  };
}
