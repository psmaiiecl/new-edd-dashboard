export const BASIC_PIE = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
    marginTop: 120,
    marginBottom: 80,
    height: 510,
  },
  title: {
    text: "Total",
    align: "center",
    style: {
      fontWeight: "bold",
      color: "#5157FF",
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
  },
  credits: {
    enabled: false,
  },
};
