import "./index.css";
import { useNavigate } from "react-router";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useModules } from "../../hooks/useModules";
import { ModuleCard } from "../../../../components/ModuleCard";

export function Menu() {
  const navigate = useNavigate();
  const {
    inscriptionChart,
    validationChart,
    portfolioChart,
    portfolioCorrectionChart,
    processingChart,
    resultChart,
    recordSchedulingChart,
    recordChart,
    helpChart,
    loadingStatus,
  } = useModules();

  return (
    <>
      <div className="module-menu__title roboto-light">
        <span>Seleccione el módulo al que desea ingresar</span>
        <hr />
      </div>
      <div className="module-menu">
        <ModuleCard
          title={"F"}
          action={() => navigate("inscripcion")}
          loading={loadingStatus.inscription}
        >
          <HighchartsReact options={inscriptionChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard
          title={"Validación"}
          loading={loadingStatus.validation}
          action={() => navigate("validacion")}
        >
          <HighchartsReact options={validationChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard
          title={"Entrega de Resultados"}
          action={() => navigate("resultados")}
          loading={loadingStatus.result}
        >
          <HighchartsReact options={resultChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard
          title={"Portafolio"}
          action={() => navigate("portafolio")}
          loading={loadingStatus.portfolio}
        >
          <HighchartsReact options={portfolioChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard
          title={"Agendamiento de Grabaciones"}
          action={() => navigate("agendamiento-grabaciones")}
          loading={loadingStatus.agendamiento}
        >
          <HighchartsReact
            options={recordSchedulingChart}
            highcharts={Highcharts}
          />
        </ModuleCard>
        <ModuleCard
          title={"Grabaciones"}
          loading={loadingStatus.grabaciones}
          action={() => navigate("grabaciones")}
        >
          <HighchartsReact options={recordChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard
          title={"Recuperación de SD's"}
          action={() => navigate("recuperacion-sd")}
          loading={loadingStatus.recuperacion}
          locked
        >
          Recuperacion SD
        </ModuleCard>
        <ModuleCard
          title={"Procesamiento de SD's"}
          action={() => navigate("procesamiento-sd")}
          loading={loadingStatus.procesamiento}
        />
        <ModuleCard
        title={"Corrección Portafolios"}
          action={() => navigate("correcciones")}
          loading={loadingStatus.correcciones}  />
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
