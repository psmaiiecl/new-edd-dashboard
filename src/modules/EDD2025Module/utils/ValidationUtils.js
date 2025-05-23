import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";

export function buildValidationModuleChart(data) {
  const valid = data.validado ? data.validado : 0;
  const notValid = data.no_validado ? data.no_validado : 0;
  const notIn = data.sin_ingreso ? data.sin_ingreso : 0;
  const total = valid + notValid + notIn;

  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Validados",
            color: "rgb(196, 255, 255)",
            y: valid,
            drilldown: {
              categories: ["Validados"],
              data: [(valid / total) * 100],
            },
          },
          {
            name: "No Validados",
            y: notValid,
            color: "rgb(67, 67, 72)",
            drilldown: {
              categories: ["No Validados"],
              data: [(notValid / total) * 100],
            },
          },
          {
            name: "Sin ingreso",
            y: notIn,
            color: "rgb(94, 195, 194)",
            drilldown: {
              categories: ["Sin ingreso"],
              data: [(notIn / total) * 100],
            },
          },
        ],
      },
    ],
  };
}
