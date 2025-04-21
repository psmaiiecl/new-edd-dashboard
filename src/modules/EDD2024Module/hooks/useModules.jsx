import { buildInscripcionModuleChart } from "../utils/InscriptionUtils";
import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";
import { getValidationData } from "../services/ValidationServices";
import { buildValidationModuleChart } from "../utils/ValidationUtils";
import { getRecordingData } from "../services/RecordingServices";
import { getPortfolioData } from "../services/PortfolioServices";
import { getCorrectionData } from "../services/CorrectionServices";
import { getResultsData } from "../services/ResultsServices";
import { buildPortfolioModuleChart } from "../utils/PortfolioUtils";
import { buildRecordingModuleChart } from "../utils/RecordingUtils";
import { buildCorrectionModuleChart } from "../utils/CorrectionUtils";
import { buildResultsModuleChart } from "../utils/ResultsUtils";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getInscriptionData } from "../services/InscriptionServices";
import { getCallData } from "../services/CallServices";
import { buildCallModuleInfo } from "../utils/CallUtils";
export function useModules() {
  const { getToken } = useContext(AuthContext);
  const [inscriptionChart, setInscriptionChart] = useState(MODULE_CHART_SETUP);
  const [validationChart, setValidationChart] = useState(MODULE_CHART_SETUP);
  const [recordChart, setRecordChart] = useState(MODULE_CHART_SETUP);
  const [portfolioChart, setPortfolioChart] = useState(MODULE_CHART_SETUP);
  const [correctionChart, setCorrectionChart] = useState(MODULE_CHART_SETUP);
  const [resultsChart, setResultsChart] = useState(MODULE_CHART_SETUP);
  const [callInfo, setCallInfo] = useState({});
  useEffect(() => {
    getInscriptionData(getToken()).then((data) => {
      setInscriptionChart(
        buildInscripcionModuleChart(data.inscripcion_general.docentes)
      );
    });
    getValidationData(getToken()).then((data) => {
      setValidationChart(buildValidationModuleChart(data.validacion));
    });
    getRecordingData(getToken()).then((data) =>
      setRecordChart(buildRecordingModuleChart(data.docentes_a_grabar))
    );
    getPortfolioData(getToken()).then((data) =>
      setPortfolioChart(buildPortfolioModuleChart(data.docentes))
    );
    getCorrectionData(getToken()).then((data) =>
      setCorrectionChart(buildCorrectionModuleChart(data))
    );
    getResultsData(getToken()).then((data) =>
      setResultsChart(buildResultsModuleChart(data.ratios))
    );
    getCallData(getToken()).then((data) =>
      setCallInfo(buildCallModuleInfo(data))
    );
  }, [getToken]);
  return {
    inscriptionChart,
    validationChart,
    recordChart,
    portfolioChart,
    correctionChart,
    resultsChart,
    callInfo,
  };
}
