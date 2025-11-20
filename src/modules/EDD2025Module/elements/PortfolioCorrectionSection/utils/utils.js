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

export function getModuloIndices(dataset, moduloKey) {
  const años = Object.keys(dataset || {});
  const set = new Set();
  años.forEach((año) => {
    const y = dataset[año] || {};
    ["i", "b", "c", "d"].forEach((g) => {
      const mod = y[g]?.[moduloKey] || {};
      Object.keys(mod).forEach((k) => set.add(String(k)));
    });
  });
  return Array.from(set)
    .map(Number)
    .sort((a, b) => a - b);
}

export function safeVal(v) {
  if (v === null || v === undefined) return null;
  const r = Math.round(v * 10) / 10;
  return r === 0 ? 0 : r;
}

export function getVal(dataset, año, grupo, moduloKey, indice) {
  const raw = dataset?.[año]?.[grupo]?.[moduloKey]?.[String(indice)];
  return raw === undefined ? null : safeVal(raw);
}

export function getCD(dataset, año, moduloKey, indices) {
  const out = {};
  indices.forEach((i) => {
    const c = getVal(dataset, año, "c", moduloKey, i) ?? 0;
    const d = getVal(dataset, año, "d", moduloKey, i) ?? 0;
    out[i] = safeVal(c + d);
  });
  return out;
}

export function getDif24vs23(cd2024, cd2023, indices) {
  const out = {};
  indices.forEach((i) => {
    const v24 = cd2024[i] ?? 0;
    const v23 = cd2023[i] ?? 0;
    out[i] = safeVal(v24 - v23);
  });
  return out;
}

export function shouldHighlightDiff(v, umbralAbs = 10) {
  if (v === null || v === undefined) return false;
  return Math.abs(v) >= umbralAbs;
}

export function formatDataForTable(data) {
  if (!data) return [];

  const categorias = ["a", "b", "c", "d", "e"];
  const result = categorias.map((cat) => {
    const cat23 = data[`cat23_${cat}`] || 0;
    const cat24 = data[`cat24_${cat}`] || 0;
    const pct23 = ((cat23 / data.total_2023) * 100).toFixed(2);
    const pct24 = ((cat24 / data.total_2024) * 100).toFixed(2);

    return {
      categoria: cat.toUpperCase(),
      cat23,
      pct23,
      cat24,
      pct24,
    };
  });

  // opcional: agregar sin cc o totales
  result.push({
    categoria: "Total Portafolios",
    cat23: data.total_2023,
    pct23: "100.00",
    cat24: data.total_2024,
    pct24: "100.00",
  });

  return result;
}
