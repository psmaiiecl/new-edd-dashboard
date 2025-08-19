import { useState } from "react";
import { useCuotasCdcResumen } from "./hooks/useCuotasCdcResumen";
import TablaResumenCdc from "./TablaResumenCdc";
import TablaCuotasCDC from "./TablaCuotasCDC";

import "./TabCuotasCdcPostulacion.css";

export default function TabCuotasCdcPostulacion() {
  const { data, loading } = useCuotasCdcResumen();
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");

  if (loading) return <p>Cargando...</p>;
  if (!data || data.length === 0) return <p>No hay datos para mostrar</p>;

  // Filtrar detalle por especialidad seleccionada
  const detalleFiltrado = especialidadSeleccionada
    ? data.filter((row) => row.especialidad === especialidadSeleccionada)
    : [];

  // Obtener lista de especialidades únicas para el select
  const especialidades = [...new Set(detalleFiltrado.map((r) => r.especialidad))];

  return (
    <div className="tab-cdc-container">
      {/* Tabla resumen con todos los datos */}
      <TablaResumenCdc data={data} />

      {/* Filtro de especialidad */}
      {especialidades.length > 0 && (
        <div className="selector-especialidad">
          <label htmlFor="especialidad-select">Filtrar por Especialidad:</label>
          <select
            id="especialidad-select"
            value={especialidadSeleccionada}
            onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
          >
            <option value="">--Seleccione una especialidad--</option>
            {especialidades.map((esp) => (
              <option key={esp} value={esp}>
                {esp}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Tabla detalle filtrada */}
      {detalleFiltrado.length > 0 && (
        <>
          <h3>Detalle de {especialidadSeleccionada}</h3>
          <TablaCuotasCDC data={detalleFiltrado} />
        </>
      )}
    </div>
  );
}
