export function buildAvanceDiario(data) {
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
    series: [
      {
        color: "#5157FF",
        name: "Validados",
        data: arrValidados,
      },
      {
        color: "#FF5880",
        name: "No Validados",
        data: arrNValidados,
      },
      {
        color: "#ff8e53",
        name: "Ingresos",
        data: arrIngresos,
      },
    ],
    override: {
      xAxis: {
        type: "category",
        categories: arrFechas,
        title: {
          text: "Fecha",
          style: {
            fontWeight: "bold",
            fontSize: "18px",
            color: "#666666",
          },
        },
      },
    },
  };

  return res;
}

export function buildEvolucion(data) {
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
    series: [
      {
        color: "#5157FF",
        name: "Solicitudes Creadas",
        data: arrIngresos,
      },
      {
        color: "#ff8e53",
        name: "Solicitudes Procesadas",
        data: arrValidados,
      },
    ],
    override: {
      xAxis: {
        type: "category",
        categories: arrFechas,
        title: {
          text: "Fecha",
          style: {
            fontWeight: "bold",
            fontSize: "18px",
            color: "#666666",
          },
        },
      },
    },
  };

  return res;
}
