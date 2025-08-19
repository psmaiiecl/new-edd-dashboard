import { memo } from "react";
import { ConvertirPalabras } from "../../../../../../utils/portafolioUtils.js";
import TablaResumenPostulacion from "./TablaResumenPostulacion";
import AvanceDiarioChartPostulacion from "./AvanceDiarioChartPostulacion";
import { usePostulacionData } from "./hooks/usePostulacionData";
import { useAvanceDiarioPostulacion } from "./hooks/useAvanceDiarioPostulacion";
export default function TabGeneralPostulacion() {
  const { fechas, series, resumen, loading, error } = useAvanceDiarioPostulacion();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos</div>;

  return (
    <>
      <AvanceDiarioChartPostulacion fechas={fechas} series={series} />
      <TablaResumenPostulacion resumen={resumen} />
    </>
  );
}



