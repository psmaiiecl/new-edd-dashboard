export const mappers = {
  docentes_validados: {
    total_key: "total_validados",
    series: [
      {
        name: "Rinden Portafolio",
        key: "rinden_portafolio",
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "No Rinden Portafolio",
        key: "no_rinden_portafolio",
        color: "#ff5880",
      },
      {
        name: "No se Evalúan",
        key: "suspendidos",
        color: "#ff8e53",
      },
    ],
  },
  avance_portafolio: {
    total_key: "total",
    series: [
      {
        name: "Portafolio Respondido",
        key: "portafolio_completado",
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "Portafolio en Proceso",
        key: "portafolio_iniciado",
        color: "#ffd153",
      },
      {
        name: "Portafolio no Iniciado",
        key: "portafolio_no_iniciado",
        color: "#ff8e53",
      },
      {
        name: "Sin Ingreso",
        key: "portafolio_sin_ingreso",
        color: "#ff5880",
      },
      {
        name: "No Iniciado (Susp/Exim Pend)",
        key: "portafolio_no_iniciado_se_pend",
        color: "#b4bdd9",
      },
    ],
  },
  avance_m1: {
    total_key: "total_m1",
    series: [
      {
        name: "Respondido",
        key: "m1_completado",
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "En proceso",
        key: "m1_iniciado",
        color: "#ffd153",
      },
      {
        name: "No Iniciado",
        key: "m1_no_iniciado",
        color: "#ff5880",
      },
    ],
  },
  avance_m2_ficha: {
    total_key: "total_m2",
    series: [
      {
        name: "Respondido",
        key: "m2_completado",
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "En proceso",
        key: "m2_iniciado",
        color: "#ffd153",
      },
      {
        name: "No Iniciado",
        key: "m2_no_iniciado",
        color: "#ff5880",
      },
    ],
  },
  avance_m2_grabada: {
    total_key: "total_m2",
    series: [
      {
        name: "Grabado",
        key: "m2_completado",
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "No Grabado",
        key: "m2_no_iniciado",
        color: "#ff5880",
      },
    ],
  },
  avance_m3: {
    total_key: "total_m3",
    series: [
      {
        name: "Respondido",
        key: "m3_completado",
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "En proceso",
        key: "m3_iniciado",
        color: "#ffd153",
      },
      {
        name: "No Iniciado",
        key: "m3_no_iniciado",
        color: "#ff5880",
      },
    ],
  },
  reporte_directores: {
    total_key: "total",
    series: [
      {
        name: "Respondido",
        key: "completado",
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "En proceso",
        key: "iniciado",
        color: "#ffd153",
      },
      {
        name: "No Iniciado",
        key: "no_iniciado",
        color: "#ff5880",
      },
    ],
  },
  avance_encuesta: {
    total_key: "total",
    series: [
      {
        name: "Respondido",
        key: "completados",
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "En proceso",
        key: "iniciados",
        color: "#ffd153",
      },
      {
        name: "No Iniciado",
        key: "no_iniciados",
        color: "#ff5880",
      },
    ],
  },
  avance_descarga_portafolio: {
    total_key: "total",
    series: [
      {
        name: "Descargado",
        key: "descargado",
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "No Descargado",
        key: "no_descargado",
        color: "#ff5880",
      },
    ],
  },
  avance_descarga_reporte_director: {
    total_key: "total",
    series: [
      {
        name: "Descargado",
        key: "descargados",
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "No Descargado",
        key: "no_descargados",
        color: "#ff5880",
      },
    ],
  },
  avance_visualizacion: {
    total_key: "total",
    series: [
      {
        name: "Visualizada",
        key: "visualizado",
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "No Visualizada",
        key: "no_visualizado",
        color: "#ff5880",
      },
    ],
  },
  avance_descarga_clase: {
    total_key: "total",
    series: [
      {
        name: "Descargada",
        key: "descarga_clase",
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "No Descargada",
        key: "no_descarga_clase",
        color: "#ff5880",
      },
    ],
  },
};
