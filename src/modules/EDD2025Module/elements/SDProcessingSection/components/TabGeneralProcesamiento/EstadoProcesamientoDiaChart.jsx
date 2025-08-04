import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useProcesamientoDiarioChart } from './hooks/useProcesamientoDiarioChart';

export default function EstadoProcesamientoDiaChart() {
  const { series, categories, loading, error } = useProcesamientoDiarioChart();

  if (loading) return <p>Cargando gráfico...</p>;
  if (error) return <p>Error al cargar gráfico: {error.message}</p>;

  const options = {
    chart: { type: 'bar' },
    colors: ['#FF5880', '#FF8E53', '#FFD153', '#8FB8FF', '#65D9AB'],
    title: { text: '' },
    subtitle: {
      text: '<b>Estado de Procesamiento de las SD Recepcionadas cada día</b>',
      align: 'center',
      style: { fontSize: '15px' },
    },
    xAxis: {
      categories,
      title: { text: 'Fecha' },
      labels: { style: { fontSize: '13px' } },
    },
    yAxis: {
      min: 0,
      title: { text: 'Cantidad' },
      labels: { style: { fontSize: '13px' } },
    },
    tooltip: { shared: true, valueDecimals: 0 },
    legend: { itemStyle: { fontSize: '12px' } },
    plotOptions: {
      bar: {
        stacking: 'normal',
        borderWidth: 0,
      },
    },
    series,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
