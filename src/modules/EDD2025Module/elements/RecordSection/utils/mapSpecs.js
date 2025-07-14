const mappers = {
  docentes_rinde: {
    series: [
      {
        name: "Grabados",
        key: "grabados",
        color: "#65D9AB",
        sliced: true,
      },
      {
        name: "No Grabados",
        key: "no_grabados",
        color: "#8FB8FF",
      },
      {
        name: "Pospuestos",
        key: "pospuestos",
        color: "#FFD153",
      },
      {
        name: "Agendados",
        key: "agendados",
        color: "#C1D9CA",
      },
      {
        name: "Sin Agendar",
        key: "sin_agendar",
        color: "#FF5880",
      },
    ],
  },
  total_docentes_grabados: {
    series: [
      {
        name: "Grabados en estado RINDE",
        key: "grabados_rinde",
        color: "#65D9AB",
        sliced: true,
      },
      {
        name: "Grabados en otros estados",
        key: "grabados_otros_estados",
        color: "#FFD153",
      },
    ],
  },
  establecimientos_a_grabar: {
    series: [
      {
        name: "Agen. Term. Grabaciones Terminadas",
        key: "at_grabaciones_terminadas",
        color: "#65D9AB",
        sliced: true,
      },
      {
        name: "Agen. Term. Grabaciones Iniciadas",
        key: "at_grabaciones_iniciadas",
        color: "#8FB8FF",
      },
      {
        name: "Agen. Term. Sin Grabaciones",
        key: "at_sin_grabaciones",
        color: "#3075ecff",
      },
      {
        name: "Agen. Ini. Grabaciones Iniciadas",
        key: "ai_grabaciones_iniciadas",
        color: "#FFD153",
      },
      {
        name: "Agen. Ini. Sin Grabaciones",
        key: "ai_sin_grabaciones",
        color: "#ffb453ff",
      },
      {
        name: "Sin Agen. Sin Grabaciones",
        key: "sa_sin_grabaciones",
        color: "#FF5880",
      },
    ],
  },
  sostenedores_participantes: {
    series: [
      {
        name: "> o = 75% Grabaciones",
        key: "grabaciones_mas_75",
        color: "#65D9AB",
        sliced: true,
      },
      {
        name: "< 75% Grabaciones",
        key: "grabaciones_75",
        color: "#8FB8FF",
      },
      {
        name: "< 50% Grabaciones",
        key: "grabaciones_50",
        color: "#FFD153",
      },
      {
        name: "<25% Grabaciones",
        key: "grabaciones_25",
        color: "#C1D9CA",
      },
      {
        name: "Sin Grabaciones",
        key: "sin_grabaciones",
        color: "#FF5880",
      },
    ],
  },
};

export default mappers;
