import React from "react";
import "./TablaEstadoPrecapacitacion.css"; // Importa estilos por separado

export default function TablaEstadoPrecapacitacion({ data }) {
  if (!data || data.length === 0) return <div>Cargando datos...</div>;

  // Separa datos por tipo
  const supervisor = data.find((item) => item.tipo === "SUPERVISOR");
  const corrector = data.find((item) => item.tipo === "CORRECTOR");

  const campos = [
    { key: "no_iniciada", label: "No Iniciada", color: "#f85a8b" },
    { key: "unidad1", label: "En Unidad 1", color: "#ffd54f" },
    { key: "unidad2", label: "En Unidad 2", color: "#ffecb3" },
    { key: "unidad3", label: "En Unidad 3", color: "#90caf9" },
    { key: "unidad4", label: "En Unidad 4", color: "#81d4fa" },
    { key: "terminada", label: "Terminada", color: "#80cbc4" },
  ];

  const renderRow = (titulo, item) => (
    <tr>
      <td className="estado-label">{titulo}</td>
      {campos.map((campo) => (
        <td key={campo.key}>{item?.[campo.key] ?? 0}</td>
      ))}
      <td><strong>{item?.total ?? 0}</strong></td>
    </tr>
  );

  return (
    <div className="tabla-wrapper">
      <table className="tabla-estado">
        <thead>
          <tr>
            <th>Estado</th>
            {campos.map((campo) => (
              <th key={campo.key} style={{ backgroundColor: campo.color }}>
                {campo.label}
              </th>
            ))}
            <th style={{ backgroundColor: "#e0e0e0" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {renderRow("Supervisores", supervisor)}
          {renderRow("Correctores", corrector)}
        </tbody>
      </table>
    </div>
  );
}
