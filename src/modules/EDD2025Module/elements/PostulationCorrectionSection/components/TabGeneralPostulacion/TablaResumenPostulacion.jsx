// ./TablaResumenPostulacion.jsx
export default function TablaResumenPostulacion({ resumen }) {
  const nf = new Intl.NumberFormat("es-CL");

  return (
    <table className="highcharts-data-table" id="custom-table">
      <thead>
        <tr>
         
          <th style={{ backgroundColor: "#719af7" }}>Total Postulantes</th>
           <th style={{ backgroundColor: "#ffc729" }}>Total Requeridos</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{nf.format(resumen.total_postulantes)}</td>
          <td>{nf.format(resumen.total_requeridos)}</td>

        </tr>
      </tbody>
    </table>
  );
}
