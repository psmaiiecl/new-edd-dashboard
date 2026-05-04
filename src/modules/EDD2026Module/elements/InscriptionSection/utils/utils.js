import { numberFormatter } from "../../../../../utils/NumberFormatter";
import { AVANCE_DIARIO_2024 } from "../../../../EDD2025Module/elements/InscriptionSection/data/AVANCE_DIARIO_2024";

export function buildDocentesInscritos(data) {
  const totalInscritos = parseInt(data.inscritos_total);
  const total = totalInscritos + parseInt(data.cancelados);
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
        y: parseInt(data.cancelados),
        color: "#FF5880",
      },
    ],
    total: {
      numeric: total,
      text: numberFormatter(totalInscritos),
    },
  };
}


export function buildAvanceDiario(data, dataPrev) {
  const data_2024 = AVANCE_DIARIO_2024;
  const arrFechas = [];
  const arrAcumulado = [];
  const arrAcumulado2024 = [];
  const arrAcumulado2025 = [];
  const arrAcumulado2 = [];
  const arrTotal = [];
  const arrTotal2024 = [];
  const arrTotal2025 = [];
  Object.entries(data).forEach(([key, arrays]) => {
    if (key !== "") {
      if (!arrFechas.includes(key)) {
        arrFechas.push(key);
        arrAcumulado.push(key);
        arrAcumulado2024.push(key);
        arrAcumulado2025.push(key);
        arrAcumulado2.push(key);
        arrTotal.push(key);
      }

      if (arrAcumulado.includes(key)) {
        const index = arrAcumulado.indexOf(key);
        arrAcumulado.splice(index, 1, arrays.porcentaje);
        arrAcumulado2024.splice(index, 1, data_2024[key].porcentaje);
        arrAcumulado2025.splice(index, 1, dataPrev?.[key]?.porcentaje ?? 0);
        arrAcumulado2.splice(index, 1, arrays.porcentaje);
      }

      if (arrTotal.includes(key)) {
        const index = arrTotal.indexOf(key);
        arrTotal.splice(index, 1, arrays.total);
        arrTotal2024.splice(index, 1, data_2024?.[key]?.porcentaje ?? 0);
        arrTotal2025.splice(index, 1, dataPrev?.[key]?.porcentaje ?? 0);
      }
    }
  });

  const res = {
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
        name: "Porcentaje avance 2025",
        data: arrAcumulado2025,
        // data: arrAcumulado2,
        tooltip: {
          valueSuffix: "%",
          valueDecimals: 1,
        },
      },
      {
        color: "#FF5880",
        name: "Porcentaje avance 2024",
        data: arrAcumulado2024,
        tooltip: {
          valueSuffix: "%",
          valueDecimals: 1,
        },
      },
    ],
    override: {
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
          if (this.color == "#28a745" || this.color == "#FF5880") {
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
    },
  };
  return res;
}