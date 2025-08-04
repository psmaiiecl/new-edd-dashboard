
// src/modules/EDD2025Module/components/GraficoEvolucion.jsx
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


export default function EvolucionProcesamientoSDChart({ data }) {
  if (!data || !data.series || data.series.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <p>No hay datos disponibles para mostrar.</p>
      </div>
    );
  }

  const options = {
    chart: {
      type: 'area',
      style: {
        color: '#666666',
        fontSize: '14px',
        fontWeight: 'bold',
      },
    },
    colors: ['#FF5880', '#FF8E53', '#FFD153', '#8FB8FF', '#65D9AB'],
    title: { text: '', style: { fontWeight: 'bold', color: '#5157FF', fontSize: '35px' } },
    subtitle: {
      text: '<b>Evolución del procesamiento de tarjetas SD desde su recepción</b>',
      align: 'center',
      style: { fontSize: '15px' },
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { day: '%e %b' },
      tickInterval: 48 * 3600 * 1000,
      breaks: [{
        from: Date.UTC(2024, 10, 7),
        to: Date.UTC(2024, 10, 18),
        breakSize: 0,
      }],
    },
    yAxis: {
      title: { text: '' },
      labels: {
        formatter: function () {
          return new Intl.NumberFormat().format(this.value);
        },
      },
    },
    plotOptions: {
      area: { stacking: true },
    },
    time: {
      timezone: 'America/Santiago',
      useUTC: false,
    },
    tooltip: {
      xDateFormat: '%A, %d de %b',
      formatter: function () {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const date = new Date(this.x);
        const dayName = days[date.getDay()];
        return `<b>${dayName}, ${Highcharts.dateFormat('%d de %b', this.x)}</b><br/>
                Cantidad: ${new Intl.NumberFormat().format(this.y)}`;
      },
    },
    series: data.series,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

