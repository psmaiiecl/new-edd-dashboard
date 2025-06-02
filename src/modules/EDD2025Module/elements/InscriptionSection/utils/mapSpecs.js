export const mappers = {
  docentes_sugeridos: {
    series: [
      {
        name: "Inscritos",
        key: "inscritos_nomina",
        color: "#65D9AB",
        sliced: true,
      },
      {
        name: "Desinscritos",
        key: "desinscritos",
        color: "#C1D9CA",
      },
      {
        name: "Pendientes",
        key: "pendientes",
        color: "#FFD153",
      },
    ],
  },
  docentes_agregados: {
    series: [
      {
        name: "Inscritos",
        key: "inscritos_agregados_por_sostenedor",
        color: "#65D9AB",
        sliced: true,
      },
      {
        name: "En Revisión",
        key: "en_revision",
        color: "#FF8E53",
      },
      {
        name: "No Inscritos",
        key: "no_inscritos",
        color: "#FF5880",
      },
    ],
  },
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
  sostenedores_participantes: {
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
  docentes_dependencia:{
    series:[
      {
        name: "Inscritos en nómina",
        table: 'Inscritos',
        key: 'Inscrito',
        color: "#65D9AB",
      },
      {
        name: "En Revisión",
        table: 'En Revisión',
        key: 'En Revisión',
        color: "#FF8E53",
      },
      {
        name: "Desinscritos",
        table: "Desinscritos",
        key: 'Desinscrito',
        color: "#C1D9CA",
      },
      {
        name: "Pendientes",
        table: "Pendientes",
        key: 'Pendiente',
        color: "#FFD153",
      },
      {
        name: "Cancelados",
        table: "Cancelados",
        key: 'Cancelado',
        color: "#FF5880",
      },
    ]
  },
  sostenedores_dependencia:{
    series:[
      {
        name: "Con inscripción terminada",
        table: "Sin docentes pendientes",
        key: 'sin_docentes_pendientes',
        color: "#8FB8FF",
      },
      {
        name: "Con inscripción iniciada",
        table: 'Inscripcion iniciada',
        key: 'inscripcion_iniciada',
        color: "#65D9AB",
      },
      {
        name: "Con ingreso - Sin docentes inscritos",
        table: 'Con ingreso - Sin docentes',
        key: 'con_ingreso_sin_docentes',
        color: "#FF8E53",
      },
      {
        name: "Sin ingreso",
        table: "Sin ingreso",
        key: 'sin_ingreso',
        color: "#FF5880",
      },
    ]
  },
  docentes_convocatoria:{
    series:[
      {
        name: "Inscritos en nómina",
        table: 'Inscritos',
        key: 'Inscrito',
        color: "#65D9AB",
      },
      {
        name: "En Revisión",
        table: 'En Revisión',
        key: 'En Revisión',
        color: "#FF8E53",
      },
      {
        name: "Desinscritos",
        table: "Desinscritos",
        key: 'Desinscrito',
        color: "#C1D9CA",
      },
      {
        name: "Pendientes",
        table: "Pendientes",
        key: 'Pendiente',
        color: "#FFD153",
      },
      {
        name: "Cancelados",
        table: "Cancelados",
        key: 'Cancelado',
        color: "#FF5880",
      },
    ]
  }
};
