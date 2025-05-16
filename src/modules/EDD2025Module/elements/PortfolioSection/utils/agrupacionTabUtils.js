import { numberFormatter } from "../../../../../utils/NumberFormatter";

export function buildDocentesParticipantes(setup, data) {
  const res = {
    ...setup,
    title: {
      ...setup.title,
      number: data.total.docentes,
      text: numberFormatter(data.total.docentes),
    },
    series: [
      {
        ...setup.series[0],
        data: [
          {
            ...setup.series[0].data[0],
            y: parseInt(data.docentes.inscritos),
          },

          {
            ...setup.series[0].data[1],
            y: parseInt(data.docentes.desinscritos),
          },
          {
            ...setup.series[0].data[2],
            y: parseInt(data.docentes.pendientes),
          },
        ],
      },
    ],
  };
  return res;
}
export function buildAvancePortfolio(setup, data) {
  const total =
    parseInt(data.docentes.inscritos) +
    parseInt(data.docentes["en_revision"]) +
    parseInt(data.docentes["no_inscritos"]);
  const res = {
    ...setup,
    title: {
      ...setup.title,
      number: total,
      text: numberFormatter(total),
    },
    series: [
      {
        ...setup.series[0],
        data: [
          {
            ...setup.series[0].data[0],
            y: parseInt(data.docentes.inscritos),
          },

          {
            ...setup.series[0].data[1],
            y: parseInt(data.docentes["en_revision"]),
          },
          {
            ...setup.series[0].data[2],
            y: parseInt(data.docentes["no_inscritos"]),
          },
        ],
      },
    ],
  };
  return res;
}
export function buildSostenedoresPortfolio(setup, data) {
  const total =
    parseInt(data.docentes.inscritos) + parseInt(data.docentes.cancelados);
  const res = {
    ...setup,
    title: {
      ...setup.title,
      number: total,
      text: numberFormatter(total),
    },
    series: [
      {
        ...setup.series[0],
        data: [
          {
            ...setup.series[0].data[0],
            y: parseInt(data.docentes.inscritos),
          },
          {
            ...setup.series[0].data[1],
            y: parseInt(data.docentes.cancelados),
          },
        ],
      },
    ],
  };
  return res;
}

