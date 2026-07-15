import {
  numberFormatter,
  numberParser,
} from "../../../../../utils/NumberFormatter";
import { extractCTGInfo } from "../../../../../utils/StringUtils";

export function buildAgendamientoApilado(data) {
  const semanas = data.semanas;
  const datosLunes = data.lunes;
  const datosMartes = data.martes;
  const datosMiercoles = data.miercoles;
  const datosJueves = data.jueves;
  const datosViernes = data.viernes;
  const datosSabado = data.sabado;
  const datosDomingo = data.domingo;
  const res = {
    series: [
      {
        name: "Lunes",
        data: datosLunes,
      },
      {
        name: "Martes",
        data: datosMartes,
      },
      {
        name: "Miércoles",
        data: datosMiercoles,
      },
      {
        name: "Jueves",
        data: datosJueves,
      },
      {
        name: "Viernes",
        data: datosViernes,
      },
      {
        name: "Sábado",
        data: datosSabado,
      },
      {
        name: "Domingo",
        data: datosDomingo,
      },
    ],
    override: {
      xAxis: {
        title: {
          text: "Semanas",
        },
        categories: semanas,
      },
    },
  };
  return res;
}

export function buildAgendamientoGeneral(data) {
  const semanas = data?.semanas || [];
  const avanceReal = data?.avance_real || [];
  const avanceEsperado = data?.avance_esperado || [];
  const avanceReal2025 = data?.avance_real_2025 || [];
  const avanceRealSinDocentes = data?.avance_real_sin_docentes || [];
  const res = {
    override: {
      tooltip: {
        pointFormatter: function () {
          return `<span style="color:${this.color}">●</span> ${
            this.series.name
          }: <b>${(this.y * 100).toFixed(1)}%</b><br/>`;
        },
      },
      yAxis: {
        labels: {
          formatter: function () {
            return `${(this.value * 100).toFixed(0)}%`;
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
        name: "A. Real sin docentes con solicitud pendiente",
        data: avanceRealSinDocentes,
        color: "#c5a8ff",
      },
      {
        name: "Avance Real 2025",
        data: avanceReal2025,
        color: "#ff5880",
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
    let totalDocentes = 0;
    let totalEE = 0;

    for (const col of specs.columns) {
      const docentesKey = col.keys.doc;
      const eeKey = col.keys.ee;

      const valDocentes = docentesKey
        ? parseInt(data[docentesKey]?.[i] ?? 0)
        : null;
      const valEE = eeKey ? parseInt(data[eeKey]?.[i] ?? 0) : null;

      values[col.label] = {
        doc: numberFormatter(valDocentes),
        ee: numberFormatter(valEE),
      };

      if (valDocentes !== null) totalDocentes += valDocentes;
      if (valEE !== null) totalEE += valEE;
    }

    const avDoc =
      (numberParser(values["Agendamiento Completo"]?.doc || 0) /
        totalDocentes) *
      100;
    const avEE =
      (numberParser(values["Agendamiento Completo"]?.ee || 0) / totalDocentes) *
      100;

    rows.push({
      ...parsed,
      values,
      total: {
        doc: numberFormatter(totalDocentes),
        ee: numberFormatter(totalEE),
      },
      avance: {
        doc: numberFormatter(avDoc.toFixed(1)),
        ee: numberFormatter(avEE.toFixed(1)),
      },
    });
  }
  return {
    rows,
    columns: specs.columns,
  };
}
