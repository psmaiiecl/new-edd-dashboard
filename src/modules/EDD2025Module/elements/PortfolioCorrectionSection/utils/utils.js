export function buildTablaCorreccionPortafolios() {}

export function buildGraficoCD(data, module) {
  let anioComparacion = 2024;
  // if (module == "Módulo 2") {
  //   anioComparacion = 2022;
  // }
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
            } else if (point.series.name.includes("2025")) {
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
                    <b style="color: #ff8422;">Total C+D 2025</b> = ${total2024}
                `;
        },
      },
    },
    series: data.series ?? [],
  };
}

export function buildGraficoCohen(data, module) {
  let anioComparacion = 2024;

  let categ = data.categ;
  let d_cohen = data.d_cohen;
  let media2023 = data.media2024;
  let media2024 = data.media2025;

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
        name: "2025",
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
        name: `Comparación ${anioComparacion}-2025`,
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

export function buildTablaComparacion(data) {
  const categories = data.categories;
  const series = data.series;

  const c2024 = series.find((s) => s.name === "C-2024")?.data ?? [];
  const d2024 = series.find((s) => s.name === "D-2024")?.data ?? [];
  const c2025 = series.find((s) => s.name === "C-2025")?.data ?? [];
  const d2025 = series.find((s) => s.name === "D-2025")?.data ?? [];

  const rows = categories.map((cat, i) => {
    const total2024 = (c2024[i] ?? 0) + (d2024[i] ?? 0);
    const total2025 = (c2025[i] ?? 0) + (d2025[i] ?? 0);

    const v2024 = Number(total2024.toFixed(1));
    const v2025 = Number(total2025.toFixed(1));
    const diffValue = Number((total2025 - total2024).toFixed(1));

    const sinBase = v2024 === 0;

    return {
      indicador: cat,
      v2025,
      v2024: sinBase ? "-" : v2024,
      diff: sinBase ? "-" : diffValue,
      paint: !sinBase && (diffValue > 10 || diffValue < -10),
    };
  });

  rows.push({
    indicador: "Total evidencias corregidas",
    v2025: data.totales2025?.[0] ?? 0,
    v2024: data.totales2024?.[0] ?? 0,
    diff: "",
  });

  return {
    rows: rows,
    columns: [
      { key: "indicador", label: "Indicador" },
      { key: "v2025", label: "2025", color: "#ff8422" },
      { key: "v2024", label: "2024", color: "#2d8cff" },
      { key: "diff", label: "Diferencia" },
    ],
  };
}

export function buildTablaCohen(data) {
  const rows = data.categ.map((c, i) => {
    const m2024 = data.media2024[i] ?? 0;
    const m2025 = data.media2025[i] ?? 0;

    return {
      indicador: `I${c}`,
      dcohen: Number((data.d_cohen[i] ?? 0).toFixed(2)),
      v2025: Number(m2025.toFixed(2)),
      v2024: Number(m2024.toFixed(2)),
      diff: Number((m2025 - m2024).toFixed(2)),
    };
  });

  rows.push({
    indicador: "Total evidencias corregidas",
    dcohen: "",
    v2025: data.total2025?.[0] ?? 0,
    v2024: data.total2024?.[0] ?? 0,
    diff: "",
  });

  return {
    rows: rows,
    columns: [
      { key: "indicador", label: "Indicador" },
      { key: "dcohen", label: "D de Cohen", color: "#FFC72A" },
      { key: "v2025", label: "2025", color: "#ff8422" },
      { key: "v2024", label: "2024", color: "#2d8cff" },
      { key: "diff", label: "Diferencia" },
    ],
  };
}

export function buildTablaComparacionIA(data) {
  const categories = data.categories;
  const series = data.series;

  const cia = series.find((s) => s.name === "C-ia")?.data ?? [];
  const dia = series.find((s) => s.name === "D-ia")?.data ?? [];
  const c2025 = series.find((s) => s.name === "C-2025")?.data ?? [];
  const d2025 = series.find((s) => s.name === "D-2025")?.data ?? [];

  const rows = categories.map((cat, i) => {
    const totalia = (cia[i] ?? 0) + (dia[i] ?? 0);
    const total2025 = (c2025[i] ?? 0) + (d2025[i] ?? 0);

    const via = Number(totalia.toFixed(1));
    const v2025 = Number(total2025.toFixed(1));
    const diffValue = Number((total2025 - totalia).toFixed(1));

    const sinBase = via === 0;

    return {
      indicador: cat,
      v2025,
      via: sinBase ? "-" : via,
      diff: sinBase ? "-" : diffValue,
      paint: !sinBase && (diffValue > 10 || diffValue < -10),
    };
  });

  rows.push({
    indicador: "Total evidencias corregidas",
    v2025: data.totales2025?.[0] ?? 0,
    via: data.totalesia?.[0] ?? 0,
    diff: "",
  });

  return {
    rows: rows,
    columns: [
      { key: "indicador", label: "Indicador" },
      { key: "v2025", label: "2025", color: "#ff8422" },
      { key: "via", label: "IA", color: "#2d8cff" },
      { key: "diff", label: "Diferencia" },
    ],
  };
}

export function buildGraficoCohenIA(data, module) {
  let anioComparacion = 'IA';

  let categ = data.categ;
  let d_cohen = data.d_cohen;
  let media2023 = data.mediaia;
  let media2024 = data.media2025;

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
        name: "2025",
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
        name: `Comparación ${anioComparacion}-2025`,
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

export function buildTablaCohenIA(data) {
  const rows = data.categ.map((c, i) => {
    const mia = data.mediaia[i] ?? 0;
    const m2025 = data.media2025[i] ?? 0;

    return {
      indicador: `I${c}`,
      dcohen: Number((data.d_cohen[i] ?? 0).toFixed(2)),
      v2025: Number(m2025.toFixed(2)),
      via: Number(mia.toFixed(2)),
      diff: Number((m2025 - mia).toFixed(2)),
    };
  });

  rows.push({
    indicador: "Total evidencias corregidas",
    dcohen: "",
    v2025: data.total2025?.[0] ?? 0,
    via: data.totalia?.[0] ?? 0,
    diff: "",
  });

  return {
    rows: rows,
    columns: [
      { key: "indicador", label: "Indicador" },
      { key: "dcohen", label: "D de Cohen", color: "#FFC72A" },
      { key: "v2025", label: "2025", color: "#ff8422" },
      { key: "via", label: "IA", color: "#2d8cff" },
      { key: "diff", label: "Diferencia" },
    ],
  };
}

//MONITOREO DISTRIBUCION DE INDICADORES

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

export function formatDataForTable(tabla) {
  if (!tabla) {
    return { anioActual: null, anioComparacion: null, rows: [] };
  }

  const {
    anio_actual: anioActual,
    anio_comparacion: anioComparacion,
    data_actual: dataActual = {},
    data_comparacion: dataComparacion = {},
  } = tabla;

  const totalPrev = Number(dataComparacion.total) || 0;
  const totalCurr = Number(dataActual.total) || 0;

  const sinCcPrev = Number(dataComparacion.cat_sincc) || 0;
  const sinCcCurr = Number(dataActual.cat_sincc) || 0;

  const corregidosPrev = totalPrev - sinCcPrev;
  const corregidosCurr = totalCurr - sinCcCurr;

  const safePct = (value, total) => {
    const v = Number(value) || 0;
    const t = Number(total) || 0;
    if (!t) return "0.00%";
    return ((v / t) * 100).toFixed(2) + "%";
  };

  const categorias = ["a", "b", "c", "d", "e"];

  const rows = categorias.map((cat) => {
    const key = `cat_${cat}`;

    const prevVal = Number(dataComparacion[key]) || 0;
    const currVal = Number(dataActual[key]) || 0;

    return {
      categoria: cat.toUpperCase(),
      prev: prevVal,
      // prevPct: safePct(prevVal, totalPrev),
      prevPct: safePct(prevVal, corregidosPrev),
      curr: currVal,
      // currPct: safePct(currVal, totalCurr),
      currPct: safePct(currVal, corregidosCurr),
    };
  });

  rows.push({
    border: true,
    bold: true,
    categoria: "Total Corregidos",
    prev: corregidosPrev,
    // prevPct: safePct(corregidosPrev, totalPrev),
    prevPct: safePct(corregidosPrev, corregidosPrev),
    curr: corregidosCurr,
    // currPct: safePct(corregidosCurr, totalCurr),
    currPct: safePct(corregidosCurr, corregidosCurr),
  });

  rows.push({
    bold: true,
    categoria: "Total Portafolios",
    prev: totalPrev,
    prevPct: totalPrev ? "100.00%" : "0.00%",
    curr: totalCurr,
    currPct: totalCurr ? "100.00%" : "0.00%",
  });

  return { anioActual, anioComparacion, rows };
}
