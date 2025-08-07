// ./AvanceDiarioChartPostulacion.jsx
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function AvanceDiarioChartPostulacion({ fechas, series }) {
  const chartOptions = {
    title: {
      text: "Avance Diario Postulaciones",
      align: "center",
      style: { fontWeight: "bold", fontSize: "22px" },
    },
    credits: { enabled: false },
    yAxis: {
      title: {
        text: "Cantidad de postulaciones",
        style: { fontSize: "12px" },
      },
      labels: { style: { fontSize: "13px" } },
      minTickInterval: 1,
    },
    xAxis: {
      categories: fechas,
      labels: { style: { fontSize: "13px" } },
    },
    legend: {
      itemStyle: { fontSize: "12px" },
    },
    tooltip: {
      style: { fontSize: "12px" },
    },
    plotOptions: {
      series: {
        label: { connectorAllowed: false },
      },
    },
    series,
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
