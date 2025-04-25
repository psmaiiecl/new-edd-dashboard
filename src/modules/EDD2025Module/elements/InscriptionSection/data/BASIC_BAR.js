export const BASIC_BAR = {
  chart: {
    type: "bar",
    plotBorderWidth: null,
    plotShadow: false,
    plotBackgroundColor: null,
    marginTop: 120,
    height: 600,
    // width: 1000,
  },
  title: {
    text: 0,
    align: "center",
    style: {
      fontWeight: "bold",
      color: "#5157FF",
      fontSize: "35px",
    },
  },
  legend: {
    itemStyle: {
      fontSize: "13px",
    },
    y: 20,
    margin: 40,
  },

  yAxis: {
    min: 0,
    max: 100,
    allowOverlap: true,
    title: {
      enabled: false,
    },
    labels: {
      format: "{value}%",
      style: {
        fontSize: "11px",
      },
    },
    tickInterval: 10,
  },
  xAxis: {
    categories: [],
    labels: {
      style: {
        fontSize: "11px",
      },
    },
  },
  tooltip: {
    pointFormat:
      '<span style="font-size:13px;"><span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)</span><br/>',
    shared: true,
  },
  plotOptions: {
    bar: {
      stacking: "percent",
      allowPointSelect: false,
      cursor: "pointer",
      dataLabels: {
        enabled: false,
        format: "<b>{point.y:.,.0f} </b> ({point.percentage:.0f}%)<br/>",
        color: "#000000",
        style: {
          fontSize: "13px",
          textOutline: "none",
          color: "#666666",
        },
      },
    },
  },
  credits: {
    enabled: false,
  },
};
