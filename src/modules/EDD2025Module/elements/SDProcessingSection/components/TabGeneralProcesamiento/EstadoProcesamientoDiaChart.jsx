import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function EstadoProcesamientoDiaChart({ data }) {
  const options = {
    chart: {
      type: 'bar',
    },
    colors: ['#FF5880', '#FF8E53', '#FFD153', '#8FB8FF', '#65D9AB'],
    title: { text: '' },
    subtitle: {
      text: '<b>Estado de Procesamiento de las SD Recepcionadas cada día</b>',
      align: 'center',
      style: { fontSize: '15px' },
    },
    xAxis: {
      type: 'datetime',
      tickInterval: 24 * 3600 * 1000,
     
      labels: {
        format: '{value:%d-%m-%Y}',
        style: { fontSize: '14px' },
      },
    },
    yAxis: {
      visible: true,
      title: { text: '' },
      labels: {
        format: '{value}',
        style: { fontSize: '13px' },
      },
    },
    time: {
      timezone: 'America/Santiago',
      useUTC: false,
    },
    tooltip: {
      formatter: function () {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const months = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
        ];
        const date = new Date(this.x);
        return `<b>${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]}</b><br/>
                Cantidad: ${Highcharts.numberFormat(this.y, 0, ',', '.')}`;
      },
    },
    legend: {
      fontSize: '12px',
    },
    plotOptions: {
      bar: {
        stacking: 'normal',
        pointWidth: 20,
        pointPadding: 0.9,
      },
    },
   data: data.series,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
