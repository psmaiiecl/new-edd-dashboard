import { useState } from "react";
import { useCuotasCdcPostulacion } from "./hooks/useCuotasCdcPostulacion";
import TablaCuotasCDC from "./TablaCuotasCDC";

export default function TabCuotasCdcPostulacion() {
  const [centroSeleccionado, setCentroSeleccionado] = useState("SOME_CENTRO");
  const { resumen, detalle, loading } = useCuotasCdcPostulacion(centroSeleccionado);

  return (
    <div>
      <h3>Postulación - Cuotas CDC</h3>

      {loading && <p>Cargando...</p>}

      {/* Filtro Centro CDC */}
      <select
        value={centroSeleccionado}
        onChange={(e) => setCentroSeleccionado(e.target.value)}
      >
        {/* Opciones dinámicas si vienen desde `resumen` */}
        {resumen?.centros?.map((centro) => (
          <option key={centro} value={centro}>
            {centro.toUpperCase()}
          </option>
        ))}
      </select>

      {detalle && (
        <TablaCuotasCDC data={detalle} centro={centroSeleccionado} />
      )}
    </div>
  );
}
