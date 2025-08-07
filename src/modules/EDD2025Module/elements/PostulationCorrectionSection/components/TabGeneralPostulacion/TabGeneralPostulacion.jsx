import { memo } from "react";
import { ConvertirPalabras } from "../../../../../../utils/portafolioUtils.js";
import TablaResumenPostulacion from "./TablaResumenPostulacion";
import AvanceDiarioChartPostulacion from "./AvanceDiarioChartPostulacion";
import { usePostulacionData } from "./hooks/usePostulacionData";

export default function TabAvanceDiarioPostulacion({ filtros }) {
  const hookResult = usePostulacionData(
    import.meta.env.VITE_BASE_URL + "/back/public/api2024/2024-postulacion",
    filtros
  );

  if (!hookResult) {
    console.error("usePostulacionData está retornando undefined");
    return <div>Error interno</div>;
  }

  const { data, isLoading } = hookResult;

  if (isLoading || !data) return <div>Cargando...</div>;

  return (
    <>
      <AvanceDiarioChartPostulacion fechas={data.fechas} series={data.series} />
      <TablaResumenPostulacion resumen={data.resumen} />
    </>
  );
}
