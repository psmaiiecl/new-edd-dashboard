import "./index.css";
import { useModules } from "../../hooks/useModules";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { ModuleCard } from "../../../../components/ModuleCard";
import { useNavigate } from "react-router";

export function Menu() {
  const navigate = useNavigate();
  const { inscriptionChart, helpChart, loadingStatus } = useModules();

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
        <ModuleCard
          locked
          title={"Validación"}
          loading={loadingStatus.validation}
          action={() => navigate("validacion")}
        >
          <div>Gráfico Validación</div>
        </ModuleCard>
        <ModuleCard title={"Grabaciones"} locked />
        <ModuleCard title={"Portafolio"} locked />
        <ModuleCard title={"Corrección Portafolios"} locked />
        <ModuleCard title={"Entrega de Resultados"} locked />
        <ModuleCard
          title={"Mesa de Ayuda - Tickets"}
          loading={loadingStatus.help}
          action={() =>
            window.open(
              "https://analytics.zoho.com/open-view/2835166000003030282",
              "_blank"
            )
          }
        >
          <HighchartsReact options={helpChart} highcharts={Highcharts} />
        </ModuleCard>
      </div>
    </>
  );
}
