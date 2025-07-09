import { extractCTGInfo } from "../../../../../utils/StringUtils";

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
        key: "ee_agendamiento_completo",
        color: "#65D9AB",
        sliced: true,
      },
      {
        name: "Con agendamiento iniciado",
        key: "ee_agendamiento_iniciado",
        color: "#8FB8FF",
      },
      {
        name: "Con Contacto Inicial Exitoso",
        key: "ee_contacto_inicial_exitoso",
        color: "#FFD153",
      },
      {
        name: "Con Contacto Inicial no Exitoso",
        key: "ee_contacto_inicial_fallido",
        color: "#C1D9CA",
      },
      {
        name: "Sin Contactar",
        key: "ee_sin_contactar",
        color: "#FF5880",
      },
    ],
  },
  docentes_ctg: {
    categories: {
      key: "ctg",
    },
    series: [
      {
        name: "Agendados",
        key: "agendado",
        color: "#65D9AB",
      },
      {
        name: "Contacto Inicial Exitoso",
        key: "contacto_inicial_exitoso",
        color: "#FFD153",
      },
      {
        name: "Contacto Inicial no Exitoso",
        key: "contacto_inicial_no_exitoso",
        color: "#C1D9CA",
      },
      {
        name: "Sin Contactar",
        key: "sin_contactar",
        color: "#FF5880",
      },
    ],
  },
  establecimientos_ctg: {
    categories: {
      key: "ctg",
      labels: false,
    },
    series: [
      {
        name: "Agendamiento Iniciado",
        key: "ee_agendamiento_iniciado",
        color: "#8FB8FF",
      },
      {
        name: "Agendamiento Completo",
        //key: "ee_agendado",
        key: "agendado_ee",
        color: "#65D9AB",
      },
      {
        name: "Contac. Inicial Exitoso",
        key: "ee_contacto_inicial_exitoso",
        color: "#FFD153",
      },
      {
        name: "Contac. Inicial no Exitoso",
        key: "ee_contacto_inicial_no_exitoso",
        color: "#C1D9CA",
      },
      {
        name: "Sin Contactar",
        key: "ee_sin_contactar",
        color: "#FF5880",
      },
    ],
  },
  docentes_dependencia: {
    categories: {
      key: "categorias",
    },
    series: [
      {
        name: "Agendados",
        key: "agendado",
        color: "#65D9AB",
      },
      {
        name: "Contacto Inicial Exitoso",
        key: "contacto_inicial_exitoso",
        color: "#FFD153",
      },
      {
        name: "Contacto Inicial no Exitoso",
        key: "contacto_inicial_no_exitoso",
        color: "#C1D9CA",
      },
      {
        name: "Sin Contactar",
        key: "sin_contactar",
        color: "#FF5880",
      },
    ],
  },
  establecimientos_dependencia: {
    categories: {
      key: "categorias",
      labels: false,
    },
    series: [
      {
        name: "Agendamiento Iniciado",
        key: "ee_agendamiento_iniciado",
        color: "#8FB8FF",
      },
      {
        name: "Agendamiento Completo",
        //key: "ee_agendado",
        key: "agendado_ee",
        color: "#65D9AB",
      },
      {
        name: "Contac. Inicial Exitoso",
        key: "ee_contacto_inicial_exitoso",
        color: "#FFD153",
      },
      {
        name: "Contac. Inicial no Exitoso",
        key: "ee_contacto_inicial_no_exitoso",
        color: "#C1D9CA",
      },
      {
        name: "Sin Contactar",
        key: "ee_sin_contactar",
        color: "#FF5880",
      },
    ],
  },
  docentes_convocatoria: {
    categories: {
      key: "categorias",
    },
    series: [
      {
        name: "Agendados",
        key: "agendado",
        color: "#65D9AB",
      },
      {
        name: "Contacto Inicial Exitoso",
        key: "contacto_inicial_exitoso",
        color: "#FFD153",
      },
      {
        name: "Contacto Inicial no Exitoso",
        key: "contacto_inicial_no_exitoso",
        color: "#C1D9CA",
      },
      {
        name: "Sin Contactar",
        key: "sin_contactar",
        color: "#FF5880",
      },
    ],
  },
  establecimientos_convocatoria: {
    categories: {
      key: "categorias",
      labels: false,
    },
    series: [
      {
        name: "Agendamiento Iniciado",
        key: "ee_agendamiento_iniciado",
        color: "#8FB8FF",
      },
      {
        name: "Agendamiento Completo",
        //key: "ee_agendado",
        key: "agendado_ee",
        color: "#65D9AB",
      },
      {
        name: "Contac. Inicial Exitoso",
        key: "ee_contacto_inicial_exitoso",
        color: "#FFD153",
      },
      {
        name: "Contac. Inicial no Exitoso",
        key: "ee_contacto_inicial_no_exitoso",
        color: "#C1D9CA",
      },
      {
        name: "Sin Contactar",
        key: "ee_sin_contactar",
        color: "#FF5880",
      },
    ],
  },
  docentes_region: {
    categories: {
      key: "categorias",
    },
    series: [
      {
        name: "Agendados",
        key: "agendado",
        color: "#65D9AB",
      },
      {
        name: "Contacto Inicial Exitoso",
        key: "contacto_inicial_exitoso",
        color: "#FFD153",
      },
      {
        name: "Contacto Inicial no Exitoso",
        key: "contacto_inicial_no_exitoso",
        color: "#C1D9CA",
      },
      {
        name: "Sin Contactar",
        key: "sin_contactar",
        color: "#FF5880",
      },
    ],
  },
  establecimientos_region: {
    categories: {
      key: "categorias",
      labels: false,
    },
    series: [
      {
        name: "Agendamiento Iniciado",
        key: "ee_agendamiento_iniciado",
        color: "#8FB8FF",
      },
      {
        name: "Agendamiento Completo",
        //key: "ee_agendado",
        key: "agendado_ee",
        color: "#65D9AB",
      },
      {
        name: "Contac. Inicial Exitoso",
        key: "ee_contacto_inicial_exitoso",
        color: "#FFD153",
      },
      {
        name: "Contac. Inicial no Exitoso",
        key: "ee_contacto_inicial_no_exitoso",
        color: "#C1D9CA",
      },
      {
        name: "Sin Contactar",
        key: "ee_sin_contactar",
        color: "#FF5880",
      },
    ],
  },

  tabla_ctg: {
    categoriesKey: "ctg",
    rowParser: extractCTGInfo,
    columns: [
      {
        label: "Agendamiento Completo",
        keys: { doc: "agendado", ee: "ee_agendamiento_completo" },
        color: "#65D9AB",
        span: 2,
      },
      {
        label: "Agendamiento Iniciado",
        keys: { ee: "ee_agendamiento_iniciado" },
        color: "#FFD153",
        span: 1,
      },
      {
        label: "Contacto Inicial Exitoso",
        keys: {
          doc: "contacto_inicial_exitoso",
          ee: "ee_contacto_inicial_exitoso",
        },
        color: "#F9A825",
        span: 2,
      },
      {
        label: "Contacto Inicial no Exitoso",
        keys: {
          doc: "contacto_inicial_no_exitoso",
          ee: "ee_contacto_inicial_no_exitoso",
        },
        color: "#FF5880",
        span: 2,
      },
      {
        label: "Sin Contactar",
        keys: { doc: "sin_contactar", ee: "ee_sin_contactar" },
        color: "#1976D2",
        span: 2,
      },
    ],
  },
  tabla_dependencia: {
    categoriesKey: "categorias",
    columns: [
      {
        label: "Agendamiento Completo",
        keys: { doc: "agendado", ee: "ee_agendamiento_completo" },
        color: "#65D9AB",
        span: 2,
      },
      {
        label: "Agendamiento Iniciado",
        keys: { ee: "ee_agendamiento_iniciado" },
        color: "#FFD153",
        span: 1,
      },
      {
        label: "Contacto Inicial Exitoso",
        keys: {
          doc: "contacto_inicial_exitoso",
          ee: "ee_contacto_inicial_exitoso",
        },
        color: "#F9A825",
        span: 2,
      },
      {
        label: "Contacto Inicial no Exitoso",
        keys: {
          doc: "contacto_inicial_no_exitoso",
          ee: "ee_contacto_inicial_no_exitoso",
        },
        color: "#FF5880",
        span: 2,
      },
      {
        label: "Sin Contactar",
        keys: { doc: "sin_contactar", ee: "ee_sin_contactar" },
        color: "#1976D2",
        span: 2,
      },
    ],
  },
  tabla_convocatoria: {
    categoriesKey: "categorias",
    columns: [
      {
        label: "Agendamiento Completo",
        keys: { doc: "agendado", ee: "ee_agendamiento_completo" },
        color: "#65D9AB",
        span: 2,
      },
      {
        label: "Agendamiento Iniciado",
        keys: { ee: "ee_agendamiento_iniciado" },
        color: "#FFD153",
        span: 1,
      },
      {
        label: "Contacto Inicial Exitoso",
        keys: {
          doc: "contacto_inicial_exitoso",
          ee: "ee_contacto_inicial_exitoso",
        },
        color: "#F9A825",
        span: 2,
      },
      {
        label: "Contacto Inicial no Exitoso",
        keys: {
          doc: "contacto_inicial_no_exitoso",
          ee: "ee_contacto_inicial_no_exitoso",
        },
        color: "#FF5880",
        span: 2,
      },
      {
        label: "Sin Contactar",
        keys: { doc: "sin_contactar", ee: "ee_sin_contactar" },
        color: "#1976D2",
        span: 2,
      },
    ],
  },
  tabla_region: {
    categoriesKey: "categorias",
    columns: [
      {
        label: "Agendamiento Completo",
        keys: { doc: "agendado", ee: "ee_agendamiento_completo" },
        color: "#65D9AB",
        span: 2,
      },
      {
        label: "Agendamiento Iniciado",
        keys: { ee: "ee_agendamiento_iniciado" },
        color: "#FFD153",
        span: 1,
      },
      {
        label: "Contacto Inicial Exitoso",
        keys: {
          doc: "contacto_inicial_exitoso",
          ee: "ee_contacto_inicial_exitoso",
        },
        color: "#F9A825",
        span: 2,
      },
      {
        label: "Contacto Inicial no Exitoso",
        keys: {
          doc: "contacto_inicial_no_exitoso",
          ee: "ee_contacto_inicial_no_exitoso",
        },
        color: "#FF5880",
        span: 2,
      },
      {
        label: "Sin Contactar",
        keys: { doc: "sin_contactar", ee: "ee_sin_contactar" },
        color: "#1976D2",
        span: 2,
      },
    ],
  },
};
