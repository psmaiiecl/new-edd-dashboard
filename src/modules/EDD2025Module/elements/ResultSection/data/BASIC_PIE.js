export const BASIC_PIE = {
   lang: {
    decimalPoint: ',',
    thousandsSep: '.'
  },
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
    marginTop: 100,
    marginBottom: 80,
    // height: 510,
  },
  legend: {
    enabled: true,
    verticalAlign: "top",
    x: 0,
    y: 350,

    itemStyle: {
      fontSize: "13px",
    },
    navigation: {
      enabled: true,
    },
  },
  title: {
    text: "Total",
    align: "center",
    style: {
      fontWeight: "bold",
      color: "var(--blue-100)",
      fontSize: "35px",
    },
  },
  tooltip: {
    pointFormat: "<b>{point.y}</b> ({point.percentage:.0f}%)<br/>",
    style: {
      fontSize: "13px",
      color: "#666666",
    },
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      size: '90%',
      dataLabels: {
        enabled: true,
        distance: 20,
        format:
          "<b>{point.name}</b>: <b>{point.y:.,.0f} </b> ({point.percentage:.0f}%)<br/>",
        style: {
          fontSize: "13px",
          fontWeight: "400",
          color: "#666666",
        },
        overflow:'allow'
      },
      showInLegend: true,
    },
  },
  credits: {
    enabled: false,
  },

  // responsive: {
  //   rules: [
  //     {
  //       condition: { maxWidth: 500 },
  //       chartOptions: {
  //         plotOptions: {
  //           // pie: {
  //           //   dataLabels: {
  //           //     enabled: false
  //           //   }
  //           // }
  //         },
  //         legend: {
  //           align: "center",
  //           verticalAlign: "bottom",
  //           layout: "horizontal",
  //         },
  //       },
  //     },
  //   ],
  // },
};
