import { numberFormatter } from "./NumberFormatter";

export function mapPieData(data, mapSpec) {
  const series = mapSpec.series || [];
  let total = mapSpec.total_key ? parseInt(data[mapSpec.total_key]) : null;
  if (!total) {
    total = series.reduce((total, item) => {
      if (item.skip) {
        return total;
      }
      return total + parseInt(data[item.key]);
    }, 0);
  }
  const seriesData = series.map((item) => ({
    name: item.name,
    y: parseInt(data[item.key]),
    color: item.color,
    sliced: item.sliced || false,
    selected: item.selected || false,
  }));

  return {
    series: seriesData,
    total: {
      numeric: total,
      text: numberFormatter(total),
    }
  };
}
export function mapLineData(rawData, config) {
    const fechas = rawData[config.fechas];

    const series = config.series.map(serie => ({
        name: serie.name,
        color: serie.color,
        data: rawData[serie.data]
    }));

    return { fechas, series };
}
export function mapLineDataBuild(rawData, config) {
    const fechas = rawData[config.fechas];

    const series = config.series.map(serie => ({
        name: serie.name,
        color: serie.color,
        valores: rawData[serie.data] // ✅ clave correcta
    }));

    return { fechas, series };
}


