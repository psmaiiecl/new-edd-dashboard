import { TabContent } from "../../../../../../components/Layout/TabContent";
import EvolucionProcesamientoSDChart from "./EvolucionProcesamientoSDChart";
import EstadoProcesamientoDiaChart from './Render/EstadoProcesamientoDiaChart';
import EstadoProcesamientoDiaTable from './Render/EstadoProcesamientoDiatTable';

import { useEvolucionProcesamiento } from "./hooks/useEvolucionProcesamiento";
// import { useProcesamientoDiario } from "./hooks/useProcesamientoDiario";
export function TabGeneralProcesamiento() {
  const { data, loading: loadingEvol, error: errorEvol } = useEvolucionProcesamiento();
  // const { series, loading: loadingDiario, error: errorDiario } = useProcesamientoDiario();

  if (loadingEvol ) return <p>Cargando datos...</p>;
  if (errorEvol )
    return <p>Error al cargar datos: {errorEvol?.message }</p>;

  return (
    <TabContent>
      <div>
        <EvolucionProcesamientoSDChart data={data} />
      </div>

      {/* <div id="tabla_estado_procesamiento_semana">
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <EstadoProcesamientoDiaTable
              series={series}
              minDate={Date.UTC(2024, 9, 10)}
              maxDate={Date.UTC(2024, 12, 11)}
            />
          </div>
          <EstadoProcesamientoDiaChart series={series} />
        </div>
      </div> */}
    </TabContent>
  );
}