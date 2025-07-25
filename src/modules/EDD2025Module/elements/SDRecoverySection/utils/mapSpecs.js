const mappers = {
  recuperacion_grabaciones: {
    series: [
      {
        name: "Grabación en DOCENTEMÁS",
        key: "grabados_docentemas",
        color: "#65D9AB",
        sliced: true,
      },
      {
        name: "Grabación en celular del camarógrafo",
        key: "grabados_celular_camarografo",
        color: "#8FB8FF",
      },
      {
        name: "Grabación realizada con cámara (solo SD)",
        key: "grabados_camara",
        color: "#FFD153",
      },
    ],
  },
  recuperacion_sd: {
    series: [
      {
        name: "En DOCENTEMÁS",
        key: "sd_docentemas",
        color: "#65D9AB",
        sliced: true,
      },
      {
        name: "En trayecto a DOCENTEMÁS",
        key: "sd_trayecto_docentemas",
        color: "#8FB8FF",
      },
      {
        name: "En poder del sostenedor/a",
        key: "sd_sostenedor",
        color: "#FFD153",
      },
      {
        name: "En poder del director/a",
        key: "sd_director",
        color: "#ffba53ff",
      },
      {
        name: "En poder del docente/a",
        key: "sd_docente",
        color: "#FF5880",
      },
    ],
  },
};

export default mappers;
