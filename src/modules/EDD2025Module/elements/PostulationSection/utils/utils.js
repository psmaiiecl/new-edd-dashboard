export function buildPostulacionChart(data) {
  const fechas = data?.fechas || [];
  const postulaciones = data?.postulantes || [];
  const postulacionesRequeridas = Array(fechas.length).fill(
    data?.postulantes_requeridos || 0
  );

  const res = {
    chart: {
      series: [
        {
          color: "#ffc729",
          name: "Total Postulaciones Requeridas",
          data: postulacionesRequeridas,
        },
        {
          color: "#719af7",
          name: "Postulantes Totales",
          data: postulaciones,
        },
      ],
      override: {
        xAxis: {
          type: "category",
          categories: fechas,
          title: {
            text: "Fecha",
            style: {
              fontSize: "13px",
              color: "#666666",
            },
          },
        },

        tooltip: {
          useHTML: true,
          pointFormatter: function () {
            const y = this.y;
            const series = this.series;
            if (this.color == "#28a745") {
              return `<span style="color: ${series.color}">${
                series.name
              }</span>: <b>${y.toFixed(1)}</b>`;
            } else {
              return `<span style="color: ${series.color}">${
                series.name
              }</span>: <b>${y.toFixed(1)}</b>`;
            }
          },
        },
      },
    },
    table: {
      postulantes_requeridos: data?.postulantes_requeridos || 0,
      postulantes_totales: data?.postulantes_totales || 0,
    },
  };
  return res;
}

export function buildCdCSummaryData(data, centro) {
  const tableData = data;
  const centrosFiltros = [];

  if (centro) {
    centrosFiltros.push({ id: centro, label: centro, value: centro });
  } else {
    data.forEach((element) => {
      centrosFiltros.push({
        id: element.centro,
        label: element.centro,
        value: element.centro,
      });
    });
  }

  return { tableData, centrosFiltros };
}

export function buildCdCFilteredData(data) {
  console.log(data);
}
