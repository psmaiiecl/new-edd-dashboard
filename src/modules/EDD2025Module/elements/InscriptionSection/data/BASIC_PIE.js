export const BASIC_PIE = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
    marginTop: 100,
    marginBottom: 80,
    height: 510,
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
      dataLabels: {
        enabled: true,
        format:
          "<b>{point.name}</b>: <b>{point.y:.,.0f} </b> ({point.percentage:.0f}%)<br/>",
        style: {
          fontSize: "13px",
          fontWeight: "400",
          color: "#666666",
        },
      },
      showInLegend: true,
    },
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
  credits: {
    enabled: false,
  },
};
