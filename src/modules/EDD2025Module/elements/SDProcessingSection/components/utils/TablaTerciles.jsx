import React from "react";
import { formatearNumero, formatearPorcentaje } from "./FormatearNumero";

export default function TablaTerciles({ data }) {
  const avancesRecuperacionSD = data.categories.map(
    (_, i) => (data.series[2].data[i] / data.series[8].data[i]) * 100
  );

  const avancesRespaldoNube = data.categories.map(
    (_, i) =>
      (data.series[7].data[i] /
        (data.series[2].data[i] +
          data.series[3].data[i] +
          data.series[4].data[i] +
          data.series[5].data[i] +
          data.series[6].data[i] +
          data.series[7].data[i])) *
      100
  );

  const calcularTerciles = (arr) => {
    const sorted = [...arr].sort((a, b) => a - b);
    const tercio = (sorted[sorted.length - 1] - sorted[0]) / 3;
    return [sorted[0] + tercio, sorted[0] + 2 * tercio];
  };

  const [t1Recup, t2Recup] = calcularTerciles(avancesRecuperacionSD);
  const [t1Nube, t2Nube] = calcularTerciles(avancesRespaldoNube);

  const colorTercil = (valor, t1, t2) => {
    if (valor <= t1) return "red";
    if (valor <= t2) return "yellow";
    return "green";
  };

  return (
    <div className="tabla-convocatoria">
      <table>
        <thead>
          <tr>
            <th>Convocatoria</th>

            <th>Grabaciones Totales</th>
            <th style={{ background: data.series[8].color }}>
              Grabaciones Realizadas
            </th>
            <th style={{ background: data.series[1].color }}>SD Pendientes</th>
            <th style={{ background: data.series[2].color }}>SD Recuperadas</th>
            <th>Avance Recuperación SD (%)</th>
            <th style={{ background: data.series[3].color }}>SD en Caja</th>
            <th style={{ background: data.series[4].color }}>
              SD Respaldadas en DD
            </th>
            <th style={{ background: data.series[5].color }}>SD en Nube</th>
            <th style={{ background: data.series[6].color }}>SD Procesadas</th>
            <th style={{ background: data.series[7].color }}>SD Verificadas</th>
            <th>Avance Respaldo en Nube (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.categories.map((cat, i) => {
            const avanceRecup = avancesRecuperacionSD[i];
            const avanceNube = avancesRespaldoNube[i];

            return (
              <tr key={cat}>
                <td>{cat}</td>
                <td>{formatearNumero(data.series[0].data[i])}</td>
                <td>{formatearNumero(data.series[8].data[i])}</td>
                <td>{formatearNumero(data.series[1].data[i])}</td>
                <td>{formatearNumero(data.series[2].data[i])}</td>
                <td>
                  <span
                    style={{
                      color: colorTercil(avanceRecup, t1Recup, t2Recup),
                      fontSize: "20px",
                    }}
                  >
                    ●
                  </span>{" "}
                  {isNaN(avanceRecup) ? 0 : avanceRecup.toFixed(1)}%
                </td>
                <td>{formatearNumero(data.series[3].data[i])}</td>
                <td>{formatearNumero(data.series[4].data[i])}</td>
                <td>{formatearNumero(data.series[5].data[i])}</td>
                <td>{formatearNumero(data.series[6].data[i])}</td>
                <td>{formatearNumero(data.series[7].data[i])}</td>
                <td>
                  <span
                    style={{
                      color: colorTercil(avanceNube, t1Nube, t2Nube),
                      fontSize: "20px",
                    }}
                  >
                    ●
                  </span>{" "}
                  {isNaN(avanceNube) ? 0 : avanceNube.toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
