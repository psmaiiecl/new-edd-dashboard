export const mappers = {
  entrega_informes_resultados: {
    series: [
      {
        name: "Informes Descargados",
        key: "informes_individuales_descargados",
        color: "#65D9AB",
        sliced: true,
      },
      {
        name: "Informes no Descargados",
        key: "informes_individuales_no_descargados",
        color: "#FF8E53",
      },

    ],
  },
  entrega_informes_establecimiento: {
    series: [
      {
        name: "Informes Descargados",
        key: "informes_establecimiento_descargados",
        color: "#65D9AB",
        sliced: true,
      },
      {
        name: "Informes no Descargados",
        key: "informes_establecimiento_no_descargados",
        color: "#FF8E53",
      },
      {
        name: "Informes con Acceso",
        key: "informes_establecimiento_acceso",
        color: "#ffd153",
      }
    ],
  },
  entrega_informes_sostenedor: {
    series: [
      {
        name: "Informes Descargados",
        key: "informes_sostenedor_descargados",
        color: "#65D9AB",
        sliced: true,
      },
      {
        name: "Informes no Descargados",
        key: "informes_sostenedor_no_descargados",
        color: "#FF8E53",
      },
      {
        name: "Informes con Acceso",
        key: "informes_sostenedor_acceso",
        color: "#ffd153",
      }
    ],
  }
}
