export default function TablaResumenCdc({ data }) {
  const nf = new Intl.NumberFormat("es-CL");

  if (!data) return <p>No hay datos para mostrar</p>;

  // Convertir objeto a array
  const resumenArray = Object.entries(data).map(([cdc, info]) => ({
    cdc,
    total_postulaciones: info.total_de_postulaciones,
    postulados: info.reclutado,
    correctores_requeridos: info.correctores_requeridos,
    correctores_preseleccionados: info.correctores_preseleccionados,
    correctores_seleccionados: info.correctores_seleccionados,
    correctores_pct: info.correctores_pct,
    supervisores_requeridos: info.supervisores_requeridos,
    supervisores_preseleccionados: info.supervisores_preseleccionados,
    supervisores_seleccionados: info.supervisores_seleccionados,
    supervisores_pct: info.supervisores_pct,
    lista_espera: info.lista_espera,
  }));

  return (
    <div className="tabla-container">
      <h3>Resumen por Centro de Corrección</h3>
      <table className="tabla-cdc">
        <thead>
          <tr>
            <th rowSpan="2">CdC</th>
            <th rowSpan="2">Total de Postulaciones</th>
            <th colSpan="1" className="postulados">Postulados</th>
            <th colSpan="4" className="correctores">Correctores</th>
            <th colSpan="4" className="supervisores">Supervisores</th>
            <th rowSpan="2" className="espera">Lista de Espera</th>
          </tr>
          <tr>
            <th>Postulados</th>
            <th>Requeridos</th>
            <th>Preseleccionados</th>
            <th>Seleccionados</th>
            <th>% Seleccionados</th>
            <th>Requeridos</th>
            <th>Preseleccionados</th>
            <th>Seleccionados</th>
            <th>% Seleccionados</th>
          </tr>
        </thead>
        <tbody>
          {resumenArray.map((row, i) => (
            <tr key={i}>
              <td>{row.cdc}</td>
              <td>{nf.format(row.total_postulaciones)}</td>
              <td>{nf.format(row.postulados)}</td>
              <td>{nf.format(row.correctores_requeridos)}</td>
              <td>{nf.format(row.correctores_preseleccionados)}</td>
              <td>{nf.format(row.correctores_seleccionados)}</td>
              <td className="percent">{row.correctores_pct}%</td>
              <td>{nf.format(row.supervisores_requeridos)}</td>
              <td>{nf.format(row.supervisores_preseleccionados)}</td>
              <td>{nf.format(row.supervisores_seleccionados)}</td>
              <td className="percent">{row.supervisores_pct}%</td>
              <td>{nf.format(row.lista_espera)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
