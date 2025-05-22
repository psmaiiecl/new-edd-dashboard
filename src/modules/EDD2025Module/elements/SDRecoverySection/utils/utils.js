import { numberFormatter } from "../../../../../utils/NumberFormatter";

export function buildSDRecoveryChart(setup, data) {
  const total =
    parseInt(data.agendado) +
    parseInt(data.en_docentemas) +
    parseInt(data.en_poder_director) +
    parseInt(data.en_poder_docente) +
    parseInt(data.en_poder_sostenedor) +
    parseInt(data.en_trayecto_docentemas) +
    //parseInt(data.grabado) +
    parseInt(data.sin_agendar);
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
            y: parseInt(data.en_docentemas),
          },

          {
            ...setup.series[0].data[1],
            y: parseInt(data.en_trayecto_docentemas),
          },
          {
            ...setup.series[0].data[2],
            y: parseInt(data.en_poder_sostenedor),
          },
          {
            ...setup.series[0].data[3],
            y: parseInt(data.en_poder_director),
          },
          {
            ...setup.series[0].data[4],
            y: parseInt(data.en_poder_docente),
          },
          {
            ...setup.series[0].data[5],
            y: parseInt(data.agendado),
          },
          {
            ...setup.series[0].data[6],
            y: parseInt(data.sin_agendar),
          },
        ],
      },
    ],
  };
  return res;
}
