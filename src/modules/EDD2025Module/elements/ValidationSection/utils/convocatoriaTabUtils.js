import { numberFormatter } from "../../../../../utils/NumberFormatter";

export function extraerSumatoriasDocentes(data) {
  let sumas = {
    validados: 0,
    no_validados: 0,
    sin_ingreso: 0,
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

export function buildEstadoChart(setup, data, total) {
  const dependencias = Object.keys(data || {}).filter(
    (d) => d !== "Sin Información"
  );

  const arrValidados = dependencias.map((dep) => data[dep].validados || 0);
  const arrNoValidados = dependencias.map((dep) => data[dep].no_validados || 0);
  const arrSinIngreso = dependencias.map((dep) => data[dep].sin_ingreso || 0);
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
        ...setup.series[0],
        data: arrValidados,
      },
      {
        ...setup.series[1],
        data: arrNoValidados,
      },
      {
        ...setup.series[2],
        data: arrSinIngreso,
      },
    ],
  };
  return res;
}

export function extraerSumatoriasSolicitudes(data) {
  let sumas = {
    aprobadas: 0,
    no_procesadas: 0,
    rechazadas: 0,
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

export function buildSolicitudChart(setup, data, total) {
  const dependencias = Object.keys(data || {}).filter(
    (d) => d !== "Sin Información"
  );
  const arrAprobadas = dependencias.map((dep) => data[dep].aprobadas || 0);
  const arrNoProcesadas = dependencias.map(
    (dep) => data[dep].no_procesadas || 0
  );
  const arrRechazadas = dependencias.map((dep) => data[dep].rechazadas || 0);
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
        ...setup.series[0],
        data: arrAprobadas,
      },
      {
        ...setup.series[1],
        data: arrNoProcesadas,
      },
      {
        ...setup.series[2],
        data: arrRechazadas,
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
