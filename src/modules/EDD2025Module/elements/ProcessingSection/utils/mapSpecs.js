const mappers = {
  avance_chart: {
    reverse: true,
    type: "chart",
    categoriesKey: "fechas",
    series: [
      {
        name: "Revisión completa sin incidencias",
        key: "COMPLETA_SIN_INCIDENCIAS",
        color: "#b2de95",
        marker: { enabled: false },
      },
      {
        name: "Revisión completa con incidencias",
        key: "COMPLETA_CON_INCIDENCIAS",
        color: "#ffc710ff",
        marker: { enabled: false },
      },
      {
        name: "QA en revisión",
        key: "QA_EN_REVISION",
        color: "#c5a8ff",
        marker: { enabled: false },
      },
      {
        name: "En QA con incidencias a revisar",
        key: "QA_CON_INCIDENCIAS_A_REVISAR",
        color: "#5b9bd5",
        marker: { enabled: false },
      },
      {
        name: "En QA pendiente de revisión",
        key: "QA_PENDIENTE_DE_REVISION",
        color: "#69eeeeff",
        marker: { enabled: false },
      },
      {
        name: "En PRE QA con incidencias críticas",
        key: "PRE_QA_CON_INCIDENCIAS_CRITICAS",
        color: "#ff5880",
        marker: { enabled: false },
      },
      {
        name: "En espera PRE QA",
        key: "EN_ESPERA_PREQA",
        color: "#c9c9c9ff",
        marker: { enabled: false },
      },
    ],
    // overrides opcionales para Highcharts
    override: {
      xAxis: { title: { enabled: false } },
      yAxis: { title: { enabled: false } },
      tooltip: {
        shared: true,
        pointFormat:
          '<span style="font-size:13px;"><span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b></span><br/>',
      },
    },
  },

  avance_table: {
    reverse: true,
    type: "table",
    categoriesKey: "fechas",
    columns: [
      { key: "fecha", label: "Fecha" },
      {
        key: "EN_ESPERA_PREQA",
        label: "En espera PRE QA",
        color: "#c9c9c9ff",
      },
      {
        key: "PRE_QA_CON_INCIDENCIAS_CRITICAS",
        label: "PRE QA con incidencias críticas",
        color: "#ff5880",
      },
      {
        key: "QA_PENDIENTE_DE_REVISION",
        label: "En QA pendiente de revisión",
        color: "#69eeeeff",
      },
      {
        key: "QA_CON_INCIDENCIAS_A_REVISAR",
        label: "En QA con incidencias a revisar",
        color: "#5b9bd5",
      },
      {
        key: "QA_EN_REVISION",
        label: "QA en revisión",
        color: "#c5a8ff",
      },
      {
        key: "COMPLETA_CON_INCIDENCIAS",
        label: "Revisión completa con incidencias",
        color: "#ffc710ff",
      },
      {
        key: "COMPLETA_SIN_INCIDENCIAS",
        label: "Revisión completa sin incidencias",
        color: "#b2de95",
      },
      { key: "total", label: "Total" },
      { key: "porcentaje_avance", label: "% Avance" },
    ],
    totalKeys: [
      "EN_ESPERA_PREQA",
      "PRE_QA_CON_INCIDENCIAS_CRITICAS",
      "QA_PENDIENTE_DE_REVISION",
      "QA_CON_INCIDENCIAS_A_REVISAR",
      "QA_EN_REVISION",
      "COMPLETA_CON_INCIDENCIAS",
      "COMPLETA_SIN_INCIDENCIAS",
    ],
    showPercentOfGlobal: true,
  },
};

export default mappers;
