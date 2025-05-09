import "./index.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { ModuleCard } from "../../components/ModuleCard";
import { useModules } from "./hooks/useModules";
import { getCurrentDate } from "../../utils/DateUtils";
import supportIMG from "../../assets/images/support.svg";

export function EDD2024Module() {
  const {
    inscriptionChart,
    validationChart,
    recordChart,
    portfolioChart,
    correctionChart,
    resultsChart,
    callInfo,
    loadingStatus,
  } = useModules();

  const handleRedirection = (module) => {
    window.location.href =
      import.meta.env.VITE_BASE_URL + `/front_2024/${module}.html`;
  };

  return (
    <>
      <div className="module-menu__title roboto-light">
        <span>Seleccione el módulo al que desea ingresar</span>
        <hr />
      </div>
      <div className="module-menu">
        <ModuleCard
          title={"Inscripción"}
          action={() => handleRedirection("inscripcion")}
          loading={loadingStatus.inscription}
        >
          <HighchartsReact options={inscriptionChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard
          title={"Validación"}
          action={() => handleRedirection("validacion")}
          loading={loadingStatus.validation}
        >
          <HighchartsReact options={validationChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard
          title={"Grabaciones"}
          action={() => handleRedirection("grabaciones")}
          loading={loadingStatus.recording}
        >
          <HighchartsReact options={recordChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard
          title={"Portafolio"}
          action={() => handleRedirection("portafolio")}
          loading={loadingStatus.portfolio}
        >
          <HighchartsReact options={portfolioChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard
          title={"Corrección Portafolios"}
          action={() => handleRedirection("correccionPortafolios")}
          loading={loadingStatus.correction}
        >
          <HighchartsReact options={correctionChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard
          title={"Entrega de Resultados"}
          action={() => handleRedirection("entrega_resultados")}
          loading={loadingStatus.results}
        >
          <HighchartsReact options={resultsChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard title={"Mesa de Ayuda - Tickets"}>
          <div className="mesa-ayuda-content">
            <img src={supportIMG} />
          </div>
        </ModuleCard>
        <ModuleCard
          title={"Llamadas"}
          action={() => handleRedirection("llamadas")}
          loading={loadingStatus.call}
        >
          <div className="llamadas-content roboto-bold">
            <span>Fecha: {getCurrentDate()}</span>
            <span>Llamadas Entrantes Hábiles: {callInfo.entrantes}</span>
            <span>Llamadas Atendidas: {callInfo.atendidas}</span>
            <span>Llamadas Respondidas (%) </span>
            <span className="call-percentaje">
              {callInfo.respondidas + "%"}
            </span>
          </div>
        </ModuleCard>
      </div>
    </>
  );
}
