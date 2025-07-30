import { memo } from "react";
import { usePostulacionGeneral } from "./hooks/usePostulacionGeneral";
import { ConvertirPalabras } from "../../../../../../utils/portafolioUtils.js";
import AvanceDiarioChart from "../ScatterChart/AvanceDiarioChart";


// import AvanceSemanalChart from "../BarChart/AvanceSemanalChart";


const mapAvanceDiario = (data) => {
  const fechas = data.fechas;

  const completados = data.pfCompletado_cant;
  const iniciados = data.pfIniciados_cant;
  const m1Iniciado = data.m1Iniciado_cant;
  const m2Iniciado = data.m2Iniciado_cant;
  const m3Iniciado = data.m3Iniciado_cant;
  const rinde = data.pfRinde_cant;

  return {
    fechas,
    keyPath: "postulacion-avance-diario",
    series: [
      {
        name: ConvertirPalabras("Postulantes Totales"),
        color: "#5157FF",
        data: completados,
      },
      {
        name: ConvertirPalabras("Pueden ser Supervisores"),
        color: "#FF8E53",
        data: iniciados,
      },
      {
        name: ConvertirPalabras("Supervisores Requqeridos"),
        color: "#65D9AB",
        data: m1Iniciado,
      },
      {
        name: ConvertirPalabras("Total seleccionados Requeridos"),
        color: "#FFD153",
        data: m2Iniciado,
      },
      
    ],
  };
};


// Componente principal
export function TabGeneralPostulacion({ filtros }) {
  const { data: dataGeneral } = usePostulacionGeneral(filtros);

  return (
    <>
      
      <AvanceDiarioChart
        title="AVANCE DIARIO <b>POSTULACIÓN</b>"
        keyPath="postulacion-avance-diario"
        dataMapper={mapAvanceDiario}
        filtros={filtros}
        rawData={dataGeneral}
      />

    </>
  );
}
