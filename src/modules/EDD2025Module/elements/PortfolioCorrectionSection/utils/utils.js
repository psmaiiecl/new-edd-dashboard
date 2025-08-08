export function buildTablaCorreccionPortafolios() {}

export function buildGraficoCD(data, module) {
  let anioComparacion = 2023;
  if (module == "Módulo 2") {
    anioComparacion = 2022;
  }
  return {
    override: {
      subtitle: {
        text: "Comparación de % C+D por indicador " + module,
      },
      yAxis: {
        tickInterval: 20,
        title: { text: "" },
        stackLabels: {
          enabled: true,
        },
      },
      xAxis: {
        categories: data.categories,
        title: { text: "INDICADOR" },
      },
      plotOptions: {
        column: {
          stacking: "normal",
          dataLabels: {
            enabled: true,
            format: "{point.y}",
            style: {
              fontSize: "10px",
            },
            textOutline: "none",
          },
        },
      },
      tooltip: {
        shared: true,
        formatter: function () {
          let total2023 = 0;
          let total2024 = 0;
          let detalles2023 = "";
          let detalles2024 = "";
          this.points.forEach(function (point) {
            //if (point.series.name.includes('2023')) {
            if (point.series.name.includes(anioComparacion)) {
              total2023 += point.y;
              detalles2023 += `<span style="font-size:13px;color:${point.color}"> \u25CF</span> ${point.series.name}: <b>${point.y}</b><br/>`;
            } else if (point.series.name.includes("2024")) {
              total2024 += point.y;
              detalles2024 += `<span style="font-size:13px;color:${point.color}"> \u25CF</span> ${point.series.name}: <b>${point.y}</b><br/>`;
            }
          });
          total2023 = total2023.toFixed(1);
          total2024 = total2024.toFixed(1);
          return `
                    <b>${this.x}</b><br/>
                    ${detalles2023}
                    <b style="color: #2d8cff;">Total C+D ${anioComparacion}</b> = ${total2023}<br/><br/>
                    ${detalles2024}
                    <b style="color: #ff8422;">Total C+D 2024</b> = ${total2024}
                `;
        },
      },
    },
    series: data.series ?? [],
  };
}

export function buildGraficoCohen(data, module) {
  let anioComparacion = 2023;
  if (module == "Módulo 2") {
    anioComparacion = 2022;
  }

  let categ = data.categ;
  let d_cohen = data.d_cohen;
  let media2023 = data.media2023;
  let media2024 = data.media2024;

  const lineasVerticales = categ.flatMap((_, i) => [
    { x: i, y: media2023[i] },
    { x: i, y: media2024[i] },
    // { x: null, y: null },
    null,
  ]);

  return {
    chart: { zoomType: "xy" },
    title: {
      text: module,
      align: "center",
      style: {
        fontWeight: "300",
        fontSize: "15px",
        color: "#666666",
      },
    },
    subtitle: {
      text: "Comparación de promedios de puntaje por indicador General",
    },
    xAxis: {
      categories: categ,
      crosshair: true,
      title: { text: "INDICADOR" },
    },
    yAxis: {
      max: 4,
      title: null,
      tickInterval: 0.15,
    },
    tooltip: { shared: true },
    legend: { align: "center", verticalAlign: "bottom" },
    series: [
      {
        name: "D de Cohen",
        type: "column",
        color: "gold",
        data: d_cohen.map((v) => v),
        tooltip: {
          pointFormatter: function () {
            return `<span style="color:${
              this.color
            }">\u25CF</span> D de Cohen: ${this.y.toFixed(2)}<br/>`;
          },
        },
      },
      {
        name: "2024",
        type: "scatter",
        color: "red",
        marker: { symbol: "circle", radius: 5 },
        data: media2024,
      },
      {
        name: anioComparacion,
        type: "scatter",
        color: "green",
        marker: { symbol: "circle", radius: 5 },
        data: media2023,
      },
      {
        name: `Comparación ${anioComparacion}-2024`,
        type: "line",
        color: "gray",
        lineWidth: 1,
        pointPlacement: 0,
        marker: { enabled: false },
        enableMouseTracking: false,
        data: lineasVerticales,
      },
    ],
    lang: {
      decimalPoint: ",",
      thousandsSep: ".",
    },
    credits: {
      enabled: false,
    },
  };
}
