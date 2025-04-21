import { numberFormatter } from "../../../../../utils/NumberFormatter";

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
      const sumando = sumas[area] + quantity.count;
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
    (d) => d !== "Sin Información"
  );

  const arrInscritos = dependencias.map((dep) => data[dep].Inscrito.count || 0);
  const arrEnRevision = dependencias.map(
    (dep) => data[dep]["En Revisión"].count || 0
  );
  const arrDesinscritos = dependencias.map(
    (dep) => data[dep].Desinscrito.count || 0
  );
  const arrPendiente = dependencias.map(
    (dep) => data[dep].Pendiente.count || 0
  );
  const arrCancelado = dependencias.map(
    (dep) => data[dep].Cancelado.count || 0
  );
  const res = {
    ...setup,
    title: {
      ...setup["title"],
      text: numberFormatter(total),
    },
    xAxis: {
      categories: dependencias,
      labels: {
        style: {
          fontSize: "13px",
        },
      },
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
      categories: dependencias,
      labels: {
        style: {
          fontSize: "13px",
        },
      },
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
