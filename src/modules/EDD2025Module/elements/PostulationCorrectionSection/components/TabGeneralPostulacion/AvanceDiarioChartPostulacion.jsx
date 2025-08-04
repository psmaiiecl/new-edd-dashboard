import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function AvanceDiarioChartPostulacion({ data }) {
  if (!data) return null;

  const { fechas, series, resumen } = data;

  const options = {
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

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div id="tabla_avance_diario_postulaciones" className="mt-4">
        <table className="w-full text-center border-collapse text-sm font-semibold">
          <thead>
            <tr>
              <th style={{ backgroundColor: "#ffc729" }}>
                Total <br />Seleccionados Requeridos
              </th>
              <th style={{ backgroundColor: "#ffd55d" }}>
                Total <br />Correctores Requeridos
              </th>
              <th style={{ backgroundColor: "#ffe59b" }}>
                Total <br />Supervisores Requeridos
              </th>
              <th style={{ backgroundColor: "#719af7" }}>
                Postulantes <br />Totales
              </th>
              <th style={{ backgroundColor: "#8fb0f9" }}>
                Postulantes <br />Sólo a Corrector
              </th>
              <th style={{ backgroundColor: "#bdd0fb" }}>
                Pueden ser <br />Supervisor
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{resumen.total_seleccionados_requeridos}</td>
              <td>{resumen.correctores_requeridos}</td>
              <td>{resumen.supervisores_requeridos}</td>
              <td>{resumen.postulantes_totales}</td>
              <td>{resumen.total_correctores}</td>
              <td>{resumen.total_supervisores}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
