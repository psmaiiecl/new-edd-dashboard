import React, { memo } from "react";
import GenericPieChart from "../../components/PieChart/GenericPieChart";
import { useResultadosData } from "./hooks/useResultadosData";

// Función genérica para crear mapeadores
const createMapper = (subtitle, totalKey, seriesConfig) => (data) =>
  data
    ? {
      total: { subtitle, data: data[totalKey] },
      series: seriesConfig.map(({ name, key, color }) => ({
        name,
        y: data[key],
        color,
      })),
    }
    : { total: { subtitle: "", data: 0 }, series: [] };

// Mapeadores para cada tipo de gráfico
const mappers = {
  informesIndividuales: createMapper("INFORMES INDIVIDUALES"[
    { name: "INFORMES DESCARGADOS", color: "#65d9ab" },
    { name: "INFORMES NO DESCARGADOS", color: "#ff5880" }
  ]),
  informesEstablecimiento: createMapper("INFORMES ESTABLECIMIENTO"[
    { name: "INFORMES DESCARGADOS", color: "#65d9ab" },
    { name: "INFORMES NO DESCARGADOS", color: "#ff5880" }
  ]),
  informesSostenedor: createMapper("INFORMES SOSTENEDOR"[
   { name: "INFORMES DESCARGADOS", color: "#65d9ab" },
    { name: "INFORMES NO DESCARGADOS", color: "#ff5880" }
  ]),
  descargaDiariaIndividuales: createMapper("DESCARGA DIARIA DE INFORMES INDIVIDUALES", [
    { name: "Individuales", color: "#65d9ab" }
  ]),
  descargaDiariaEstablecimiento: createMapper("DESCARGA DIARIA DE INFORMES POR ESTABLECIMIENTO"[
    { name: "Por Establecimiento", color: "#65d9ab" }
  ]),
  descargaDiariaSostenedor: createMapper("DESCARGA DIARIA DE INFORMES POR SOSTENEDOR"[
    { name: "Por sostenedor", color: "#65d9ab" }
  ])
};

// Componente reutilizable para cada gráfico de pastel
const PieChartContainer = memo(({ subtitle, dataKey, mapper }) => (
  <div className="general-pie-chart-container">
    <GenericPieChart subtitle={subtitle} rawData={mapper(dataKey)} />
  </div>
));

// Componente principal
export function TabResultados({ filtros }) {
  const { data } = useResultadosData(filtros);
  return (
    <div className="tab-general">
      <div className="tab-general-upper">
        <div className="tab-general-docente">
          <PieChartContainer
            subtitle="TOTAL VALIDADOS"
            dataKey={data?.["portafolio-docentes-validados"]?.docentes}
            mapper={mappers.informesIndividuales}
          />
          <PieChartContainer
            subtitle="AVANCE PORTAFOLIO"
            dataKey={data?.["portafolio-avance-portafolio"]?.docentes}
            mapper={mappers.informesEstablecimiento}
          />
          <PieChartContainer
            subtitle="MÓDULO 1"
            dataKey={data?.["portafolio-avance-modulo-uno"]?.docentes}
            mapper={mappers.informesSostenedor}
          />
        </div>
        <div className="tab-general-docente">
          <PieChartContainer
            subtitle="MÓDULO 2"
            dataKey={data?.["portafolio-avance-modulo-dos"]?.docentes}
            mapper={mappers.descargaDiariaIndividuales}
          />
          <PieChartContainer
            subtitle="M2 FICHA"
            dataKey={data?.["portafolio-avance-modulo-dos-ficha"]?.docentes}
            mapper={mappers.descargaDiariaEstablecimiento}
          />
          <PieChartContainer
            subtitle="M2 CLASE GRABADA"
            dataKey={data?.["portafolio-avance-modulo-dos-grabada"]?.docentes}
            mapper={mappers.descargaDiariaSostenedor}
          />
        </div>

      </div>
    </div>
  );
}
