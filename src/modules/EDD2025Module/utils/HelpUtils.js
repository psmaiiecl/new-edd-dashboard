import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";

export function buildHelpModuleChart(data) {
  const attended = data.Atendida ? +data.Atendida : 0;
  const notAttended = data['No atendida'] ? +data['No atendida'] : 0;
  const total = attended + notAttended;

  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Atendidas",
            y: attended,
            color: "#76767b",
            drilldown: {
              categories: ["Atendidas"],
              data: [(attended / total) * 100],
            },
          },
          {
            name: "No atendidas",
            y: notAttended,
            color: "#c3ffb0",
            drilldown: {
              categories: ["No atendidas"],
              data: [(notAttended / total) * 100],
            },
          },
          
        ],
      },
    ],
  };
}
