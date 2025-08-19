const mappers = {
  avance_chart: {
    reverse: true,
    type: "chart",
    categoriesKey: "fechas",
    series: [
      {
        name: "Revisión finalizada",
        key: "QA_SIN_INCIDENCIAS",
        color: "#b2de95",
        marker: { enabled: false },
      },
      {
        name: "QA con incidencias críticas",
        key: "QA_CON_INCIDENCIAS_CRITICAS",
        color: "#c5a8ff",
        marker: { enabled: false },
      },
      {
        name: "En QA",
        key: "EN_ESTADO_QA",
        color: "#5b9bd5",
        marker: { enabled: false },
      },
      {
        name: "En pre QA",
        key: "EN_ESTADO_PRE_QA",
        color: "#ff8801ff",
        marker: { enabled: false },
      },
      {
        name: "Grabaciones recibidas",
        key: "CON_GRABACIONES_RECIBIDAS",
        color: "#ff5880",
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
        key: "QA_SIN_INCIDENCIAS",
        label: "Revisión finalizada",
        color: "#b2de95",
      },
      {
        key: "QA_CON_INCIDENCIAS_CRITICAS",
        label: "QA con incidencias críticas",
        color: "#c5a8ff",
      },
      { key: "EN_ESTADO_QA", label: "En QA", color: "#5b9bd5" },
      { key: "EN_ESTADO_PRE_QA", label: "En pre QA", color: "#ff8801ff" },
      {
        key: "CON_GRABACIONES_RECIBIDAS",
        label: "Grabaciones recibidas",
        color: "#ff5880",
      },
      { key: "total", label: "Total" },
      { key: "porcentaje_avance", label: "% Avance" },
    ],
    totalKeys: [
      "QA_SIN_INCIDENCIAS",
      "QA_CON_INCIDENCIAS_CRITICAS",
      "EN_ESTADO_QA",
      "EN_ESTADO_PRE_QA",
      "CON_GRABACIONES_RECIBIDAS",
    ],
    showPercentOfGlobal: true,
  },
};

export default mappers;
