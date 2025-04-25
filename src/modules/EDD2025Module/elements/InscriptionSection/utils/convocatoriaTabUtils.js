import { numberFormatter } from "../../../../../utils/NumberFormatter";

export function extraerSumaTotal(data) {
  let res = 0;
  Object.values;
  for (const value of Object.values(data)) {
    res += value;
  }
  return res;
}

export function extraerSumatoriasDocentes(data) {
  let sumas = {
    Inscrito: 0,
    "En Revisión": 0,
    Desinscrito: 0,
    Pendiente: 0,
    Cancelado: 0,
    total: 0,
  };

  for (const [key] of Object.entries(data)) {
    for (const [area, quantity] of Object.entries(data[key])) {
      if (sumas[area] === undefined) continue;
      const sumando = sumas[area] + +quantity.count;
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
    (d) => d !== "convocatoria"
  );
  const arrInscritos = dependencias.map(
    (dep) => +data[dep].Inscrito.count || 0
  );
  const arrEnRevision = dependencias.map(
    (dep) => +data[dep]["En Revisión"].count || 0
  );
  const arrDesinscritos = dependencias.map(
    (dep) => +data[dep].Retirado?.count || 0
  );
  const arrPendiente = dependencias.map(
    (dep) => +data[dep].Pendiente.count || 0
  );
  const arrCancelado = dependencias.map(
    (dep) => +data[dep].Cancelado.count || 0
  );
  const res = {
    ...setup,
    title: {
      ...setup["title"],
      text: numberFormatter(total),
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
