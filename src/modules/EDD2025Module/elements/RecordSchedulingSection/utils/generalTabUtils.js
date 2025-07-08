export function buildAgendamientoApilado(data) {
  const semanas = data.semanas;
  const datosLunes = data.lunes;
  const datosMartes = data.martes;
  const datosMiercoles = data.miercoles;
  const datosJueves = data.jueves;
  const datosViernes = data.viernes;
  const datosSabado = data.sabado;
  const datosDomingo = data.domingo;
  const res = {
    series: [
      {
        name: "Lunes",
        data: datosLunes,
      },
      {
        name: "Martes",
        data: datosMartes,
      },
      {
        name: "Miércoles",
        data: datosMiercoles,
      },
      {
        name: "Jueves",
        data: datosJueves,
      },
      {
        name: "Viernes",
        data: datosViernes,
      },
      {
        name: "Sábado",
        data: datosSabado,
      },
      {
        name: "Domingo",
        data: datosDomingo,
      },
    ],
    override: {
      xAxis: {
        title: {
          text: "Semanas",
        },
        categories: semanas,
      },
    },
  };
  return res;
}

export function buildAgendamientoGeneral(data) {
  const semanas = data?.semanas || [];
  const avanceReal = data?.avance_real || [];
  const avanceEsperado = data?.avance_esperado || [];
  const avanceReal2024 = data?.avance_real_2024 || [];
  const avanceEsperadoSinDocentes = data?.avance_esperado_sin_docentes || [];
  const res = {
    override: {
      xAxis: {
        categories: semanas,
      },
    },
    series: [
      {
        name: "Avance Real",
        data: avanceReal,
        color: "#b2de95",
      },
      {
        name: "Avance Esperado",
        data: avanceEsperado,
        color: "#5b9bd5",
      },
      {
        name: "Avance Real 2024",
        data: avanceReal2024,
        color: "#ff5880",
      },
      {
        name: "A. Esperado sin docentes con solicitud pendiente",
        data: avanceEsperadoSinDocentes,
        color: "#c5a8ff",
      },
    ],
  };
  return res;
}
