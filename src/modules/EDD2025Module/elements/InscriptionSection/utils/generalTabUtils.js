import { numberFormatter } from "../../../../../utils/NumberFormatter";

export function buildDocentesInscritos(data) {
  const totalInscritos =
    parseInt(data.docentes.inscritos) +
    parseInt(data.docentes.inscritos_agregados_por_sostenedor);
  const total = totalInscritos + parseInt(data.docentes.cancelados);
  return {
    series: [
      {
        name: "Inscritos",
        y: totalInscritos,
        sliced: true,
        selected: true,
        color: "#65D9AB",
      },
      {
        name: "Cancelados",
        y: parseInt(data.docentes.cancelados),
        color: "#FF5880",
      },
    ],
    total: {
      numeric: total,
      text: numberFormatter(totalInscritos),
    },
  };
}
export function buildAvanceDiario(setup, data, data2023) {
  const arrFechas = [];
  const arrAcumulado = [];
  const arrAcumulado2023 = [];
  const arrAcumulado2 = [];
  const arrTotal = [];
  const arrTotal2023 = [];
  Object.entries(data).forEach(([key, arrays]) => {
    if (key !== "") {
      if (!arrFechas.includes(key)) {
        arrFechas.push(key);
        arrAcumulado.push(key);
        arrAcumulado2023.push(key);
        arrAcumulado2.push(key);
        arrTotal.push(key);
      }

      if (arrAcumulado.includes(key)) {
        const index = arrAcumulado.indexOf(key);
        arrAcumulado.splice(index, 1, arrays.porcentaje);
        arrAcumulado2023.splice(index, 1, data2023[key].porcentaje);
        arrAcumulado2.splice(index, 1, arrays.porcentaje);
      }

      if (arrTotal.includes(key)) {
        const index = arrTotal.indexOf(key);
        arrTotal.splice(index, 1, arrays.total);
        arrTotal2023.splice(index, 1, data2023[key].porcentaje);
      }
    }
  });

  const res = {
    ...setup,
    xAxis: {
      type: "category",
      categories: arrFechas,
      title: {
        text: "Fecha",
        style: {
          fontWeight: "bold",
          fontSize: "18px",
          color: "#666666",
        },
      },
    },
    tooltip: {
      useHTML: true,
      pointFormatter: function () {
        const y = this.y;
        const series = this.series;
        const index = this.index;
        if (this.color == "#28a745") {
          return `<span style="color: ${series.color}">${
            series.name
          }</span>: <b>${y.toFixed(1)}%</b>`;
        } else {
          return `<span style="color: ${series.color}">${
            series.name
          }</span>: <b>${y.toFixed(1)}%</b><br><span style="color:${
            series.color
          }">Total: </span> <b>${numberFormatter(arrTotal[index])}</b>`;
        }
      },
      valueDecimals: 2,
    },
    series: [
      {
        color: "#5157FF",
        name: "Porcentaje avance",
        data: arrAcumulado,
        //data: arrAcumulado2,
        tooltip: {
          valueSuffix: "%",
          valueDecimals: 1,
        },
      },
      {
        color: "#28a745",
        name: "Porcentaje avance 2024",
        data: arrAcumulado2023,
        // data: arrAcumulado2,
        tooltip: {
          valueSuffix: "%",
          valueDecimals: 1,
        },
      },
    ],
  };
  return res;
}
