// components/GraficoProcesamientoCtg.jsx
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function GraficoPorcentaje({ data }) {
  if (!data) return null; // ⛔️ Previene crash por data null

  const options = {
    chart: {
      type: "bar",
      height: 600,
      style: { color: "#333333", fontSize: "14px", fontWeight: "bold" },
    },
    title: {
      text: "",
      align: "center",
      style: { fontWeight: "bold", color: "#5157FF", fontSize: "35px" },
    },
    xAxis: {
      categories: data.categories,
      labels: { style: { fontSize: "12px" } },
    },
    yAxis: {
      min: 0,
      title: { enabled: false },
      labels: { format: "{value}%", style: { fontSize: "12px" } },
    },
    tooltip: {
      pointFormat: '<span style="font-size:12px;"><span style="color:{series.color}">{series.name}</span>: {point.percentage:.0f}%</span><br/>',
      shared: true
    },
    plotOptions: { bar: { stacking: "percent" } },
    series: data.series.slice(1)
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
