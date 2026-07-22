export const mappers = {
  entrega_informes_resultados: {
    series: [
      {
        name: "Descargados",
        key: "informes_individuales_descargados",
        color: "#65D9AB",
        sliced: true,
      },
      {
        name: "No Descargados",
        key: "informes_individuales_no_descargados",
        color: "#FF8E53",
      },
    ],
  },
  entrega_informes_establecimiento: {
    total_key: "informes_establecimiento",
    series: [
      {
        name: "Descargados",
        key: "informes_establecimiento_descargados",
        color: "#65D9AB",
        sliced: true,
      },
      {
        name: "Solo Acceso",
        key: "informes_establecimiento_acceso",
        color: "#ffd153",
      },
      {
        name: "Sin Acceso",
        key: "informes_establecimiento_no_descargados",
        color: "#FF8E53",
      },
    ],
  },
  entrega_informes_sostenedor: {
    total_key: "informes_sostenedor",
    series: [
      {
        name: "Descargados",
        key: "informes_sostenedor_descargados",
        color: "#65D9AB",
        sliced: true,
      },
      {
        name: "Solo Acceso",
        key: "informes_sostenedor_acceso",
        color: "#ffd153",
      },
      {
        name: "Sin Acceso",
        key: "informes_sostenedor_no_descargados",
        color: "#FF8E53",
      },
    ],
  },
};
