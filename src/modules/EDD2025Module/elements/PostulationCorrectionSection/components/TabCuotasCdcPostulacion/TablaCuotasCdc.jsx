// import "./TablaCuotasCdc.css";

export default function TablaCuotasCdc({ resumen, centro }) {
  // Construir arreglo de filas desde resumen
  const filas =
    resumen?.especialidad?.flatMap((esp) =>
      esp.modulos.map((modulo) => {
        const datos = modulo.datos_modulo || {};

        return {
          centro,
          postulaciones: parseInt(datos.reclutado) || 0,
          corr30: parseInt(datos.correctores_mas_30) || 0,
          corr10: parseInt(datos.correctores_mas_10) || 0,
          correctores: parseInt(datos.correctores) || 0,
          sel_corr: parseInt(datos.seleccionado) || 0,
          req_sup: parseInt(datos.supervisores_requeridos) || 0,
          sel_sup: parseInt(datos.seleccionado_supervisor) || 0,
          espera: parseInt(datos.lista_espera) || 0,
        };
      })
    ) || [];

  // Suma de totales
  const suma = filas.reduce(
    (acc, fila) => {
      acc.postulaciones += fila.postulaciones;
      acc.corr30 += fila.corr30;
      acc.corr10 += fila.corr10;
      acc.correctores += fila.correctores;
      acc.sel_corr += fila.sel_corr;
      acc.req_sup += fila.req_sup;
      acc.sel_sup += fila.sel_sup;
      acc.espera += fila.espera;
      return acc;
    },
    {
      postulaciones: 0,
      corr30: 0,
      corr10: 0,
      correctores: 0,
      sel_corr: 0,
      req_sup: 0,
      sel_sup: 0,
      espera: 0,
    }
  );

  const getColorByPercentage = (percentage) => {
    if (percentage < 80) return "#ecb0bd"; // rojo claro
    if (percentage < 100) return "#b3e9ad"; // verde claro
    return "#fbf3d5"; // amarillo claro
  };

  return (
    <>
      <h4>Centro: {centro}</h4>
      <table
        className="tabla-cuotas"
        border="1"
        cellPadding={5}
        style={{ width: "100%", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th rowSpan={2}>Centro</th>
            <th rowSpan={2}>Total Postulaciones</th>
            <th colSpan={5}>Correctores</th>
            <th colSpan={3}>Supervisores</th>
            <th rowSpan={2}>Lista de Espera</th>
          </tr>
          <tr>
            <th>Correctores +30%</th>
            <th>Correctores +10%</th>
            <th>Correctores</th>
            <th>Seleccionados</th>
            <th>% Seleccionados</th>
            <th>Requeridos</th>
            <th>Seleccionados</th>
            <th>% Seleccionados</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, idx) => {
            const perc_corr = fila.correctores
              ? (fila.sel_corr / fila.correctores) * 100
              : 0;
            const perc_sup = fila.req_sup
              ? (fila.sel_sup / fila.req_sup) * 100
              : 0;

            return (
              <tr key={idx}>
                <td>{fila.centro}</td>
                <td>{fila.postulaciones}</td>
                <td>{fila.corr30}</td>
                <td>{fila.corr10}</td>
                <td>{fila.correctores}</td>
                <td>{fila.sel_corr}</td>
                <td style={{ backgroundColor: getColorByPercentage(perc_corr) }}>
                  {perc_corr.toFixed(1)}%
                </td>
                <td>{fila.req_sup}</td>
                <td>{fila.sel_sup}</td>
                <td style={{ backgroundColor: getColorByPercentage(perc_sup) }}>
                  {perc_sup.toFixed(1)}%
                </td>
                <td>{fila.espera}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th>{suma.postulaciones}</th>
            <th>{suma.corr30}</th>
            <th>{suma.corr10}</th>
            <th>{suma.correctores}</th>
            <th>{suma.sel_corr}</th>
            <th
              style={{
                backgroundColor: getColorByPercentage(
                  (suma.sel_corr / suma.correctores) * 100
                ),
              }}
            >
              {((suma.sel_corr / suma.correctores) * 100 || 0).toFixed(1)}%
            </th>
            <th>{suma.req_sup}</th>
            <th>{suma.sel_sup}</th>
            <th
              style={{
                backgroundColor: getColorByPercentage(
                  (suma.sel_sup / suma.req_sup) * 100
                ),
              }}
            >
              {((suma.sel_sup / suma.req_sup) * 100 || 0).toFixed(1)}%
            </th>
            <th>{suma.espera}</th>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
