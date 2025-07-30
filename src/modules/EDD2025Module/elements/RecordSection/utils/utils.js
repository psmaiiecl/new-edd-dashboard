import { numberFormatter } from "../../../../../utils/NumberFormatter";
import { extractCTGInfo } from "../../../../../utils/StringUtils";

export function buildAvanceDiarioGrabaciones(data) {
  const fechas = data?.fechas || [];
  const aGrabar = data?.a_grabar || [];
  const agendados = data?.agendados || [];
  const grabados = data?.grabados || [];
  const pospuestos = data?.pospuestos || [];
  const res = {
    override: {
      tooltip: {
        pointFormatter: function () {
          return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${this.y}</b><br/>`;
        },
      },
      yAxis: {
        labels: {
          formatter: function () {
            return `${this.value}`;
          },
        },
      },
      xAxis: {
        categories: fechas,
      },
    },
    series: [
      {
        name: "Docentes a Grabar",
        data: aGrabar,
        color: "#b2de95",
        marker: {
          enabled: false,
        },
      },
      {
        name: "Avance Agendamiento Grabaciones",
        data: agendados,
        color: "#5b9bd5",
        marker: {
          enabled: false,
        },
      },
      {
        name: "Avance Grabaciones Reportadas",
        data: grabados,
        color: "#c5a8ff",
        marker: {
          enabled: false,
        },
      },
      {
        name: "Pospuestos",
        data: pospuestos,
        color: "#ff5880",
        marker: {
          enabled: false,
        },
      },
    ],
  };
  return res;
}

export function buildGrabacionesSemanales(data) {
  const semanas = data?.semanas || [];
  const avanceReal = data?.avance_real || [];
  const avanceEsperado = data?.avance_esperado || [];
  const proyectado = data?.agendamiento_proyectado || [];
  const res = {
    override: {
      tooltip: {
        pointFormatter: function () {
          return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${this.y}</b><br/>`;
        },
      },
      yAxis: {
        labels: {
          formatter: function () {
            return `${this.value}`;
          },
        },
      },
      xAxis: {
        categories: semanas,
      },
    },
    series: [
      {
        name: "Avance Real",
        data: avanceReal,
        color: "#b2de95",
      },
      {
        name: "Avance Esperado",
        data: avanceEsperado,
        color: "#5b9bd5",
      },
      {
        name: "Proyección Grabaciones Necesarias",
        data: proyectado,
        color: "#ffbc2cff",
      },
    ],
  };
  return res;
}

export function mapChartData(data, specs) {
  let categories = data[specs.categories.key] ?? [];
  categories = categories.map((item) => {
    const ctgSeparado = extractCTGInfo(item);
    return ctgSeparado.region + " - " + ctgSeparado.nombre;
  });
  let total = 0;
  const series = specs.series.map(({ name, color, key }) => {
    const serieData = data[key] || [];
    total += serieData.reduce((total, num) => total + parseInt(num), 0);
    return {
      name,
      color,
      data: serieData,
    };
  });
  return {
    series,
    total: {
      numeric: total,
      text: numberFormatter(total),
    },
    override: {
      xAxis: {
        categories: categories,
        labels: {
          enabled: specs.categories.labels ?? true,
          style: {
            fontSize: "11px",
          },
        },
      },
    },
  };
}

export function mapTableData(data, specs) {
  const categories = data[specs.categoriesKey] ?? [];
  const rows = [];

  for (let i = 0; i < categories.length; i++) {
    const rawCategory = categories[i];
    let parsed = { rawCategory };

    if (specs.rowParser) {
      parsed = specs.rowParser(rawCategory);
    }

    const values = {};
    const totals = {};
    const avances = {};

    for (const col of specs.columns) {
      const { label, series = [] } = col;
      let total = 0;

      values[label] = {};

      for (const serie of series) {
        const key = serie.key;
        const val = parseInt(data[key]?.[i] ?? 0);
        values[label][serie.name] = {
          value: numberFormatter(val),
          raw: val,
        };
        total += val;
      }

      totals[label] = numberFormatter(total);

      const grabadosSerie = series.find(
        (s) => s.name === "Grabados" || s.name === "EE con grabación terminada"
      );
      const grabadosVal = grabadosSerie
        ? parseInt(data[grabadosSerie.key]?.[i] ?? 0)
        : 0;

      const avance = total > 0 ? (grabadosVal / total) * 100 : 0;
      avances[label] = numberFormatter(avance.toFixed(1));
    }

    rows.push({
      ...parsed,
      values,
      totals,
      avance: avances,
    });
  }

  return {
    rows,
    columns: specs.columns,
  };
}

export function getColorForAvance(value) {
  const num = parseFloat(value);
  if (isNaN(num)) return "#ccc";
  if (num < 50) return "#FF4D4F";
  if (num < 100) return "#FFD153";
  return "#52C41A";
}
