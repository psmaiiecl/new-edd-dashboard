// ChartDataTable.js
import React from "react";

export const ChartDataTable = ({ series, categories }) => {
  if (!series?.length || !categories?.length) return null;

  return (
    <div style={{ overflowX: "auto", marginTop: "20px" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                background: "#f0f0f0",
              }}
            >
              Dependencia
            </th>
            {series.map((s, idx) => (
              <th
                key={idx}
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  background: s.color,
                  color: "#fff",
                }}
              >
                {s.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, rowIdx) => (
            <tr key={rowIdx}>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                {cat}
              </td>
              {series.map((s, colIdx) => {
                const punto = s.data[rowIdx];
                return (
                  <td
                    key={colIdx}
                    style={{
                      padding: "8px",
                      border: "1px solid #ccc",
                      textAlign: "center",
                    }}
                  >
                    {punto.valor} ({punto.porcentaje}%)
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChartDataTable;
