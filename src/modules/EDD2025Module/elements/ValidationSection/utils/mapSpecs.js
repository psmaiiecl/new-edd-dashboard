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
        key: "actualizado",
        color: "#ffd153",
      },
      {
        name: "No Validados - Susp/Exim Aprobada",
        key: "no_validado",
        color: "#8fb8ff",
      },
      {
        name: "No Validados",
        key: "no_validado_susp",
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
        key: 'aprobadas',
        sliced: true,
        color: "#65D9AB",
      },
      {
        name: "Pendientes",
        key: 'no_procesadas',
        color: "#ff8e53",
      },
      {
        name: "Rechazadas",
        key: 'rechazadas',
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
};
