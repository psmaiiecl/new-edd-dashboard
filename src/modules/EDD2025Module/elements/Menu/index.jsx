import "./index.css";
import { useNavigate } from "react-router";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useModules } from "../../hooks/useModules";
import { ModuleCard } from "../../../../components/ModuleCard";
import sdIMG from "../../../../assets/icons/sd_recovery.svg";

export function Menu() {
  const navigate = useNavigate();
  const { cardCharts, loadingStatus } = useModules();

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
          <HighchartsReact
            options={cardCharts?.inscripcion}
            highcharts={Highcharts}
          />
        </ModuleCard>
        <ModuleCard
          title={"Validación"}
          loading={loadingStatus.validation}
          action={() => navigate("validacion")}
        >
          <HighchartsReact
            options={cardCharts?.validacion}
            highcharts={Highcharts}
          />
        </ModuleCard>
        <ModuleCard
          title={"Entrega de Resultados"}
          action={() => navigate("resultados")}
          loading={loadingStatus.result}
        >
          <HighchartsReact
            options={cardCharts?.resultados}
            highcharts={Highcharts}
          />
        </ModuleCard>
        <ModuleCard
          title={"Portafolio"}
          action={() => navigate("portafolio")}
          loading={loadingStatus.portfolio}
        >
          <HighchartsReact
            options={cardCharts?.portafolio}
            highcharts={Highcharts}
          />
        </ModuleCard>
        <ModuleCard
          title={"Agendamiento de Grabaciones"}
          action={() => navigate("agendamiento-grabaciones")}
          loading={loadingStatus.agendamiento}
        >
          <HighchartsReact
            options={cardCharts?.agendamiento}
            highcharts={Highcharts}
          />
        </ModuleCard>
        <ModuleCard
          title={"Grabaciones"}
          loading={loadingStatus.grabaciones}
          action={() => navigate("grabaciones")}
        >
          <HighchartsReact
            options={cardCharts?.grabaciones}
            highcharts={Highcharts}
          />
        </ModuleCard>
        <ModuleCard
          title={"Recuperación de SD's"}
          // action={() => navigate("recuperacion-sd")}
          action={() =>
            window.open(
              "https://analytics.zoho.com/open-view/2835166000007221945/7fbffad3f812038aa551fb6cea9cde8a",
              "_blank"
            )
          }
          loading={loadingStatus.recuperacion}
        >
          <div className="mesa-ayuda-content">
            <img src={sdIMG} />
          </div>
        </ModuleCard>
        <ModuleCard
          title={"Procesamiento de Grabaciones"}
          action={() => navigate("procesamiento-sd")}
          loading={loadingStatus.procesamiento}
        >
          <HighchartsReact
            options={cardCharts?.procesamiento}
            highcharts={Highcharts}
          />
        </ModuleCard>
        <ModuleCard
          title={"Corrección Postulaciones"}
          action={() => navigate("correccion-postulaciones")}
          loading={loadingStatus.correccion_postulaciones}
          locked
        />
        <ModuleCard
          title={"Corrección Portafolios"}
          action={() => navigate("correccion-portafolios")}
          loading={loadingStatus.correccion_portafolios}
          locked
        />
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
          <HighchartsReact
            options={cardCharts?.ayuda}
            highcharts={Highcharts}
          />
        </ModuleCard>
      </div>
    </>
  );
}
