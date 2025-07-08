export const mappers = {
  docentes_agendados: {
    series: [
      {
        name: "Docentes Agendados",
        key: "docentes_agendados",
        color: "#65D9AB",
        sliced: true,
      },
      {
        name: "Con Contacto Inicial Exitoso",
        key: "docentes_contacto_inicial_exitoso",
        color: "#FFD153",
      },
      {
        name: "Con Contacto Inicial no Exitoso",
        key: "docentes_contacto_inicial_fallido",
        color: "#C1D9CA",
      },
      {
        name: "Sin Contactar",
        key: "docentes_sin_contactar",
        color: "#FF5880",
      },
    ],
  },
  establecimientos_agendados: {
    series: [
      {
        name: "Con agendamiento completado",
        key: "establecimientos_agendamiento_completo",
        color: "#8FB8FF",
        sliced: true,
      },
      {
        name: "Con agendamiento iniciado",
        key: "establecimientos_agendamiento_iniciado",
        color: "#65D9AB",
      },
      {
        name: "Con Contacto Inicial Exitoso",
        key: "establecimientos_contacto_inicial_exitoso",
        color: "#FFD153",
      },
      {
        name: "Con Contacto Inicial no Exitoso",
        key: "establecimientos_contacto_inicial_fallido",
        color: "#C1D9CA",
      },
      {
        name: "Sin Contactar",
        key: "establecimientos_sin_contactar",
        color: "#FF5880",
      },
    ],
  },
};
