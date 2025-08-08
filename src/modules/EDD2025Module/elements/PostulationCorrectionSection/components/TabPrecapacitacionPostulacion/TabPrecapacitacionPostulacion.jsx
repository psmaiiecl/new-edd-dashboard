import { usePrecapacitacionPostulacion } from "./hooks/usePrecapacitacionPostulacion";
import PrecapacitacionPieChart from "./utils/PrecapacitacionPieChart";
import TablaEstadoPrecapacitacion from "./TablaEstadoPrecapacitacion";
import { mapSupervisorData, mapCorrectorData } from "../../utils/precapacitacionMappers";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import { chartColors } from "./utils/precapacitacionChartOptions";
import "./TabPrecapacitacionPostulacion.css";
 
export default function TabPrecapacitacionPostulacion() {
  const { data } = usePrecapacitacionPostulacion();

  return (
    <div className="p-4">
      <TabContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="chart-card">
            <PrecapacitacionPieChart
              subtitle="ESTADO DE SUPERVISORES"
              rawData={data}
              dataMapper={mapSupervisorData}
              colors={chartColors}
            />
          </div>
          <div className="chart-card">
            <PrecapacitacionPieChart
              subtitle="ESTADO DE CORRECTORES"
              rawData={data}
              dataMapper={mapCorrectorData}
              colors={chartColors}
            />
          </div>
        </div>
        <div className="mt-6 table-wrapper">
          <TablaEstadoPrecapacitacion
            data={[
              ...(data?.resumen?.supervisores ?? []),
              ...(data?.resumen?.correctores ?? [])
            ]}
          />
        </div>
      </TabContent>
    </div>
  );
}
