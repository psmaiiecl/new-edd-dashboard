export function buildEvolucionProcesamiento(data) {
  const fechas = data?.fechas || [];

  const grabacionRecibida = data?.CON_GRABACIONES_RECIBIDAS || [];
  const QACritico = data?.QA_CON_INCIDENCIAS_CRITICAS || [];
  const enPreQA = data?.EN_ESTADO_PRE_QA || [];
  const enQA = data?.EN_ESTADO_QA || [];
  const estadoOK = data?.QA_SIN_INCIDENCIAS || [];

  const res = {
    override: {
      chart: {
        type: "area",
      },
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
        name: "Grabaciones recibidas",
        data: grabacionRecibida,
        color: "#ff5880",
        marker: {
          enabled: false,
        },
      },
      {
        name: "En pre QA",
        data: enPreQA,
        color: "#ff8801ff",
        marker: {
          enabled: false,
        },
      },
      {
        name: "En QA",
        data: enQA,
        color: "#5b9bd5",
        marker: {
          enabled: false,
        },
      },
      {
        name: "QA con incidencias críticas",
        data: QACritico,
        color: "#c5a8ff",
        marker: {
          enabled: false,
        },
      },
      {
        name: "Revisión finalizada",
        data: estadoOK,
        color: "#b2de95",
        marker: {
          enabled: false,
        },
      },
    ],
  };
  return res;
}

function numberOrZero(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
}

export function mapGraphTable(dataset, config) {
  let categories = dataset[config.categoriesKey] || [];

  // si se pide invertir
  if (config.reverse) {
    categories = [...categories].reverse();
  }

  const out = {};

  // --- CHART ---
  if (config.type === "chart") {
    const series = (config.series || []).map((s) => {
      let data = (dataset[s.key] || []).map(numberOrZero);
      if (config.reverse) {
        data = [...data].reverse();
      }
      return {
        name: s.name,
        data,
        color: s.color,
        marker: s.marker || { enabled: false },
      };
    });

    out.chart = {
      override: {
        xAxis: { categories, ...(config.override?.xAxis || {}) },
        yAxis: { ...(config.override?.yAxis || {}) },
        tooltip: config.override?.tooltip,
      },
      series,
    };
  }

  // --- TABLE ---
  if (config.type === "table") {
    const cols = config.columns || [];
    const totalKeys = config.totalKeys || [];

    let totalGlobal = 0;

    const tableData = categories.map((fecha, i) => {
      const row = { fecha };
      for (const col of cols) {
        if (["fecha", "total", "porcentaje_avance"].includes(col.key)) continue;

        let arr = dataset[col.key] || [];
        if (config.reverse) {
          arr = [...arr].reverse();
        }

        row[col.key] = numberOrZero(arr[i] ?? 0);
      }

      const totalDia = totalKeys.reduce(
        (acc, k) => acc + numberOrZero(row[k]),
        0
      );
      row.total = totalDia;
      totalGlobal += totalDia;
      return row;
    });

    // porcentaje respecto del total global
    if (config.showPercentOfGlobal) {
      for (const row of tableData) {
        row.porcentaje_avance =
          totalGlobal > 0
            ? ((row.total / totalGlobal) * 100).toFixed(2) + "%"
            : "0%";
      }
    }

    // --- Totales por columna ---
    const tableTotals = { fecha: "Totales" };
    for (const col of cols) {
      if (col.key === "fecha") continue;
      if (col.key === "porcentaje_avance") {
        tableTotals[col.key] = "100%";
        continue;
      }
      tableTotals[col.key] = tableData.reduce(
        (acc, row) => acc + numberOrZero(row[col.key]),
        0
      );
    }

    out.table = {
      tableColumns: cols.map((c) => ({
        key: c.key,
        label: c.label,
        color: c.color || null,
      })),
      tableData,
      tableTotals,
    };
  }

  return out;
}
