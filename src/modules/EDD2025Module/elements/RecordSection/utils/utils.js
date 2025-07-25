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
