import "./EstadoProcesamiento.css";

const colores = ["#FF5880", "#FF8E53", "#FFD153", "#8FB8FF", "#65D9AB"];

export default function EstadoProcesamientoDiaTable({
  series,
  minDate,
  maxDate,
}) {
  const tickInterval = 24 * 3600 * 1000;

  const totales = {};
  series.forEach((serie) => {
    totales[serie.name] = serie.data.reduce((sum, [_, val]) => sum + val, 0);
  });

  const rows = [];
  for (let time = minDate; time <= maxDate; time += tickInterval) {
    const formattedDate = new Date(time).toLocaleDateString("es-CL");

    let totalVerificada = 0;
    let totalRecepcionada = 0;
    let totalRespaldadaDD = 0;
    let totalRespaldadaNube = 0;
    let totalProcesada = 0;

    const cells = series.map((serie) => {
      const point = serie.data.find(
        (p) => new Date(p[0]).toLocaleDateString("es-CL") === formattedDate
      );
      const value = point ? point[1] : "-";
      const formattedValue =
        value !== "-" ? value.toLocaleString("es-CL") : value;

      if (serie.name === "SD Verificada")
        totalVerificada = value !== "-" ? value : 0;
      if (serie.name === "SD Recepcionadas")
        totalRecepcionada = value !== "-" ? value : 0;
      if (serie.name === "SD Respaldada en DD")
        totalRespaldadaDD = value !== "-" ? value : 0;
      if (serie.name === "SD Respaldada en Nube")
        totalRespaldadaNube = value !== "-" ? value : 0;
      if (serie.name === "SD Procesada")
        totalProcesada = value !== "-" ? value : 0;

      return <td key={serie.name}>{formattedValue}</td>;
    });

    const denom =
      totalVerificada +
      totalRecepcionada +
      totalRespaldadaDD +
      totalRespaldadaNube +
      totalProcesada;
    const porcentaje = denom > 0 ? (totalVerificada / denom) * 100 : 0;

    let color = "green";
    if (porcentaje <= 33) color = "red";
    else if (porcentaje <= 66) color = "yellow";

    rows.push(
      <tr key={time}>
        <td>{formattedDate}</td>
        {cells}
        <td>
          <span
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: color,
            }}
          />{" "}
          {(isNaN(porcentaje) ? 0 : porcentaje).toFixed(1)}%
        </td>
      </tr>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          {/* Totales */}
          <tr>
            <th style={{ background: "#ddd" }}>Total</th>
            {series.map((s, idx) => (
              <th
                key={`total-${s.name}`}
                style={{
                  backgroundColor: colores[idx] || "#ccc",
                  color: "#fff",
                }}
              >
                {totales[s.name].toLocaleString("es-CL")}
              </th>
            ))}
            <th style={{ background: "#ddd" }}>—</th>
          </tr>
          {/* Encabezado con colores */}
          <tr>
            <th style={{ background: "#eee" }}>Fecha</th>
            {series.map((s, idx) => (
              <th
                key={s.name}
                style={{
                  backgroundColor: colores[idx] || "#ccc",
                  color: "#fff",
                }}
              >
                {s.name}
              </th>
            ))}
            <th style={{ background: "#eee" }}>% Avance</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
