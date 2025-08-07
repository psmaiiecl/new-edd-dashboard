export default function TablaCuotasCDC({ data, centro }) {
  let suma = {
    postulados: 0,
    requeridos_corr: 0,
    requeridos_sup: 0,
    pre_corr: 0,
    pre_sup: 0,
    sel_corr: 0,
    sel_sup: 0,
    espera: 0,
  };

  const getColorDot = (value, requerido) => {
    if (requerido > 0) {
      if (value > requerido) return "yellow";
      if (value === requerido) return "green";
      return "red";
    }
    return null;
  };

  const getColorByPercentage = (percentage) => {
    if (percentage < 80) return "#ecb0bd";
    if (percentage < 100) return "#b3e9ad";
    return "#fbf3d5";
  };

  return (
    <>
      <h4>Centro: {centro}</h4>
      <table border="1" cellPadding={5} style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Especialidad</th>
            <th>Módulo</th>
            <th>Postulados</th>
            <th>Requeridos Corr</th>
            <th>Preseleccionados Corr</th>
            <th>Seleccionados Corr</th>
            <th>Requeridos Sup</th>
            <th>Preseleccionados Sup</th>
            <th>Seleccionados Sup</th>
            <th>Lista Espera</th>
            <th>EDS</th>
          </tr>
        </thead>
        <tbody>
          {data?.especialidad?.map((esp) =>
            esp.modulos.map((modulo, idx) => {
              const datos = modulo.datos_modulo;

              suma.postulados += parseInt(datos.reclutado) || 0;
              suma.requeridos_corr += parseInt(datos.correctores_requeridos) || 0;
              suma.requeridos_sup += parseInt(datos.supervisores_requeridos) || 0;
              suma.pre_corr += parseInt(datos.preseleccionado) || 0;
              suma.pre_sup += parseInt(datos.preseleccionado_supervisor) || 0;
              suma.sel_corr += parseInt(datos.seleccionado) || 0;
              suma.sel_sup += parseInt(datos.seleccionado_supervisor) || 0;
              suma.espera += parseInt(datos.lista_espera) || 0;

              return (
                <tr key={esp.nombre_especialidad + idx}>
                  <td>{esp.nombre_especialidad}</td>
                  <td>{modulo.nombre_modulo}</td>
                  <td>{datos.reclutado}</td>
                  <td>{datos.correctores_requeridos}</td>
                  <td>{datos.preseleccionado}</td>
                  <td>
                    <ColoredDot value={datos.seleccionado} requerido={datos.correctores_requeridos} />
                  </td>
                  <td>{datos.supervisores_requeridos}</td>
                  <td>{datos.preseleccionado_supervisor}</td>
                  <td>
                    <ColoredDot value={datos.seleccionado_supervisor} requerido={datos.supervisores_requeridos} />
                  </td>
                  <td>{datos.lista_espera}</td>
                  <td colSpan="3">{datos.eds}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Totales */}
      <div style={{ marginTop: "1rem" }}>
        <p><strong>Postulados:</strong> {suma.postulados}</p>
        <p><strong>Correctores Requeridos:</strong> {suma.requeridos_corr}</p>
        <p><strong>Supervisores Requeridos:</strong> {suma.requeridos_sup}</p>
        <p><strong>Seleccionados Corr:</strong> {suma.sel_corr}</p>
        <p><strong>Seleccionados Sup:</strong> {suma.sel_sup}</p>

        <p>
          <strong>% Seleccionados Corr:</strong>{" "}
          <span style={{ backgroundColor: getColorByPercentage((suma.sel_corr / suma.requeridos_corr) * 100) }}>
            {((suma.sel_corr / suma.requeridos_corr) * 100).toFixed(1)}%
          </span>
        </p>
        <p>
          <strong>% Seleccionados Sup:</strong>{" "}
          <span style={{ backgroundColor: getColorByPercentage((suma.sel_sup / suma.requeridos_sup) * 100) }}>
            {((suma.sel_sup / suma.requeridos_sup) * 100).toFixed(1)}%
          </span>
        </p>
      </div>
    </>
  );
}

function ColoredDot({ value, requerido }) {
  const color = value > requerido ? "yellow" : value === requerido ? "green" : "red";
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color, fontSize: 20, marginRight: 5 }}>●</span>
      <span>{value}</span>
    </div>
  );
}
