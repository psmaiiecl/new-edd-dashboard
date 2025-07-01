import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";

export function buildResultModuleChart(ratios) {
  const individuales_descargados = ratios.informes_individuales_descargados ? ratios.informes_individuales_descargados : 0;
  const individuales_no_descargados = (ratios.informes_individuales - individuales_descargados) ? ratios.informes_individuales_descargados : 0;

  const total = individuales_descargados + individuales_no_descargados;
  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Informes Descargados",
            color: "#65d9ab",
            y: individuales_descargados,
            drilldown: {
              categories: ["Informes Descargados"],
              data: [(individuales_descargados / total) * 100],
            },
          },
          {
            name: "Informes no Descargados",
            y: individuales_no_descargados,
            color: "#ff8e53",
            drilldown: {
              categories: ["Informes no Descargados"],
              data: [(individuales_no_descargados / total) * 100],
            },
          }
        ],
      },
    ],
  };
}


