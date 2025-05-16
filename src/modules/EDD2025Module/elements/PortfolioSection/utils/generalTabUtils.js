import { numberFormatter } from "../../../../../utils/NumberFormatter";

export function  buildDocentesValidados(setup, data) {
  const res = {
    ...setup,
    title: {
      ...setup.title,
      number: data.docentes.total_validados,
      text: numberFormatter(data.docentes.total_validados),
    },
    series: [
      {
        ...setup.series[0],
        data: [
          {
            ...setup.series[0].data[0],
            y: parseInt(data.docentes.rinden_portafolio),
          },

          {
            ...setup.series[0].data[1],
            y: parseInt(data.docentes.no_rinden_portafolio),
          },
          {
            ...setup.series[0].data[2],
            y: parseInt(data.docentes.suspendidos),
          },
        ],
      },
    ],
  };
  return res;
}
