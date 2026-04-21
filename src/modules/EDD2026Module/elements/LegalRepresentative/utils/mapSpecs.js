export const mappers = {
  entidades_sostenedoras: {
    total_key: "sostenedores",
    series: [
      {
        name: "Con Rep. Legal registrado",
        key: "sostenedores_con_representante",
        sliced: true,
        color: "#FF5880",
      },
      {
        name: "Sin Rep. Legal registrado",
        key: "sostenedores_sin_representante",
        color: "#FF8E53",
      },
    ],
  },
  representantes_legales: {
    total_key: "habilitados",
    series: [
      {
        name: "Sin ingreso",
        key: "sin_ingreso",
        sliced: true,
        color: "#FF5880",
      },
      {
        name: "Con ingreso sin docentes inscritos",
        key: "con_ingreso_sin_docentes",
        color: "#FF8E53",
      },
      {
        name: "Inscripción iniciada",
        key: "inscripcion_iniciada",
        color: "#65D9AB",
      },
      {
        name: "Sin docentes pendientes",
        key: "sin_docentes_pendientes",
        color: "#8FB8FF",
      },
    ],
  },
  validacion_representantes: {
    total_key: "total",
    series: [
      {
        name: "Por Realizar",
        key: "por_realizar",
        sliced: true,
        color: "#FF5880",
      },
      {
        name: "Pendientes",
        key: "pendientes",
        color: "#FF8E53",
      },
      {
        name: "Rechazados",
        key: "rechazados",
        color: "#65D9AB",
      },
      {
        name: "Aceptados",
        key: "aceptados",
        color: "#8FB8FF",
      },
    ],
  },
  sostenedor_encargados: {
    total_key: "sostenedores",
    series: [
      {
        name: "Con Encargado de Evaluación",
        key: "sostenedores_con_encargado",
        sliced: true,
        color: "#FF5880",
      },
      {
        name: "Sin Encargado de Evaluación",
        key: "sostenedores_sin_encargado",
        color: "#FF8E53",
      },
    ],
  },
};
