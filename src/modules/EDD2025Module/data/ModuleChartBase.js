export const MODULE_CHART_SETUP = {
  lang: {
    decimalPoint: ",",
    thousandsSep: ".",
  },
  chart: {
    type: "pie",
    height: 260,
    backgroundColor: "transparent",
  },
  title: {
    text: "",
  },
  subtitle: {
    text: "",
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      shadow: false,
      center: ["50%", "50%"],
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        format:
          "<b>{point.name}</b>: <b>{point.y:.,.0f} </b> ({point.percentage:.0f}%)<br/>",
      },
      showInLegend: true,
    },
  },
  tooltip: {},
  series: [
    {
      name: "Cantidad",
      data: [],
      size: "90%",
      innerSize: "50%",
      id: "versions",
    },
  ],
  legend: {
    itemDistance: 1,
    itemStyle: {
      fontSize: "9px",
      fontWeight: "normal",
    },
  },
  accessibility: {
    enabled: false,
  },
  exporting: {
    enabled: false,
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 400,
        },
        chartOptions: {
          series: [
            {},
            {
              id: "versions",
              dataLabels: {
                enabled: false,
              },
            },
          ],
        },
      },
    ],
  },
};
