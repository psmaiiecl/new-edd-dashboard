export function buildGrabacionesRecibidasDiarias(data) {
  const dias = data?.dias || [];
  const avanceRinden = data?.avance_rinden || [];
  const avanceNoRinden = data?.avance_no_rinden || [];
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
        categories: dias,
      },
    },
    series: [
      {
        name: "Grabaciones de Docentes que Rinden Portafolio",
        data: avanceRinden,
        color: "#b2de95",
      },
      {
        name: "Grabaciones de Docentes que no Rinden Portafolio",
        data: avanceNoRinden,
        color: "#5b9bd5",
      }
    ],
  };
  return res;
}