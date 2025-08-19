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

export function buildCdCSummaryData(data){
  const tableData = [];
  const centrosFiltros = [];
  
  Object.keys(data).forEach((key) => {
    const item = {};
    item.centro = key;
    item.total_postulaciones = data[key]?.total_postulaciones || 0;
    item.c_30 = data[key]?.correctores.treinta || 0;
    item.c_10 = data[key]?.correctores.diez || 0;
    item.c_correctores = data[key]?.correctores.correctores || 0;
    item.c_seleccionados = data[key]?.correctores.seleccionados || 0;
    item.c_porcentaje_seleccionados = (item.c_seleccionados / item.c_correctores * 100).toFixed(2) || 0;
    item.s_requeridos = data[key]?.supervisores.requeridos || 0;
    item.s_seleccionados = data[key]?.supervisores.seleccionados || 0;
    item.s_porcentaje_seleccionados = (item.s_seleccionados / item.s_requeridos * 100).toFixed(2) || 0;
    item.lista_espera = data[key]?.lista_espera || 0;
    tableData.push(item);
    centrosFiltros.push({id: key, label: key, value: key})
  })

  return {tableData, centrosFiltros};
}