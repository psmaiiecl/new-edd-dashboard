import { numberFormatter } from "../utils/NumberFormatter";

const BASE_CHART_CONFIG = {
  lang: {
    decimalPoint: ",",
    thousandsSep: ".",
  },
  credits: {
    enabled: false,
  },
};

export const PIE_CONFIG = {
  ...BASE_CHART_CONFIG,
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
    marginTop: 100,
    marginBottom: 80,
    // height: 510,
    height: 410,
  },
  legend: {
    layout: "horizontal",
    //itemWidth: 120,
    align: "center",
    enabled: true,
    verticalAlign: "top",
    x: 0,
    // y: 350,
    y: 250,

    itemStyle: {
      fontSize: "12px",
    },
    navigation: {
      enabled: true,
    },
  },
  title: {
    text: "TOTAL",
    align: "center",
    style: {
      fontWeight: "bold",
      color: "var(--blue-100)",
      fontSize: "35px",
    },
  },
  subtitle: {
    text: "PIE CHART",
    align: "center",
    style: {
      fontSize: "15px",
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
      size: "70%",
      dataLabels: {
        enabled: true,
        // distance: 20,
        distance: 15,
        format:
          "<b>{point.name}</b>: <b>{point.y:.,.0f} </b> ({point.percentage:.0f}%)<br/>",
        style: {
          fontSize: "13px",
          fontWeight: "400",
          color: "#666666",
        },
        overflow: "allow",
      },
      showInLegend: true,
    },
  },
  series: [],
};

export const DOT_CONFIG = {
  ...BASE_CHART_CONFIG,
  chart: {
    align: "left",
  },
  title: {
    text: "DOTTED LINE CHART",
    align: "center",
    style: {
      fontWeight: "300",
      fontSize: "15px",
      color: "#666666",
    },
  },
  plotOptions: {
    series: {
      color: "#FFA500",
      label: {
        connectorAllowed: false,
      },
    },
  },
  yAxis: {
    title: {
      enabled: false,
    },
    labels: {
      format: "{value}%",
    },
  },
  series: [],
};

export const BAR_CONFIG = {
  ...BASE_CHART_CONFIG,
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
    text: "TOTAL",
    align: "center",
    style: {
      fontWeight: "bold",
      color: "var(--blue-100)",
      fontSize: "35px",
    },
  },
  subtitle: {
    text: "BAR CHART",
    align: "center",
    style: {
      fontSize: "15px",
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
  series: [],
};

export const POINT_CONFIG = {
  chart: {
    type: "line",
  },
  legend: {
    itemMarginTop: 3,
    align: "right",
    verticalAlign: "top",
    layout: "vertical",
    x: 5,
    y: 100,
  },
  title: {
    //text: 'AGENDAMIENTO ACUMULADO',
    align: "center",
    style: {
      fontWeight: "bold",
      fontSize: "18px",
      color: "#666666",
    },
  },
  tooltip: {
    valueSuffix: "",
  },
  plotOptions: {
    column: {
      pointPadding: 0,
      borderWidth: 0,
    },
  },
};

export const STACK_BAR_CONFIG = {
  lang: {
    decimalPoint: ",",
    thousandsSep: ".",
  },
  chart: {
    type: "column",
    //height: 500,
    // style: {
    //   color: "#333333",
    //   fontSize: "15px",
    //   fontWeight: "bold",
    // },
  },
  colors: [
    "#165e84",
    "#e87131",
    "#196b23",
    "#0e9ed7",
    "#9e2b96",
    "#ff3f3f",
    "#ff3f3f",
  ],
  title: {
    //text: "AGENDAMIENTO PARA CADA SEMANA",
    align: "center",
    style: {
      fontWeight: "bold",
      fontSize: "18px",
      color: "#666666",
    },
  },
  xAxis: {},
  yAxis: {
    min: 0,
    title: {
      text: "",
    },
    labels: {
      formatter: function () {
        return numberFormatter(this.value);
      },
    },
    stackLabels: {
      enabled: true,
      style: {
        fontWeight: "bold",
        fontSize: "13px",
        color: "#333333",
        textOutline: "none",
      },

      formatter: function () {
        return numberFormatter(this.total);
      },
    },
  },
  legend: {},
  tooltip: {
    valueSuffix: "",
  },
  plotOptions: {
    column: {
      stacking: "normal",
      dataLabels: {
        enabled: false,
      },
    },
  },
  series: [],
  credits: {
    enabled: false,
  },
};

export const MULTIPLE_BAR_CONFIG = {
  lang: {
    decimalPoint: ",",
    thousandsSep: ".",
  },
  chart: {
    type: "column",
  },
  legend: {
    itemMarginTop: 3,
    align: "right",
    verticalAlign: "top",
    layout: "vertical",
    x: 5,
    y: 100,
  },
  title: {
    //text: 'AGENDAMIENTO SEMANAL',
    align: "center",
    style: {
      fontWeight: "bold",
      fontSize: "18px",
      color: "#666666",
    },
  },
  subtitle: {
    text: "",
  },
  xAxis: {
    crosshair: true,
  },
  tooltip: {
    valueSuffix: "",
  },
  plotOptions: {
    column: {
      pointPadding: 0,
      borderWidth: 0,
    },
  },
};

export const LINE_CONFIG = {};

export const AREA_CONFIG = {};
