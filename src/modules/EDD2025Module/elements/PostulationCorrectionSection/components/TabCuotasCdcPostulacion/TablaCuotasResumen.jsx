export default function TablaCuotasResumen({ data }) {
  if (!data || !data.resumen) return null;

  return (
    <table className="tabla-cuotas">
      <thead>
        <tr>
          <th>Código CdC</th>
          <th>Total de Postulaciones</th>
          <th>Postulados</th>
          <th>Preseleccionados</th>
          <th>Seleccionados</th>
          <th>% Seleccionados</th>
        </tr>
      </thead>
      <tbody>
        {data.resumen.map((fila, idx) => (
          <tr key={idx}>
            <td>{fila.cdc}</td>
            <td>{fila.total}</td>
            <td>{fila.postulados}</td>
            <td>{fila.preseleccionados}</td>
            <td>{fila.seleccionados}</td>
            <td>{fila.porcentaje}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
