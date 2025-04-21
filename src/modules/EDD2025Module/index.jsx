import "./index.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { ModuleCard } from "../../components/ModuleCard";
import { useModules } from "./hooks/useModules";

export function EDD2025Module() {
  const {
    inscriptionChart
  } = useModules();

  return (
    <>
      <div className="module-menu__title roboto-light">
        <span>Seleccione el módulo al que desea ingresar</span>
        <hr />
      </div>
      <div className="module-menu">
        <ModuleCard title={"Inscripción"}>
          <HighchartsReact options={inscriptionChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard title={"Validación"} locked>
        </ModuleCard>
        <ModuleCard title={"Grabaciones"} locked>
        </ModuleCard>
        <ModuleCard title={"Portafolio"} locked>
        </ModuleCard>
        <ModuleCard title={"Corrección Portafolios"} locked>
        </ModuleCard>
        <ModuleCard title={"Entrega de Resultados"}locked>
        </ModuleCard>
        <ModuleCard title={"Mesa de Ayuda - Tickets"}locked>
        </ModuleCard>
        
      </div>
    </>
  );
}
