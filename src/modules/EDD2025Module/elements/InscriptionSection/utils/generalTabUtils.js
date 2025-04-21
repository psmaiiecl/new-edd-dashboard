import { numberFormatter } from "../../../../../utils/NumberFormatter";

export function buildDocentesSugeridos(setup, data) {
  const res = {
    ...setup,
    title: {
      ...setup.title,
      number: data.total.docentes,
      text: numberFormatter(data.total.docentes),
    },
    series: [
      {
        name: "Docentes en nómina",
        colorByPoint: true,
        data: [
          {
            name: "Inscritos",
            y: parseInt(data.docentes.inscritos),
            sliced: true,
            selected: true,
            color: "#65D9AB",
          },

          {
            name: "Desinscritos",
            y: parseInt(data.docentes.desinscritos),
            color: "#C1D9CA",
          },
          {
            name: "Pendientes",
            y: parseInt(data.docentes.pendientes),
            color: "#FFD153",
          },
        ],
      },
    ],
  };
  return res;
}

export function buildDocentesAgregados(setup, data) {
  const res = {
    ...setup,
    title: {
      ...setup.title,
      number: data.total.docentes,
      text: numberFormatter(data.total.docentes),
    },
    series: [
      {
        name: "Docentes agregados por sostenedores",
        colorByPoint: true,
        data: [
          {
            name: "Inscritos",
            y: parseInt(data.docentes.inscritos),
            sliced: true,
            selected: true,
            color: "#65D9AB",
          },

          {
            name: "En Revisión",
            y: parseInt(data.docentes["en_revision"]),
            color: "#FF8E53",
          },
          {
            name: "No Inscritos",
            y: 0,
            color: "#FF5880",
          },
        ],
      },
    ],
  };
  return res;
}
export function buildDocentesInscritos(setup, data) {
  const res = {
    ...setup,
    title: {
      ...setup.title,
      number: data.total.docentes,
      text: numberFormatter(data.total.docentes),
    },
    series: [
      {
        name: "Total docentes inscritos",
        colorByPoint: true,
        data: [
          {
            name: "Inscritos",
            y: parseInt(data.docentes.inscritos),
            sliced: true,
            selected: true,
            color: "#65D9AB",
          },

          {
            name: "En Revisión",
            y: parseInt(data.docentes.cancelados),
            color: "#FF5880",
          },
        ],
      },
    ],
  };
  return res;
}

export function buildSostenedoresParticipantes(setup, data) {
  const res = {
    ...setup,
    title: {
      ...setup.title,
      number: data.total.sostenedores,
      text: numberFormatter(data.total.sostenedores),
    },
    series: [
      {
        name: "Sostenedores",
        colorByPoint: true,
        data: [
          {
            name: "Sin ingreso",
            y: parseInt(data.sostenedores.sin_ingreso),
            sliced: true,
            selected: true,
            color: "#FF5880",
          },
          {
            name: "Con ingreso sin docentes inscritos",
            y: parseInt(data.sostenedores.con_ingreso_sin_docentes),
            color: "#FF8E53",
          },
          {
            name: "Inscripción iniciada",
            y: parseInt(data.sostenedores.inscripcion_iniciada),
            color: "#65D9AB",
          },
          {
            name: "Sin docentes pendientes",
            y: parseInt(data.sostenedores.sin_docentes_pendientes),
            color: "#8FB8FF",
          },
        ],
      },
    ],
  };
  return res;
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
          }">Total: </span> <b>${arrTotal[index]}</b>`;
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
        name: "Porcentaje avance 2023",
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
