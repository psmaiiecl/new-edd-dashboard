import "./index.css";
import { useModules } from "../../hooks/useModules";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { ModuleCard } from "../../../../components/ModuleCard";
import { useNavigate } from "react-router";

export function Menu() {
  const { inscriptionChart, loadingStatus } = useModules();
  const navigate = useNavigate();

  return (
    <>
      <div className="module-menu__title roboto-light">
        <span>Seleccione el módulo al que desea ingresar</span>
        <hr />
      </div>
      <div className="module-menu">
        <ModuleCard
          title={"Inscripción"}
          action={() => navigate("inscripcion")}
          loading={loadingStatus.inscription}
        >
          <HighchartsReact options={inscriptionChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard title={"Validación"} locked />
        <ModuleCard title={"Grabaciones"} locked />
        <ModuleCard title={"Portafolio"} locked />
        <ModuleCard title={"Corrección Portafolios"} locked />
        <ModuleCard title={"Entrega de Resultados"} locked />
        <ModuleCard title={"Mesa de Ayuda - Tickets"} locked />
      </div>
    </>
  );
}
