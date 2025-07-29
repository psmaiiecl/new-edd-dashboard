import React from "react";
import BarrasSemal from "./BarrasSemanal";

const generateTable = () => {
  if (!data || data.length === 0) return null;

  const chartMin = chartOptions.xAxis.min;
  const chartMax = chartOptions.xAxis.max;
  const tickInterval = 24 * 3600 * 1000;

  const dates = [];
  for (let t = chartMin; t <= chartMax; t += tickInterval) {
    dates.push(t);
  }

  const rows = dates.map((timestamp) => {
    const formattedDate = Highcharts.dateFormat("%d-%m-%Y", timestamp);

    let totalVerificada = 0;
    let totalRecepcionada = 0;
    let totalRespaldadaDD = 0;
    let totalRespaldadaNube = 0;
    let totalProcesada = 0;

    const cells = data.map((series) => {
      const point = series.data.find(
        (p) => Highcharts.dateFormat("%d-%m-%Y", p.x) === formattedDate
      );
      const value = point ? point.y : "-";
      const formatted =
        value !== "-" ? Highcharts.numberFormat(value, 0, ",", ".") : "-";

      switch (series.name) {
        case "SD Verificada":
          totalVerificada = value !== "-" ? value : totalVerificada;
          break;
        case "SD Recepcionadas":
          totalRecepcionada = value !== "-" ? value : totalRecepcionada;
          break;
        case "SD Respaldada en DD":
          totalRespaldadaDD = value !== "-" ? value : totalRespaldadaDD;
          break;
        case "SD Respaldada en Nube":
          totalRespaldadaNube = value !== "-" ? value : totalRespaldadaNube;
          break;
        case "SD Procesada":
          totalProcesada = value !== "-" ? value : totalProcesada;
          break;
        default:
          break;
      }

      return <td key={series.name}>{formatted}</td>;
    });

    const denominador =
      totalRecepcionada +
      totalRespaldadaDD +
      totalRespaldadaNube +
      totalProcesada +
      totalVerificada;
    const avance = denominador > 0 ? (totalVerificada / denominador) * 100 : 0;
    const color = avance <= 33 ? "red" : avance <= 66 ? "yellow" : "green";

    return (
      <tr key={formattedDate}>
        <td>{formattedDate}</td>
        {cells}
        <td>
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: color,
              marginRight: "5px",
            }}
          ></span>
          {avance.toFixed(1)}%
        </td>
      </tr>
    );
  });

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Fecha</th>
            {data.map((s) => (
              <th key={s.name} style={{ backgroundColor: s.color }}>
                {s.name.includes("SD")
                  ? s.name.replace("SD ", "SD<br/>")
                  : s.name}
              </th>
            ))}
            <th>% Avance</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};
export default TablaSemanal;
