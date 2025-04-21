import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";

export function buildPortfolioModuleChart(data) {
  const portafolio_completado = data.portafolio_completado;
  const portafolio_iniciado = data.portafolio_iniciado;
  const portafolio_no_iniciado = data.portafolio_no_iniciado;

  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Portafolio Completado",
            y: portafolio_completado,
            color: "#65D9AB",
          },
          {
            name: "Portafolio Iniciado",
            y: portafolio_iniciado,
            color: "#FF8E53",
          },
          {
            name: "Portafolio No Iniciado",
            y: portafolio_no_iniciado,
            color: "#FF5880 ",
          },
        ],
      },
    ],
  };
}
