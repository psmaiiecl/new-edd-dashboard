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

export function buildGrabacionesModuleChart(data) {
  const agendados = data.agendados ?? 0;
  const sinAgendar = data.sin_agendar ?? 0;
  const pospuestos = data.pospuestos ?? 0;
  const grabados = data.grabados ?? 0;
  const noGrabados = data.no_grabados ?? 0;
  const total = data.todos;

  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Grabados",
            y: grabados,
            color: "#65D9AB",
            drilldown: {
              categories: ["Grabados"],
              data: [(grabados / total) * 100],
            },
          },
          {
            name: "No Grabados",
            y: noGrabados,
            color: "#FF5880",
            drilldown: {
              categories: ["No Grabados"],
              data: [(noGrabados / total) * 100],
            },
          },
          {
            name: "Agendados",
            color: "#C1D9CA",
            y: agendados,
            drilldown: {
              categories: ["Agendados"],
              data: [(agendados / total) * 100],
            },
          },
          {
            name: "Pospuestos",
            y: pospuestos,
            color: "#FFD153",
            drilldown: {
              categories: ["Pospuestos"],
              data: [(pospuestos / total) * 100],
            },
          },
          {
            name: "Sin Agendar",
            y: sinAgendar,
            color: "#7fb4f0ff",
            drilldown: {
              categories: ["Sin Agendar"],
              data: [(sinAgendar / total) * 100],
            },
          },
        ],
      },
    ],
  };
}
