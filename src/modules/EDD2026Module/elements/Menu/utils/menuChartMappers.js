import { MODULE_CHART_SETUP } from "../../../../../constants/CONST";

export function buildRepresentantesLegalesModuleChart(data) {
  const por_registrar = data.por_registrar ?? 0;
  const registrados = data.registrados ?? 0;
  const total = data.total ?? 0;

  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Registrados",
            color: "#65D9AB",
            y: registrados,
            drilldown: {
              categories: ["Registrados"],
              data: [(registrados / total) * 100],
            },
          },
          {
            name: "Por Registrar",
            color: "#FFD153",
            y: por_registrar,
            drilldown: {
              categories: ["Por Registrar"],
              data: [(por_registrar / total) * 100],
            },
          },
        ],
      },
    ],
  };
}

export function buildInscripcionModuleChart(data) {
  const enrolled = data.inscritos_total ? data.inscritos_total : 0;
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
            color: "#b3b8ff",
            y: enrolled,
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
            color: "#76767b",
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

export function buildValidationModuleChart(data) {
  const valid = data?.validado ?? 0;
  const notValid = data?.no_validado ?? 0;
  const notValidSusp = data?.no_validado_susp ?? 0;
  const notIn = data?.sin_ingreso ?? 0;
  const proceso = data?.en_proceso ?? 0;
  const total = data?.total ?? 0;

  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Validados",
            color: "#65D9AB",
            y: valid,
            drilldown: {
              categories: ["Validados"],
              data: [(valid / total) * 100],
            },
          },
          {
            name: "No Validados - Con Ingreso",
            y: notValid,
            color: "#ffd153",
            drilldown: {
              categories: ["No Validados - Con Ingreso"],
              data: [(notValid / total) * 100],
            },
          },
          {
            name: "No Validados - Susp/Exim Aprobada",
            y: notValidSusp,
            color: "#8fb8ff",
            drilldown: {
              categories: ["No Validados - Susp/Exim Aprobada"],
              data: [(notValidSusp / total) * 100],
            },
          },
          {
            name: "En proceso",
            y: proceso,
            color: "#ff8e53",
            drilldown: {
              categories: ["En proceso"],
              data: [(proceso / total) * 100],
            },
          },
          {
            name: "Sin ingreso",
            y: notIn,
            color: "#ff5880",
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
  const pospuestos_a = data.pospuestos_a ?? 0;
  const pospuestos_na = data.pospuestos_na ?? 0;
  const grabados = data.grabados ?? 0;
  const noGrabados = data.no_grabados ?? 0;
  const total = data.total ?? data.todos;

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
            name: "No Agendados en Plazo",
            y: noGrabados,
            color: "#FF5880",
            drilldown: {
              categories: ["No Agendados en Plazo"],
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
            name: "Pospuestos Agendados",
            y: pospuestos_a,
            color: "#FFD153",
            drilldown: {
              categories: ["Pospuestos Agendados"],
              data: [(pospuestos_a / total) * 100],
            },
          },
          {
            name: "Pospuestos No Agendados",
            y: pospuestos_na,
            color: "#f3a239ff",
            drilldown: {
              categories: ["Pospuestos No Agendados"],
              data: [(pospuestos_na / total) * 100],
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

export function buildAutograbacionModuleChart(data) {
  const conRespaldo = data.con_respaldo ?? 0;
  const pendiente = data.pendiente ?? 0;
  const listaEspera = data.lista_espera ?? 0;
  const noParticipa = data.no_participa ?? 0;
  const seleccionado = data.seleccionado ?? 0;
  const preseleccionado = data.preseleccionado ?? 0;
  const total = data.total;

  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Con Respaldo",
            y: conRespaldo,
            color: "#65D9AB",
            drilldown: {
              categories: ["Con Respaldo"],
              data: [(conRespaldo / total) * 100],
            },
          },
          {
            name: "Seleccionado",
            y: seleccionado,
            color: "#C1D9CA",
            drilldown: {
              categories: ["Seleccionado"],
              data: [(seleccionado / total) * 100],
            },
          },
          {
            name: "Preseleccionado",
            y: preseleccionado,
            color: "#5b9bd5",
            drilldown: {
              categories: ["Preseleccionado"],
              data: [(preseleccionado / total) * 100],
            },
          },
          {
            name: "Pendiente",
            y: pendiente,
            color: "#FFD153",
            drilldown: {
              categories: ["Pendiente"],
              data: [(pendiente / total) * 100],
            },
          },
          {
            name: "Lista de Espera",
            y: listaEspera,
            color: "#f3a239ff",
            drilldown: {
              categories: ["Lista de Espera"],
              data: [(listaEspera / total) * 100],
            },
          },
          {
            name: "No Participa",
            y: noParticipa,
            color: "#FF5880",
            drilldown: {
              categories: ["No Participa"],
              data: [(noParticipa / total) * 100],
            },
          },
        ],
      },
    ],
  };
}

