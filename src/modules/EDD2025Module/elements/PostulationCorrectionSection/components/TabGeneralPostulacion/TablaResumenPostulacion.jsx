// ./TablaResumenPostulacion.jsx
export default function TablaResumenPostulacion({ resumen }) {
  const nf = new Intl.NumberFormat("es-CL");

  return (
    <table className="highcharts-data-table" id="custom-table">
      <thead>
        <tr>
          <th style={{ backgroundColor: "#ffc729" }}>Total <br />Seleccionados Requeridos</th>
          <th style={{ backgroundColor: "#ffd55d" }}>Total <br />Correctores Requeridos</th>
          <th style={{ backgroundColor: "#ffe59b" }}>Total <br />Supervisores Requeridos</th>
          <th style={{ backgroundColor: "#719af7" }}>Postulantes <br />Totales</th>
          <th style={{ backgroundColor: "#8fb0f9" }}>Postulantes <br />Sólo a Corrector</th>
          <th style={{ backgroundColor: "#bdd0fb" }}>Pueden ser <br />Supervisor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{nf.format(resumen.total_requeridos)}</td>
          <td>{nf.format(resumen.correctores_requeridos)}</td>
          <td>{nf.format(resumen.supervisores_requeridos)}</td>
          <td>{nf.format(resumen.postulantes_totales)}</td>
          <td>{nf.format(resumen.total_correctores)}</td>
          <td>{nf.format(resumen.total_supervisores)}</td>
        </tr>
      </tbody>
    </table>
  );
}
