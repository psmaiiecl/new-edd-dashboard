import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function PrecapacitacionPieChart({ subtitle, rawData, dataMapper, colors }) {
  const seriesData = dataMapper(rawData || []);

  const options = {
    chart: { type: "pie" },
    title: { text: subtitle },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> ({point.y})',
    },
    accessibility: { point: { valueSuffix: "%" } },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        colors: colors,
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.percentage:.1f}%",
        },
      },
    },
    series: [{
      name: "Porcentaje",
      colorByPoint: true,
      data: seriesData,
    }],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
