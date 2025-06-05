export const mappers = {
  docentes: {
    series: [
      {
        name: "Validados",
        key: "validado",
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "No Validados - Con Ingreso",
        key: "no_validado",
        color: "#ffd153",
      },
      {
        name: "No Validados - Susp/Exim Aprobada",
        key: "no_validado_susp",
        color: "#8fb8ff",
      },
      {
        name: "No Validados",
        key: "actualizado",
        color: "#ff8e53",
      },
      {
        name: "Sin Ingreso a Plataforma",
        key: "sin_ingreso",
        color: "#ff5880",
      },
    ],
  },
  solicitudes: {
    series: [
      {
        name: "Aprobadas",
        key: "aprobadas",
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "Pendientes",
        key: "no_procesadas",
        color: "#ff8e53",
      },
      {
        name: "Rechazadas",
        key: "rechazadas",
        color: "#ff5880",
      },
    ],
  },
  estado_participacion: {
    series: [
      {
        name: "Rinde",
        key: "rinde",
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "No Rinde PF",
        key: "no_rinde",
        color: "#ff5880",
      },
    ],
  },
  causales: {
    series: [
      {
        name: "Suspensión",
        key: "suspende",
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "Eximición",
        key: "eximido",
        color: "#ffd153",
      },
      {
        name: "19Ñ",
        key: "a19n",
        color: "#8fb8ff",
      },
      {
        name: "Tramo Voluntario",
        key: "voluntario",
        color: "#ff8e53",
      },
      {
        name: "Aplazamiento",
        key: "aplaza",
        color: "#ff5880",
      },
      {
        name: "Portafolio Corregido",
        key: "portafolio_c",
        color: "#c1d9ca",
      },
    ],
  },
  estado_validacion: {
    series: [
      {
        name: "Validados",
        table: "Validados",
        key: "validados",
        color: "#65D9AB",
      },
      {
        name: "No Validados",
        table: "No Validados",
        key: "no_validados",
        color: "#FFD153",
      },
      {
        name: "Sin Ingreso",
        table: "Sin Ingreso",
        key: "sin_ingreso",
        color: "#FF5880",
      },
    ],
  },
  estado_solicitudes: {
    series: [
      {
        name: "Aprobadas",
        table: "Aprobadas",
        key: "aprobadas",
        color: "#65D9AB",
      },
      {
        name: "No Procesadas",
        table: "No Procesadas",
        key: "no_procesadas",
        color: "#FFD153",
      },
      {
        name: "Rechazadas",
        table: "Rechazadas",
        key: "rechazadas",
        color: "#FF5880",
      },
    ],
  },
};
