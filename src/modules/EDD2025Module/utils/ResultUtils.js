import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";

export function buildResultModuleChart(docentes) {
  const informes_individuales_descargados = docentes.informes_individuales_descargados
    ? docentes.informes_individuales_descargados
    : 0;
  const informes_individuales_no_descargados = docentes.informes_individuales_no_descargados
    ? docentes.informes_individuales_no_descargados
    : 0;
 

  const total =
    informes_individuales_descargados +
    informes_individuales_descargados;

  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Informes Descargados",
            color: "#65d9ab",
            y: informes_individuales_descargados,
            drilldown: {
              categories: ["informes_individuales_descargados"],
              data: [(informes_individuales_descargados / total) * 100],
            },
          },
          {
            name: "Informes Indiviaduales no Descargados",
            y: informes_individuales_no_descargados,
            color: "#ff8e53",
            drilldown: {
              categories: ["informes_individuales_no_descargados"],
              data: [(informes_individuales_no_descargados / total) * 100],
            },
          },
        ],
      },
    ],
  };
}

