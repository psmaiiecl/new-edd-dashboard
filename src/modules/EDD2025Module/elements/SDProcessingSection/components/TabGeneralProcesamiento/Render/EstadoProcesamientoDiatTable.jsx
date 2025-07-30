import "./EstadoProcesamiento.css";

export default function EstadoProcesamientoDiaTable({ series, minDate, maxDate }) {
  const tickInterval = 24 * 3600 * 1000; // 1 día en ms

  // Colores alineados a las series
  const chartColors = ['#FF5880', '#FF8E53', '#FFD153', '#8FB8FF', '#65D9AB'];

  // Totales por serie
  const totals = series.map((serie) => {
    let total = 0;
    serie.data.forEach((point) => {
      const value = point[1];
      if (typeof value === 'number') {
        total += value;
      }
    });
    return total;
  });

  // Filas de fechas
  const rows = [];
  for (let time = minDate; time <= maxDate; time += tickInterval) {
    const formattedDate = new Date(time).toLocaleDateString('es-CL');
    let totalVerificada = 0;
    let totalRecepcionada = 0;
    let totalRespaldadaDD = 0;
    let totalRespaldadaNube = 0;
    let totalProcesada = 0;

    const cells = series.map((serie) => {
      const point = serie.data.find(
        (p) => new Date(p[0]).toLocaleDateString('es-CL') === formattedDate
      );
      const value = point ? point[1] : '-';
      const formattedValue = value !== '-' ? value.toLocaleString('es-CL') : value;

      if (serie.name === 'SD Verificada') totalVerificada = value !== '-' ? value : 0;
      if (serie.name === 'SD Recepcionadas') totalRecepcionada = value !== '-' ? value : 0;
      if (serie.name === 'SD Respaldada en DD') totalRespaldadaDD = value !== '-' ? value : 0;
      if (serie.name === 'SD Respaldada en Nube') totalRespaldadaNube = value !== '-' ? value : 0;
      if (serie.name === 'SD Procesada') totalProcesada = value !== '-' ? value : 0;

      return <td key={serie.name}>{formattedValue}</td>;
    });

    const denom = totalVerificada + totalRecepcionada + totalRespaldadaDD + totalRespaldadaNube + totalProcesada;
    const porcentaje = denom > 0 ? (totalVerificada / denom) * 100 : 0;

    let color = 'green';
    if (porcentaje <= 33) color = 'red';
    else if (porcentaje <= 66) color = 'yellow';

    rows.push(
      <tr key={time}>
        <td>{formattedDate}</td>
        {cells}
        <td>
          <span
            style={{
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: color,
            }}
          />{' '}
          {porcentaje.toFixed(1)}%
        </td>
      </tr>
    );
  }

  return (
    <div id="tabla_estado_procesamiento_semana">
      <table>
        <thead>
          <tr>
            <th>Total</th>
            {totals.map((total, index) => (
              <th
                key={`total-${index}`}
                style={{
                  backgroundColor: chartColors[index] || '#ccc',
                  color: 'black',
                  padding: '6px',
                }}
              >
                {total.toLocaleString('es-CL')}
              </th>
            ))}
            <th>-</th>
          </tr>
          <tr>
            <th>Fecha</th>
            {series.map((s, index) => (
              <th
                key={s.name}
                style={{
                  backgroundColor: chartColors[index] || '#ccc',
                  color: 'black',
                  padding: '6px',
                }}
              >
                {s.name}
              </th>
            ))}
            <th>% Avance</th>
          </tr>
          {/* Fila de totales */}
          
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
