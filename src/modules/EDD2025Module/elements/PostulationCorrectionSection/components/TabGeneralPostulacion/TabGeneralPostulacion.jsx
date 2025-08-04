import { memo } from "react";
import { ConvertirPalabras } from "../../../../../../utils/portafolioUtils.js";
import AvanceDiarioChartPostulacion from "./AvanceDiarioChartPostulacion";
import { useAvanceDiarioChart } from "./hooks/useAvanceDiarioChart.js";


// Componente principal
export function TabGeneralPostulacion({ filtros }) {
  const { data, isLoading } = useAvanceDiarioChart(filtros, "2025");
  const mapAvanceDiario = (data) => {
  const fechas = data.fechas;

  const postulantesTotales = data.postulantes_totales_por_dia;
  const puedenSerSupervisores = data.supervisores;
  const supervisoresRequeridos = fechas.map(() => 127); // fijo
  const correctoresRequeridos = fechas.map(() => 1201); // fijo
  const seleccionadosRequeridos = fechas.map(() => 1328); // fijo

  return {
    fechas,
    keyPath: "postulacion",
    series: [
      {
        name: "Postulantes Totales",
        color: "#e91e63",
        data: postulantesTotales,
      },
      {
        name: "Pueden ser Supervisores",
        color: "#4caf50",
        data: puedenSerSupervisores,
      },
      {
        name: "Supervisores Requeridos",
        color: "#ff9800",
        dashStyle: "Dash",
        data: supervisoresRequeridos,
      },
      {
        name: "Total Seleccionados Requeridos",
        color: "#00bcd4",
        dashStyle: "ShortDot",
        data: seleccionadosRequeridos,
      },
      {
        name: "Correctores Requeridos",
        color: "#9c27b0",
        dashStyle: "DashDot",
        data: correctoresRequeridos,
      },
    ],
  };
};

  if (isLoading || !data) return <div>Cargando gráfico...</div>;


  return (
    <>

      
  <AvanceDiarioChartPostulacion data={data} />


    </>
  );
}
