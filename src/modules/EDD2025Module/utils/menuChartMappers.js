import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";

export function buildAgendamientoModuleChart(data) {
  const agendados = data.agendados ?? 0;
  const contacto = data.contacto_exitoso ?? 0;
  const contactoNoExitoso = data.contacto_no_exitoso ?? 0;
  const sinContactar = data.sin_contactar ?? 0;
  const total = data.todos;

  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Agendados",
            color: "#65D9AB",
            y: agendados,
            drilldown: {
              categories: ["Agendados"],
              data: [(agendados / total) * 100],
            },
          },
          {
            name: "Contacto Inicial Exitoso",
            y: contacto,
            color: "#FFD153",
            drilldown: {
              categories: ["Contacto Inicial Exitoso"],
              data: [(contacto / total) * 100],
            },
          },
          {
            name: "Contacto Inicial no Exitoso",
            y: contactoNoExitoso,
            color: "#C1D9CA",
            drilldown: {
              categories: ["Contacto Inicial no Exitoso"],
              data: [(contactoNoExitoso / total) * 100],
            },
          },
          {
            name: "Sin Contactar",
            y: sinContactar,
            color: "#FF5880",
            drilldown: {
              categories: ["Sin Contactar"],
              data: [(sinContactar / total) * 100],
            },
          },
        ],
      },
    ],
  };
}
