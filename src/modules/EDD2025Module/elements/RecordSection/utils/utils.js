export function buildAvanceDiarioGrabaciones(data) {
  const fechas = data?.fechas || [];
  const aGrabar = data?.a_grabar || [];
  const agendados = data?.agendados || [];
  const grabados = data?.grabados || [];
  const pospuestos = data?.pospuestos || [];
  const res = {
    override: {
      tooltip: {
        pointFormatter: function () {
          return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${this.y}</b><br/>`;
        },
      },
      yAxis: {
        labels: {
          formatter: function () {
            return `${this.value}`;
          },
        },
      },
      xAxis: {
        categories: fechas,
      },
    },
    series: [
      {
        name: "Docentes a Grabar",
        data: aGrabar,
        color: "#b2de95",
        marker: {
          enabled: false,
        },
      },
      {
        name: "Avance Agendamiento Grabaciones",
        data: agendados,
        color: "#5b9bd5",
        marker: {
          enabled: false,
        },
      },
      {
        name: "Avance Grabaciones Reportadas",
        data: grabados,
        color: "#c5a8ff",
        marker: {
          enabled: false,
        },
      },
      {
        name: "Pospuestos",
        data: pospuestos,
        color: "#ff5880",
        marker: {
          enabled: false,
        },
      },
    ],
  };
  return res;
}

export function buildGrabacionesSemanales(data) {
  const semanas = data?.semanas || [];
  const avanceReal = data?.avance_real || [];
  const avanceEsperado = data?.avance_esperado || [];
  const proyectado = data?.agendamiento_proyectado || [];
  const res = {
    override: {
      tooltip: {
        pointFormatter: function () {
          return `<span style="color:${this.color}">●</span> ${
            this.series.name
          }: <b>${this.y}</b><br/>`;
        },
      },
      yAxis: {
        labels: {
          formatter: function () {
            return `${this.value}`;
          },
        },
      },
      xAxis: {
        categories: semanas,
      },
    },
    series: [
      {
        name: "Avance Real",
        data: avanceReal,
        color: "#b2de95",
      },
      {
        name: "Avance Esperado",
        data: avanceEsperado,
        color: "#5b9bd5",
      },
      {
        name: "Proyección Grabaciones Necesarias",
        data: proyectado,
        color: "#ffbc2cff",
      },
    ],
  };
  return res;
}