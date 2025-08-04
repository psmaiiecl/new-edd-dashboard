import { TabContent } from "../../../../../../components/Layout/TabContent";
import EvolucionProcesamientoSDChart from "./EvolucionProcesamientoSDChart";
import EstadoProcesamientoDiaChart from './EstadoProcesamientoDiaChart';
import EstadoProcesamientoDiaTable from './EstadoProcesamientoDiaTable';

import { useProcesamientoEvolucion } from "./hooks/useProcesamientoEvolucion";
import { useProcesamientoDiarioCompleto } from "./hooks/useProcesamientoDiarioCompleto";
import "./EstadoProcesamiento.css";

export function TabGeneralProcesamiento() {
  const { data, loading: loadingEvol, error: errorEvol } = useProcesamientoEvolucion();
  const { series, categories, minDate, maxDate, loading: loadingDiario, error: errorDiario } = useProcesamientoDiarioCompleto();

  if (loadingEvol || loadingDiario) return <p>Cargando datos...</p>;
  if (errorEvol || errorDiario)
    return <p>Error al cargar datos: {errorEvol?.message || errorDiario?.message}</p>;

  return (
    <TabContent>
      <div>
        <EvolucionProcesamientoSDChart data={data} />
      </div>

      <div id="tabla_estado_procesamiento_semana">
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <EstadoProcesamientoDiaTable
              series={series}
              categories={categories}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>

          <div style={{ paddingTop: '20px' }}> 
            <EstadoProcesamientoDiaChart data={series} />
          </div>
        </div>
      </div>

    </TabContent>
  );
}
