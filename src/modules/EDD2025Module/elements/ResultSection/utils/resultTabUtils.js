import { numberFormatter } from "../../../../../utils/NumberFormatter";

/**
 * Formatea un gráfico diario con una o múltiples series de datos.
 */
function buildGraficoDiarioMultipleSeries(seriesData, fechas) {
  const series = seriesData.map((serie) => ({
    color: serie.color,
    name: serie.name,
    data: serie.valores,
  }));

  const total = seriesData.reduce(
    (acc, serie) =>
      acc + serie.valores.reduce((sum, val) => sum + (parseInt(val) || 0), 0),
    0
  );

  return {
    series,
    total: {
      numeric: total,
      text: numberFormatter(total),
    },
    override: {
      xAxis: {
        type: "category",
        categories: fechas,
        title: {
          text: "Fecha",
          style: {
            fontWeight: "bold",
            fontSize: "18px",
            color: "#666666",
          },
        },
      },
      yAxis: {
        title: {
          enabled: false,
        },
        labels: {
          format: "{value}",
        },
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
        },
      },
    },
  };
}

export function buildInformesIndividualesDiario(data) {
  return buildGraficoDiarioMultipleSeries(data.series, data.fechas || []);
}

export function buildInformesDirectorDiario(data) {
  return buildGraficoDiarioMultipleSeries(data.series, data.fechas || []);
}

export function buildInformesSostenedorDiario(data) {
  return buildGraficoDiarioMultipleSeries(data.series, data.fechas || []);
}

export function buildInformesNacionalDiario(data) {
  return buildGraficoDiarioMultipleSeries(data.series, data.fechas || []);
}
