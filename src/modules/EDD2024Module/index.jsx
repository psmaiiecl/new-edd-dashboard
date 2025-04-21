import "./index.css";
import { useContext, useEffect, useState } from "react";
import { ModuleCard } from "./components/ModuleCard";
import { AuthContext } from "../../context/AuthContext";
import { getInscriptionData } from "./services/InscriptionServices";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { buildInscripcionModuleChart } from "./utils/InscriptionUtils";
import { MODULE_CHART_SETUP } from "./data/ModuleChartBase";
import { getValidationData } from "./services/ValidationServices";
import { buildValidationModuleChart } from "./utils/ValidationUtils";
import { getRecordingData } from "./services/RecordingServices";
import { getPortfolioData } from "./services/PortfolioServices";
import { getCorrectionData } from "./services/CorrectionServices";
import { getResultsData } from "./services/ResultsServices";

export function EDD2024Module() {
  const { getToken } = useContext(AuthContext);
  const [inscriptionChart, setInscriptionChart] = useState(MODULE_CHART_SETUP);
  const [validationChart, setValidationChart] = useState(MODULE_CHART_SETUP);
  const [recordChart, setRecordChart] = useState(MODULE_CHART_SETUP);
  const [portfolioChart, setPortfolioChart] = useState(MODULE_CHART_SETUP);
  const [correctionChart, setCorrectionChart] = useState(MODULE_CHART_SETUP);
  const [resultsChart, setResultsChart] = useState(MODULE_CHART_SETUP);
  useEffect(() => {
    getInscriptionData(getToken()).then((data) => {
      setInscriptionChart(
        buildInscripcionModuleChart(data.inscripcion_general.docentes)
      );
    });
    getValidationData(getToken()).then((data) => {
      setValidationChart(buildValidationModuleChart(data.validacion));
    });
    getRecordingData(getToken()).then(data => console.log(data))
    getPortfolioData(getToken()).then(data => console.log(data))
    getCorrectionData(getToken()).then(data => console.log(data))
    getResultsData(getToken()).then(data => console.log(data))
  }, []);

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
        <ModuleCard title={"Entrefa de Resultados"}>
          <HighchartsReact options={resultsChart} highcharts={Highcharts} />
        </ModuleCard>
        <ModuleCard title={"Mesa de Ayuda - Tickets"}></ModuleCard>
        <ModuleCard title={"Llamadas"}></ModuleCard>
      </div>
    </>
  );
}
