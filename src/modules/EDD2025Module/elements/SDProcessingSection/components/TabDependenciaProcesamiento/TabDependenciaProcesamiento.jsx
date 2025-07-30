import React from "react";
import { useProcesamientoDependencia } from "./hooks/useProcesamientoDependencia";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import GraficoNormal from "../utils/GraficoNormal";
import GraficoPorcentaje from "../utils/GraficoPorcentaje";
import TablaTerciles from "../utils/TablaTerciles"

export function TabDependenciaProcesamiento() {
  const { data, loading, error } = useProcesamientoDependencia();

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar los datos.</p>;

  return (
     <TabContent>
      <div className="graficos-container">
        <div style={{ display: 'flex' }}>
        <GraficoPorcentaje data={data} />
        <div style={{ flex: 1 }}>
          <GraficoNormal data={data} />
        </div>
      </div>
       </div >
      <TablaTerciles data={data} />
       
    </TabContent >
  );
}
