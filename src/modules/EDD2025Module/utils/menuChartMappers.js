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

export function buildProcesamientoModuleChart(data) {
  const COMPLETA_SIN_INCIDENCIAS = (data?.COMPLETA_SIN_INCIDENCIAS ?? []).reduce(
    (a, b) => a + b,
    0
  );
  const COMPLETA_CON_INCIDENCIAS = (data?.COMPLETA_CON_INCIDENCIAS ?? []).reduce(
    (a, b) => a + b,
    0
  );
  const QA_EN_REVISION = (data?.QA_EN_REVISION ?? []).reduce((a, b) => a + b, 0);
  const QA_CON_INCIDENCIAS_A_REVISAR = (
    data?.QA_CON_INCIDENCIAS_A_REVISAR ?? []
  ).reduce((a, b) => a + b, 0);
  const QA_PENDIENTE_DE_REVISION = (data?.QA_PENDIENTE_DE_REVISION ?? []).reduce(
    (a, b) => a + b,
    0
  );
  const PRE_QA_CON_INCIDENCIAS_CRITICAS = (
    data?.PRE_QA_CON_INCIDENCIAS_CRITICAS ?? []
  ).reduce((a, b) => a + b, 0);
  const EN_ESPERA_PREQA = (data?.EN_ESPERA_PREQA ?? []).reduce(
    (a, b) => a + b,
    0
  );

  const total =
    COMPLETA_SIN_INCIDENCIAS +
    COMPLETA_CON_INCIDENCIAS +
    QA_EN_REVISION +
    QA_CON_INCIDENCIAS_A_REVISAR +
    QA_PENDIENTE_DE_REVISION +
    PRE_QA_CON_INCIDENCIAS_CRITICAS +
    EN_ESPERA_PREQA;

  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Revisión completa sin incidencias",
            y: COMPLETA_SIN_INCIDENCIAS,
            color: "#b2de95",
            drilldown: {
              categories: ["Revisión completa sin incidencias"],
              data: [(COMPLETA_CON_INCIDENCIAS / total) * 100],
            },
          },
          {
            name: "Revisión completa con incidencias",
            y: COMPLETA_CON_INCIDENCIAS,
            color: "#ffc710ff",
            drilldown: {
              categories: ["Revisión completa con incidencias"],
              data: [(COMPLETA_CON_INCIDENCIAS / total) * 100],
            },
          },
          {
            name: "QA en revisión",
            y: QA_EN_REVISION,
            color: "#c5a8ff",
            drilldown: {
              categories: ["QA en revisión"],
              data: [(QA_EN_REVISION / total) * 100],
            },
          },
          {
            name: "En QA con incidencias a revisar",
            y: QA_CON_INCIDENCIAS_A_REVISAR,
            color: "#5b9bd5",
            drilldown: {
              categories: ["En QA con incidencias a revisar"],
              data: [(QA_CON_INCIDENCIAS_A_REVISAR / total) * 100],
            },
          },
          {
            name: "En QA pendiente de revisión",
            y: QA_PENDIENTE_DE_REVISION,
            color: "#69eeeeff",
            drilldown: {
              categories: ["En QA pendiente de revisión"],
              data: [(QA_PENDIENTE_DE_REVISION / total) * 100],
            },
          },
          {
            name: "En PRE QA con incidencias críticas",
            y: PRE_QA_CON_INCIDENCIAS_CRITICAS,
            color: "#ff5880",
            drilldown: {
              categories: ["En PRE QA con incidencias críticas"],
              data: [(PRE_QA_CON_INCIDENCIAS_CRITICAS / total) * 100],
            },
          },
          {
            name: "En espera PRE QA",
            y: EN_ESPERA_PREQA,
            color: "#c9c9c9ff",
            drilldown: {
              categories: ["En espera PRE QA"],
              data: [(EN_ESPERA_PREQA / total) * 100],
            },
          },
        ],
      },
    ],
  };
}
