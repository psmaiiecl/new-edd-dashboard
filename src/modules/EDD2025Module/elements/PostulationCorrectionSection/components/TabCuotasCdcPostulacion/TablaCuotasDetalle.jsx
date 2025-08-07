export default function TablaCuotasDetalle({ data }) {
  return (
    <table className="tabla-cuotas">
      <thead>
        <tr>
          <th>Especialidad</th>
          <th>Módulo</th>
          <th>Postulados</th>
          <th>Correctores</th>
          <th>Rec.</th>
          <th>Supervisores</th>
          <th>Seleccionados</th>
          <th>Lista Espera</th>
          <th>% Lista Espera</th>
        </tr>
      </thead>
      <tbody>
        {data.map((fila, idx) => (
          <tr key={idx}>
            <td>{fila.especialidad}</td>
            <td>{fila.modulo}</td>
            <td>{fila.postulados}</td>
            <td>{fila.correctores}</td>
            <td>{fila.reclutados}</td>
            <td>{fila.supervisores}</td>
            <td>{fila.seleccionados}</td>
            <td>{fila.lista_espera}</td>
            <td>{fila.porcentaje_espera}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
