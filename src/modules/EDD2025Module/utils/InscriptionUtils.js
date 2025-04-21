import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";

export function buildInscripcionModuleChart(data) {
  const enrolled = data.inscritos ? data.inscritos : 0;
  const inReview = data.en_revision ? data.en_revision : 0;
  const discharged = data.desinscritos ? data.desinscritos : 0;
  const pending = data.pendientes ? data.pendientes : 0;
  const cancelled = data.cancelados ? data.cancelados : 0;
  const total = enrolled + inReview + discharged + pending + cancelled;

  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Inscritos",
            y: enrolled,
            color: "#76767b",
            drilldown: {
              categories: ["Inscritos"],
              data: [(enrolled / total) * 100],
            },
          },
          {
            name: "En revisión",
            y: inReview,
            color: "#c3ffb0",
            drilldown: {
              categories: ["En revisión"],
              data: [(inReview / total) * 100],
            },
          },
          {
            name: "Desinscritos",
            y: discharged,
            color: "#ffd68f",
            drilldown: {
              categories: ["Desinscritos"],
              data: [(discharged / total) * 100],
            },
          },
          {
            name: "Pendientes",
            y: pending,
            color: "#b3b8ff",
            drilldown: {
              categories: ["Pendientes"],
              data: [(pending / total) * 100],
            },
          },
          {
            name: "Cancelados",
            y: cancelled,
            color: "#ff8fb3",
            drilldown: {
              categories: ["Cancelados"],
              data: [(cancelled / total) * 100],
            },
          },
        ],
      },
    ],
  };
}
