export const MODULE_CHART_SETUP = {
    chart: {
      type: "pie",
      height: 260,
      backgroundColor: "transparent"
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
          enabled: false,
        },
        showInLegend: true,
      },
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:12px" class="fw-semibold">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b> ({point.percentage:.0f}%)</td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
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
  }