export function buildProcesamientoModuleChart(data) {
  const COMPLETA_SIN_INCIDENCIAS = (
    data?.COMPLETA_SIN_INCIDENCIAS ?? []
  ).reduce((a, b) => a + b, 0);
  const COMPLETA_CON_INCIDENCIAS = (
    data?.COMPLETA_CON_INCIDENCIAS ?? []
  ).reduce((a, b) => a + b, 0);
  const QA_EN_REVISION = (data?.QA_EN_REVISION ?? []).reduce(
    (a, b) => a + b,
    0,
  );
  const QA_CON_INCIDENCIAS_A_REVISAR = (
    data?.QA_CON_INCIDENCIAS_A_REVISAR ?? []
  ).reduce((a, b) => a + b, 0);
  const QA_PENDIENTE_DE_REVISION = (
    data?.QA_PENDIENTE_DE_REVISION ?? []
  ).reduce((a, b) => a + b, 0);
  const PRE_QA_CON_INCIDENCIAS_CRITICAS = (
    data?.PRE_QA_CON_INCIDENCIAS_CRITICAS ?? []
  ).reduce((a, b) => a + b, 0);
  const EN_ESPERA_PREQA = (data?.EN_ESPERA_PREQA ?? []).reduce(
    (a, b) => a + b,
    0,
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

export function buildRecuperacionModuleChart(data) {
  const gestionados = data.Gestionado ?? 0;
  const revision = data["Para revisión"] ?? 0;
  const contactado = data.Contactado ?? 0;
  const recepcionados = data["Recepcionado - Cerrado"] ?? 0;
  const transito = data["En tránsito"] ?? 0;
  const porGestionar = data["Por gestionar"] ?? 0;
  const total =
    recepcionados +
    porGestionar +
    gestionados +
    transito +
    revision +
    contactado;

  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Recepcionado - Cerrado",
            y: recepcionados,
            color: "#65D9AB",
            drilldown: {
              categories: ["Recepcionado - Cerrado"],
              data: [(recepcionados / total) * 100],
            },
          },
          {
            name: "Por Gestionar",
            y: porGestionar,
            color: "#64a5faff",
            drilldown: {
              categories: ["Por gestionar"],
              data: [(porGestionar / total) * 100],
            },
          },
          {
            name: "Gestionado",
            color: "#C1D9CA",
            y: gestionados,
            drilldown: {
              categories: ["Gestionado"],
              data: [(gestionados / total) * 100],
            },
          },
          {
            name: "En tránsito",
            y: transito,
            color: "#FF5880",
            drilldown: {
              categories: ["En tránsito"],
              data: [(transito / total) * 100],
            },
          },
          {
            name: "Para revisión",
            y: revision,
            color: "#FFD153",
            drilldown: {
              categories: ["Para revisión"],
              data: [(revision / total) * 100],
            },
          },
          {
            name: "Contactado",
            y: contactado,
            color: "#f3a239ff",
            drilldown: {
              categories: ["Contactado"],
              data: [(contactado / total) * 100],
            },
          },
        ],
      },
    ],
  };
}

export function buildPostulacionModuleChart(data) {
  const postulaciones = data?.postulantes_totales || 0;
  const requeridosRestantes =
    data?.postulantes_requeridos - data?.postulantes_totales || 0;
  const total = data?.postulantes_requeridos || 0;

  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Postulaciones",
            y: postulaciones,
            color: "#c3ffb0",
            drilldown: {
              categories: ["Postulaciones"],
              data: [(postulaciones / total) * 100],
            },
          },
          {
            name: "Restantes",
            y: requeridosRestantes,
            color: "#76767b",
            drilldown: {
              categories: ["Restantes"],
              data: [(requeridosRestantes / total) * 100],
            },
          },
        ],
      },
    ],
  };
}

export function buildPortfolioCorrectionModuleChart(data) {
  const completas = data?.completa?.cantidad || 0;
  const incompletas = data?.incompleta?.cantidad || 0;
  const total = completas + incompletas;

  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Correcciones Completas",
            y: completas,
            color: "#c3ffb0",
            drilldown: {
              categories: ["Completas"],
              data: [(completas / total) * 100],
            },
          },
          {
            name: "Correcciones Incompletas",
            y: incompletas,
            color: "#ff5880",
            drilldown: {
              categories: ["Incompletas"],
              data: [(incompletas / total) * 100],
            },
          },
        ],
      },
    ],
  };
}

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

  const total = docentes.total;

  return {
    ...MODULE_CHART_SETUP,
    series: [
      {
        ...MODULE_CHART_SETUP.series[0],
        data: [
          {
            name: "Portafolio Respondido",
            color: "#65d9ab",
            y: portafolio_completado,
            drilldown: {
              categories: ["portafolio_completado"],
              data: [(portafolio_completado / total) * 100],
            },
          },
          {
            name: "Portafolio en Proceso",
            y: portafolio_iniciado,
            color: "#ffd153",
            drilldown: {
              categories: ["portafolio_iniciado"],
              data: [(portafolio_iniciado / total) * 100],
            },
          },
          {
            name: "Portafolio No Iniciado",
            y: portafolio_no_iniciado,
            color: "#ff8e53",
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

export function buildResultModuleChart(data) {
  const ratios = data.ratios
  const individuales_descargados = ratios.informes_individuales_descargados
    ? ratios.informes_individuales_descargados
    : 0;
  const individuales_no_descargados =
    ratios.informes_individuales_no_descargados
      ? ratios.informes_individuales_no_descargados
      : 0;

  const total = ratios.informes_individuales;
  
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
          },
        ],
      },
    ],
  };
}
