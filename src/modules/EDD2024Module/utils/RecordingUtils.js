import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";

export function buildRecordingModuleChart(data) {
  const sin_agendar = data.sin_agendar;
  const agendados = data.agendados;
  const pospuestos = data.pospuestos;
  const grabados = data.grabados;
  const no_grabados = data.no_grabados;
  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Sin agendar",
            y: sin_agendar,
            selected: true,
            color: "#FF5880",
          },
          {
            name: "Agendados",
            y: agendados,
            color: "#FF8E53",
          },
          {
            name: "Pospuestos",
            y: pospuestos,
            color: "#FFD153",
          },
          {
            name: "Grabados",
            y: grabados,
            color: "#8FB8FF",
          },
          {
            name: "No grabados",
            y: no_grabados,
            color: "#65D9AB",
          },
        ],
      },
    ],
  };
}
