import "./index.css";
import { ModuleCard } from "./components/ModuleCard";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useModules } from "./hooks/useModules";
import { getCurrentDate } from "../../utils/DateUtils";

export function EDD2024Module() {
  const {
    inscriptionChart,
    validationChart,
    recordChart,
    portfolioChart,
    correctionChart,
    resultsChart,
    callInfo,
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
        <ModuleCard title={"Validación"}>
          <HighchartsReact options={validationChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard title={"Grabaciones"}>
          <HighchartsReact options={recordChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard title={"Portafolio"}>
          <HighchartsReact options={portfolioChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard title={"Corrección Portafolios"}>
          <HighchartsReact options={correctionChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard title={"Entrega de Resultados"}>
          <HighchartsReact options={resultsChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard title={"Mesa de Ayuda - Tickets"}>
          <div className="mesa-ayuda-content">
            <img src="/img/support.svg" />
          </div>
        </ModuleCard>
        <ModuleCard title={"Llamadas"}>
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
