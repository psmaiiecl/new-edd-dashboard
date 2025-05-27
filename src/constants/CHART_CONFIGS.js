import { numberFormatter } from "../utils/NumberFormatter";

export const BASE_CHART_CONFIG = {
  lang: {
    decimalPoint: ",",
    thousandsSep: ".",
  },
  credits: {
    enabled: false,
  },
};

export const PIE_CONFIG = {
  lang: {
    decimalPoint: ",",
    thousandsSep: ".",
  },
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
  credits: {
    enabled: false,
  },
  series: [],
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
  credits: {
    enabled: false,
  },
};

export const LINE_CONFIG = {};

export const AREA_CONFIG = {};
