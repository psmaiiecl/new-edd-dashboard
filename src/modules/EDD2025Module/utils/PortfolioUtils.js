import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";

export function buildPortfolioModuleChart(docentes) {
  const portafolio_completado = docentes.portafolio_completado
    ? docentes.portafolio_completado
    : 0;
  const portafolio_iniciado = docentes.portafolio_iniciado
    ? docentes.portafolio_iniciado
    : 0;
  const portafolio_no_iniciado = docentes.portafolio_no_iniciado
    ? docentes.portafolio_no_iniciado
    : 0;
  const portafolio_no_iniciado_se_pend = docentes.portafolio_no_iniciado_se_pend
    ? docentes.portafolio_no_iniciado_se_pend
    : 0;

  const total =
    portafolio_completado +
    portafolio_iniciado +
    portafolio_no_iniciado +
    portafolio_no_iniciado_se_pend;

  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Portafolio Completado",
            color: "#65d9ab",
            y: portafolio_completado,
            drilldown: {
              categories: ["portafolio_completado"],
              data: [(portafolio_completado / total) * 100],
            },
          },
          {
            name: "Portafolio Iniciado",
            y: portafolio_iniciado,
            color: "#ff8e53",
            drilldown: {
              categories: ["portafolio_iniciado"],
              data: [(portafolio_iniciado / total) * 100],
            },
          },
          {
            name: "Portafolio No Iniciado",
            y: portafolio_no_iniciado,
            color: "#ffd153",
            drilldown: {
              categories: ["portafolio_no_iniciado"],
              data: [(portafolio_no_iniciado / total) * 100],
            },
          },
          {
            name: "Portafolio No Iniciado Con Susp/Exim Pendiente",
            y: portafolio_no_iniciado_se_pend,
            color: "#ff5880",
            drilldown: {
              categories: ["portafolio_no_iniciado_se_pend"],
              data: [(portafolio_no_iniciado_se_pend / total) * 100],
            },
          },
        ],
      },
    ],
  };
}

export function ConvertirPalabras(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
