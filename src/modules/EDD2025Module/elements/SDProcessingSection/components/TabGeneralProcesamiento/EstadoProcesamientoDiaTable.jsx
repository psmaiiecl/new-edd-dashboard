import Highcharts from 'highcharts';

export default function EstadoProcesamientoDiaTable({ series, minDate, maxDate }) {
  const days = [];
  const tickInterval = 24 * 3600 * 1000;
  for (let t = minDate; t <= maxDate; t += tickInterval) {
    days.push(t);
  }

  const formatDate = (timestamp) => Highcharts.dateFormat('%d-%m-%Y', timestamp);

  const calcularPorcentajeAvance = (valores) => {
    const { verificada, recepcionada, respaldadaDD, respaldadaNube, procesada } = valores;
    const total = verificada + recepcionada + respaldadaDD + respaldadaNube + procesada;
    return total > 0 ? (verificada / total) * 100 : 0;
  };

  const renderFila = (timestamp) => {
    const fecha = formatDate(timestamp);
    const valores = { verificada: 0, recepcionada: 0, respaldadaDD: 0, respaldadaNube: 0, procesada: 0 };
    const celdas = series.map(s => {
      const punto = s.data.find(p => formatDate(p.x) === fecha);
      const val = punto ? punto.y : '-';
      if (val !== '-') {
        if (s.name === 'SD Verificada') valores.verificada = val;
        if (s.name === 'SD Recepcionadas') valores.recepcionada = val;
        if (s.name === 'SD Respaldada en DD') valores.respaldadaDD = val;
        if (s.name === 'SD Respaldada en Nube') valores.respaldadaNube = val;
        if (s.name === 'SD Procesada') valores.procesada = val;
      }
      return <td key={s.name}>{val !== '-' ? Highcharts.numberFormat(val, 0, ',', '.') : '-'}</td>;
    });

    const porcentaje = calcularPorcentajeAvance(valores);
    const color =
      porcentaje <= 33 ? 'red' : porcentaje <= 66 ? 'yellow' : 'green';

    return (
      <tr key={fecha}>
        <td>{fecha}</td>
        {celdas}
        <td>
          <span style={{
            display: 'inline-block',
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: color,
            marginRight: 4,
          }}></span>
          {porcentaje.toFixed(1)}%
        </td>
      </tr>
    );
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Fecha</th>
            {series.map(s => (
              <th key={s.name} style={{ backgroundColor: s.color }}>{s.name.replace('SD ', 'SD<br/>')}</th>
            ))}
            <th>% Avance</th>
          </tr>
        </thead>
        <tbody>
          {days.map(renderFila)}
        </tbody>
      </table>
    </div>
  );
}
