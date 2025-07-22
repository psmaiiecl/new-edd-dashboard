import { numberFormatter, numberParser } from "../../../../../utils/NumberFormatter";
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
  const avanceReal2024 = data?.avance_real_2024 || [];
  const avanceEsperadoSinDocentes = data?.avance_esperado_sin_docentes || [];
  const res = {
    override: {
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
        name: "Avance Real 2024",
        data: avanceReal2024,
        color: "#ff5880",
      },
      {
        name: "A. Esperado sin docentes con solicitud pendiente",
        data: avanceEsperadoSinDocentes,
        color: "#c5a8ff",
      },
    ],
  };
  return res;
}

export function buildAvanceSemanalPortafolio(data) {
  const noIniciados = [];
  const iniciados = [];
  const completados = [];

  const anidadoCategorias = { categories: ["M1", "M2", "M3", "PF"] };
  let fechas = data?.fechas || [];
  let categorias = [];

  for (let i = 0; i < fechas.length; i++) {
    noIniciados.push(data?.m1NoIniciado[i]);
    noIniciados.push(data?.m2NoIniciado[i]);
    noIniciados.push(data?.m3NoIniciado[i]);
    noIniciados.push(data?.pfNoIniciados[i]);
    iniciados.push(data?.m1Iniciado[i]);
    iniciados.push(data?.m2Iniciado[i]);
    iniciados.push(data?.m3Iniciado[i]);
    iniciados.push(data?.pfIniciados[i]);
    completados.push(data?.m1Completado[i]);
    completados.push(data?.m2Completado[i]);
    completados.push(data?.m3Completado[i]);
    completados.push(data?.pfCompletado[i]);

    categorias.push({
      name: fechas[i],
      ...anidadoCategorias,
    });
  }

  const res = {
    override: {
      tooltip: {
        pointFormatter: function () {
          return `<span style="color:${this.color}">●</span> ${
            this.series.name
          }: <b>${this.y.toFixed(1)}%</b><br/>`;
        },
      },
      yAxis: {
        labels: {
          formatter: function () {
            return `${this.value.toFixed(0)}%`;
          },
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: "bold",
            fontSize: "13px",
            color: "#333",
            textOutline: "none",
          },
          formatter: function () {
            return `${this.total.toFixed(0)}%`;
          },
        },
      },
      xAxis: {
        categories: [...categorias],
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: "gray",
        },
      },
    },
    series: [
      {
        name: "No Iniciado",
        data: noIniciados,
        color: "#F25C75",
      },
      {
        name: "Iniciado",
        data: iniciados,
        color: "#5FA8F5",
      },
      {
        name: "Completado",
        data: completados,
        color: "#6EE7B7",
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

    //Tipo avance
    const avDoc = (numberParser(values['Agendamiento Completo']?.doc || 0 )/totalDocentes)*100;
    const avEE = (numberParser(values['Agendamiento Completo']?.ee || 0)/totalDocentes)*100;

    rows.push({
      ...parsed,
      values,
      total: {
        doc: numberFormatter(totalDocentes),
        ee: numberFormatter(totalEE),
      },
      avance: {
        // doc: totalDocentes > 0 ? 100 : 0,
        // ee: totalEE > 0 ? 100 : 0,
        doc: numberFormatter(avDoc.toFixed(1)),
        ee: numberFormatter(avEE.toFixed(1))
      },
    });
  }  
  return {
    rows,
    columns: specs.columns,
  };
}
