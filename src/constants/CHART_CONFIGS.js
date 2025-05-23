import { numberFormatter } from "../utils/NumberFormatter";

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
    height: 510,
  },
  legend: {
    layout: "horizontal",
    //itemWidth: 120,
    align: "center",
    enabled: true,
    verticalAlign: "top",
    x: 0,
    y: 350,

    itemStyle: {
      fontSize: "12px",
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
      size: "70%",
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
        overflow: "allow",
      },
      showInLegend: true,
    },
  },
  credits: {
    enabled: false,
  },
};

export const STACK_BAR_CONFIG = {
  lang: {
    decimalPoint: ",",
    thousandsSep: ".",
  },
  chart: {
    type: "column",
    height: 500,
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
};

export const LINE_CONFIG = {};

export const POINT_CONFIG = {};

export const AREA_CONFIG = {};
