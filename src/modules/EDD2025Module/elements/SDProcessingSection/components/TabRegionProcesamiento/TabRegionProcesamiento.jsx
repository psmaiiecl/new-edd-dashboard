import React from "react";
import GraficoNormal from "../utils/GraficoNormal";
import GraficoPorcentaje from "../utils/GraficoPorcentaje";
import TablaTerciles from "../utils/TablaTerciles"
import { useProcesamientoRegion } from "./hooks/useProcesamientoRegion";
import { TabContent } from "../../../../../../components/Layout/TabContent";

export function TabRegionProcesamiento() {
  const { data: data, loading: loading, error } = useProcesamientoRegion();

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar los datos</p>;

  return (
    <TabContent>
      <div className="graficos-container">
        <div style={{ display: 'flex' }}>
        <GraficoPorcentaje data={data} />
        <div style={{ flex: 1 }}>
          <GraficoNormal data={data} />
        </div>
      </div>
      <TablaTerciles data={data} />
      </div >
    </TabContent >
  );
}
