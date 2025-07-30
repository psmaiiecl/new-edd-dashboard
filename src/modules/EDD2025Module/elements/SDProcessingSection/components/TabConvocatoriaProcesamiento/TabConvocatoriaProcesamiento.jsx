import React from "react";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import GraficoNormal from "../utils/GraficoNormal";
import GraficoPorcentaje from "../utils/GraficoPorcentaje";
import TablaTerciles from "../utils/TablaTerciles"
import "./TabConvocatoriaProcesamiento.css";

import { useProcesamientoConvocatoria } from "./hooks/useProcesamientoConvocatoria"

export function TabConvocatoriaProcesamiento() {

  const { data: dataConv, loading: loadingConv } = useProcesamientoConvocatoria();
  if (loadingConv || loadingConv) return <p>Cargando datos...</p>;

  return (
    <TabContent>
      <div className="graficos-container">
        
          
            <div style={{ display: 'flex' }}>
          <GraficoPorcentaje data={dataConv} />
          <div className="graficos-convocatoria">
            <GraficoNormal data={dataConv} />
          </div>
        </div>
        <div id="tabla_estado_procesamiento_semana">
        </div>
        <TablaTerciles data={dataConv} />
      </div >
    </TabContent>
  );
}
