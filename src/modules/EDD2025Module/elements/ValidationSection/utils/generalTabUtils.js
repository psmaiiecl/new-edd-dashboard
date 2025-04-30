import { numberFormatter } from "../../../../../utils/NumberFormatter";

export function buildDocentesInscritos(setup, data) {
  const validado = data.validado;
  const actualizado = data.actualizado;
  const noValidado = data.no_validado;
  const noValidadoSusp = data.no_validado_susp;
  const sinIngreso = data.sin_ingreso;
  const total =
    validado + actualizado + noValidado + noValidadoSusp + sinIngreso;
  const res = {
    ...setup,
    title: {
      ...setup.title,
      number: total,
      text: numberFormatter(total),
    },
    series: [
      {
        ...setup.series[0],
        data: [
          {
            ...setup.series[0].data[0],
            y: parseInt(validado),
          },
          {
            ...setup.series[0].data[1],
            y: parseInt(actualizado),
          },
          {
            ...setup.series[0].data[2],
            y: parseInt(noValidadoSusp),
          },
          {
            ...setup.series[0].data[3],
            y: parseInt(noValidado),
          },
          {
            ...setup.series[0].data[4],
            y: parseInt(sinIngreso),
          },
        ],
      },
    ],
  };
  return res;
}

export function buildSolicitudes(setup, data) {
  const aprobadas = data.aprobadas;
  const noProcesadas = data.no_procesadas;
  const rechazadas = data.rechazadas;
  const total = aprobadas + noProcesadas + rechazadas;
  const res = {
    ...setup,
    title: {
      ...setup.title,
      number: total,
      text: numberFormatter(total),
    },
    series: [
      {
        ...setup.series[0],
        data: [
          {
            ...setup.series[0].data[0],
            y: parseInt(aprobadas),
          },
          {
            ...setup.series[0].data[1],
            y: parseInt(noProcesadas),
          },
          {
            ...setup.series[0].data[2],
            y: parseInt(rechazadas),
          },
        ],
      },
    ],
  };
  return res;
}

export function buildEstadoParticipacion(setup, data) {
  const rinde = data.rinde;
  const noRinde = data.no_rinde;
  const total = rinde + noRinde;
  const res = {
    ...setup,
    title: {
      ...setup.title,
      number: total,
      text: numberFormatter(total),
    },
    series: [
      {
        ...setup.series[0],
        data: [
          {
            ...setup.series[0].data[0],
            y: parseInt(rinde),
          },
          {
            ...setup.series[0].data[1],
            y: parseInt(noRinde),
          },
        ],
      },
    ],
  };
  return res;
}

export function buildCausales(setup, data) {
  const suspende = data.suspende;
  const eximido = data.eximido;
  const a19n = data.a19n;
  const voluntario = data.voluntario;
  const aplaza = data.aplaza;
  const portafolioC = data.portafolio_c;
  const total = suspende + eximido + a19n + voluntario + aplaza + portafolioC;
  const res = {
    ...setup,
    title: {
      ...setup.title,
      number: total,
      text: numberFormatter(total),
    },
    series: [
      {
        ...setup.series[0],
        data: [
          {
            ...setup.series[0].data[0],
            y: parseInt(suspende),
          },
          {
            ...setup.series[0].data[1],
            y: parseInt(eximido),
          },
          {
            ...setup.series[0].data[2],
            y: parseInt(a19n),
          },
          {
            ...setup.series[0].data[3],
            y: parseInt(voluntario),
          },
          {
            ...setup.series[0].data[4],
            y: parseInt(aplaza),
          },
          {
            ...setup.series[0].data[5],
            y: parseInt(portafolioC),
          },
        ],
      },
    ],
  };
  return res;
}

