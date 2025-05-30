import { numberFormatter } from "../../../../../utils/NumberFormatter";

export function mapDependenciaData({
  data,
  schema,
  excludeKeys = ["Retirado", "Sin Información"],
  labelMap = {},
}) {
  const dependencias = Object.keys(data || {}).filter(dep => !excludeKeys.includes(dep));

  //const estados = schema.map(({ key }) => key);

  // Series para Highcharts
  const series = schema.map(({ name, key, color }) => {
    const serieData = dependencias.map(dep => data[dep]?.[key] || 0);
    return {
      name: labelMap[key] || name,
      data: serieData,
      color,
    };
  });

  // Suma total general
  const total = series.reduce((acc, serie) => {
    return acc + serie.data.reduce((a, b) => a + b, 0);
  }, 0);

  // Tabla: sumatorias por estado
  const sumatoriasPorEstado = schema.reduce((acc, { key }) => {
    acc[key] = 0;
    return acc;
  }, {});

  // Tabla: filas por dependencia
  const dependenciasData = {};

  for (const dep of dependencias) {
    const row = {};
    for (const { key } of schema) {
      const val = data[dep]?.[key] || 0;
      row[key] = val;
      sumatoriasPorEstado[key] += val;
    }
    dependenciasData[labelMap[dep] || dep] = row;
  }

  // % por estado respecto al total
  const porcentajes = {};
  for (const { key } of schema) {
    const valor = sumatoriasPorEstado[key];
    const porcentaje = total > 0 ? ((valor / total) * 100).toFixed(1) : "0.0";
    porcentajes[key] = `${porcentaje}%`;
  }

  return {
    total,
    series,
    dataTable: {
      dependencias: dependenciasData,
      sumatorias: sumatoriasPorEstado,
      porcentajes,
    }
  };
}

export function extraerSumatoriasDocentes(data) {
  let sumas = {
    Inscrito: 0,
    "En Revisión": 0,
    Desinscrito: 0,
    Pendiente: 0,
    Cancelado: 0,
  };

  for (const [key] of Object.entries(data)) {
    for (const [area, quantity] of Object.entries(data[key])) {
      if (sumas[area] === undefined) continue;
      const sumando = sumas[area] + quantity;
      sumas = {
        ...sumas,
        [area]: sumando,
      };
    }
  }

  return sumas;
}

export function buildDocentesDependenciaChart(setup, data, total) {
  const dependencias = Object.keys(data || {}).filter(
    (d) => d !== "Sin Información" && d !== "Retirado"
  );

  const arrInscritos = dependencias.map((dep) => data[dep].Inscrito || 0);
  const arrEnRevision = dependencias.map(
    (dep) => data[dep]["En Revisión"] || 0
  );
  const arrDesinscritos = dependencias.map(
    (dep) => data[dep].Desinscrito || 0
  );
  const arrPendiente = dependencias.map(
    (dep) => data[dep].Pendiente || 0
  );
  const arrCancelado = dependencias.map(
    (dep) => data[dep].Cancelado || 0
  );
  const res = {
    ...setup,
    title: {
      ...setup["title"],
      text: numberFormatter(total),
    },
    xAxis: {
      ...setup.xAxis,
      categories: dependencias,
    },
    series: [
      {
        name: "Inscritos en nómina",
        data: arrInscritos,
        sliced: true,
        selected: true,
        color: "#65D9AB",
      },
      {
        name: "En Revisión",
        data: arrEnRevision,
        color: "#FF8E53",
      },
      {
        name: "Desinscritos",
        data: arrDesinscritos,
        color: "#C1D9CA",
      },
      {
        name: "Pendientes",
        data: arrPendiente,
        color: "#FFD153",
      },
      {
        name: "Cancelados",
        data: arrCancelado,
        color: "#FF5880",
      },
    ],
  };
  return res;
}

export function extraerSumatoriaSostenedores(data) {
  let sumas = {
    sin_ingreso: 0,
    con_ingreso_sin_docentes: 0,
    inscripcion_iniciada: 0,
    sin_docentes_pendientes: 0,
  };

  for (const [estadoInscripcion, areas] of Object.entries(data)) {
    for (const cantidad of Object.values(areas)) {
      if (sumas[estadoInscripcion] === undefined) continue;
      const sumando = sumas[estadoInscripcion] + cantidad;
      sumas = {
        ...sumas,
        [estadoInscripcion]: sumando,
      };
    }
  }
  return sumas;
}

export function buildSostenedoresDependenciaChart(setup, data, total) {
  const dependencias = Object.keys(data.sin_ingreso)
    .sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }))
    .filter((d) => d !== "Sin Información");
  const arrSinIngreso = dependencias.map((item) => data.sin_ingreso[item]);
  const arrIngresoSinDocentes = dependencias.map(
    (item) => data.con_ingreso_sin_docentes[item]
  );
  const arrInscripcionIniciada = dependencias.map(
    (item) => data.inscripcion_iniciada[item]
  );
  const arrSinPendientes = dependencias.map(
    (item) => data.sin_docentes_pendientes[item]
  );
  const res = {
    ...setup,
    title: {
      ...setup["title"],
      text: numberFormatter(total),
    },
    xAxis: {
      ...setup.xAxis,
      categories: dependencias,
    },
    series: [
      {
        name: "Sin Ingreso",
        data: arrSinIngreso,
        color: "#FF5880",
      },
      {
        name: "Con ingreso pero sin docentes inscritos",
        data: arrIngresoSinDocentes,
        color: "#FF8E53",
      },
      {
        name: "Con inscripción iniciada",
        data: arrInscripcionIniciada,
        color: "#65D9AB",
      },
      {
        name: "Con inscripción terminada",
        data: arrSinPendientes,
        color: "#8FB8FF",
      },
    ],
  };
  return res;
}

export function extraerSumaTotal(data) {
  let res = 0;
  Object.values;
  for (const value of Object.values(data)) {
    res += value;
  }
  return res;
}
