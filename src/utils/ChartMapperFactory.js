import { numberFormatter } from "./NumberFormatter";

export function PieMapper(currentSetup, data, mapSpec) {
  const total = mapSpec.reduce((total, item) => {
    if (item.skip) {
      return total;
    }
    return total + parseInt(data[item.key]);
  }, 0);
  const seriesData = mapSpec.map((item) => ({
    name: item.name,
    y: parseInt(data[item.key]),
    color: item.color,
    sliced: item.sliced || false,
    selected: item.selected || false,
  }));

  return {
    ...currentSetup,
    title: {
      ...currentSetup.title,
      number: total,
      text: numberFormatter(total),
    },
    series: [
      {
        ...currentSetup.series[0],
        data: seriesData,
      },
    ],
  };
}