export function buildAvanceDiario(setup, data) {
  const arrFechas = [];
  const arrValidados = [];
  const arrPValidados = [];
  const arrNValidados = [];
  const arrPNValidados = [];
  const arrIngresos = [];
  const hoy = new Date();
  const tope = hoy
    .toLocaleDateString("es-CL", { day: "2-digit", month: "2-digit" })
    .replace("/", "-");
  let addFlag = true;

  Object.entries(data).forEach(([key, value]) => {
    if (key === "") {
      return;
    }
    let val_validado;
    let val_nvalidado;
    let val_pvalidado;
    let val_pnvalidado;
    let val_ingresos;

    if (!arrFechas.includes(key)) {
      arrFechas.push(key);
      arrValidados.push(key);
      arrPValidados.push(key);
      arrNValidados.push(key);
      arrPNValidados.push(key);
      arrIngresos.push(key);
    }
    if (key == tope) {
      addFlag = false;
      val_validado = value.validado;
      val_nvalidado = value.nvalidado;
      val_pvalidado = value.p_validado;
      val_pnvalidado = value.p_nvalidado;
      val_ingresos = value.ingresos;
    }
    if (arrValidados.includes(key)) {
      const index = arrValidados.indexOf(key);
      if (addFlag == true) {
        arrValidados.splice(index, 1, value.validado);
      } else {
        arrValidados.splice(index, 1, val_validado);
      }
    }

    if (arrNValidados.includes(key)) {
      const index = arrNValidados.indexOf(key);
      if (addFlag == true) {
        arrNValidados.splice(index, 1, value.nvalidado);
      } else {
        arrNValidados.splice(index, 1, val_nvalidado);
      }
    }
    if (arrPValidados.includes(key)) {
      const index = arrPValidados.indexOf(key);
      if (addFlag == true) {
        arrPValidados.splice(index, 1, value.p_validado);
      } else {
        arrPValidados.splice(index, 1, val_pvalidado);
      }
    }
    if (arrPNValidados.includes(key)) {
      const index = arrPNValidados.indexOf(key);
      if (addFlag == true) {
        arrPNValidados.splice(index, 1, value.p_nvalidado);
      } else {
        arrPNValidados.splice(index, 1, val_pnvalidado);
      }
    }
    if (arrIngresos.includes(key)) {
      const index = arrIngresos.indexOf(key);
      if (addFlag == true) {
        arrIngresos.splice(index, 1, value.ingresos);
      } else {
        arrIngresos.splice(index, 1, val_ingresos);
      }
    }
  });
  const res = {
    ...setup,
    xAxis: {
      ...setup.xAxis,
      categories: arrFechas,
    },
    series: [
      {
        ...setup.series[0],
        data: arrValidados,
      },
      {
        ...setup.series[1],
        data: arrNValidados,
      },
      {
        ...setup.series[2],
        data: arrIngresos,
      },
    ],
  };

  return res;
}

export function buildEvoCambio(setup, data) {
  const arrFechas = [];

  const arrValidados = [];
  const arrPValidados = [];

  const arrNValidados = [];
  const arrPNValidados = [];

  const arrIngresos = [];

  Object.entries(data).forEach(([key, value]) => {
    if (!arrFechas.includes(key)) {
      arrFechas.push(key);
      arrValidados.push(key);
      arrPValidados.push(key);
      arrNValidados.push(key);
      arrPNValidados.push(key);
      arrIngresos.push(key);
    }
    if (arrValidados.includes(key)) {
      const index = arrValidados.indexOf(key);
      arrValidados.splice(index, 1, value.validado);
    }

    if (arrNValidados.includes(key)) {
      const index = arrNValidados.indexOf(key);
      arrNValidados.splice(index, 1, value.nvalidado);
    }
    if (arrPValidados.includes(key)) {
      const index = arrPValidados.indexOf(key);
      arrPValidados.splice(index, 1, value.p_validado);
    }
    if (arrPNValidados.includes(key)) {
      const index = arrPNValidados.indexOf(key);
      arrPNValidados.splice(index, 1, value.p_nvalidado);
    }
    if (arrIngresos.includes(key)) {
      const index = arrIngresos.indexOf(key);
      arrIngresos.splice(index, 1, value.ingresos);
    }
  });

  const res = {
    ...setup,
    xAxis: {
      ...setup.xAxis,
      categories: arrFechas,
    },
    series: [
      {
        ...setup.series[0],
        data: arrIngresos,
      },
      {
        ...setup.series[1],
        data: arrValidados,
      },
    ],
  };

  return res;
}

export function buildEvoSuspensionEximicion(setup, data) {
  const arrFechas = [];

  const arrValidados = [];
  const arrPValidados = [];

  const arrNValidados = [];
  const arrPNValidados = [];

  const arrIngresos = [];

  Object.entries(data).forEach(([key, value]) => {
    if (!arrFechas.includes(key)) {
      arrFechas.push(key);
      arrValidados.push(key);
      arrPValidados.push(key);
      arrNValidados.push(key);
      arrPNValidados.push(key);
      arrIngresos.push(key);
    }
    if (arrValidados.includes(key)) {
      const index = arrValidados.indexOf(key);
      arrValidados.splice(index, 1, value.atendidos);
    }

    if (arrNValidados.includes(key)) {
      const index = arrNValidados.indexOf(key);
      arrNValidados.splice(index, 1, value.nvalidado);
    }
    if (arrPValidados.includes(key)) {
      const index = arrPValidados.indexOf(key);
      arrPValidados.splice(index, 1, value.p_validado);
    }
    if (arrPNValidados.includes(key)) {
      const index = arrPNValidados.indexOf(key);
      arrPNValidados.splice(index, 1, value.p_nvalidado);
    }
    if (arrIngresos.includes(key)) {
      const index = arrIngresos.indexOf(key);
      arrIngresos.splice(index, 1, value.ingresos);
    }
  });

  const res = {
    ...setup,
    xAxis: {
      ...setup.xAxis,
      categories: arrFechas,
    },
    series: [
      {
        ...setup.series[0],
        data: arrIngresos,
      },
      {
        ...setup.series[1],
        data: arrValidados,
      },
    ],
  };

  return res;
}
