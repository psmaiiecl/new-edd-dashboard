import { numberFormatter } from "../../../../../utils/NumberFormatter";

export function buildEquivalencias(data) {
  const categories = Object.keys(data).filter((key) => key !== "total");

  const seriesData = categories.map((key) => {
    return data[key];
  });

  return {
    series: [
      {
        name: "Docentes",
        data: seriesData,
      },
    ],
    total: {
      numeric: data?.total ?? 0,
      text: numberFormatter(data?.total ?? 0),
    },
    override: {
      xAxis: {
        categories: categories,
        labels: {
          style: {
            fontSize: "11px",
          },
        },
      },
      yAxis: {
        min: 0,
        allowOverlap: true,
        title: {
          enabled: false,
        },
        labels: {
          format: "{value}",
          style: {
            fontSize: "11px",
          },
        },
      },
      plotOptions: {
        series: {
          stacking: null,
        },
        bar: {
          allowPointSelect: false,
          cursor: "pointer",
          dataLabels: {
            enabled: false,
            format: "<b>{point.y:.,.0f}</b>",
            color: "#000000",
            style: {
              fontSize: "13px",
              textOutline: "none",
              color: "#666666",
            },
          },
        },
      },
      tooltip: {
        pointFormat:
          '<span style="font-size:13px;"><span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b></span><br/>',
        shared: true,
      },
    },
  };
}

export function buildAvanceConvocatoria(data) {
  const fechas = data?.fechas || [];

  const seriesConfig = [
    {
      name: "Lista espera",
      key: "lista_espera",
      color: "#ffc710ff",
    },
    {
      name: "Seleccionado",
      key: "seleccionado",
      color: "#5b9bd5",
    },
    {
      name: "No participa",
      key: "no_participa",
      color: "#ff5880",
    },
    {
      name: "Preseleccionado",
      key: "preseleccionado",
      color: "#c5a8ff",
    },
    {
      name: "Con respaldo",
      key: "con_respaldo",
      color: "#b2de95",
    },
    {
      name: "Pendiente",
      key: "pendiente",
      color: "#c9c9c9ff",
    },
  ];

  return {
    override: {
      chart: {
        type: "area",
      },
      lang: {
        decimalPoint: ",",
        thousandsSep: ".",
      },
      plotOptions: {
        area: {
          stacking: "normal",
          marker: {
            enabled: false,
          },
        },
      },
      xAxis: {
        categories: fechas,
      },
    },
    series: seriesConfig.map((cfg) => ({
      name: cfg.name,
      data: data?.[cfg.key] || [],
      color: cfg.color,
    })),
  };
}
