import { useContext, useEffect, useState } from "react";
import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";
import { AuthContext } from "../../../context/AuthContext";
import { getZohoCalls } from "../services/HelpServices";
import { getPortafolioData } from "../services/PortfolioServices";
import { getResultData } from "../services/ResultServices";
import { buildHelpModuleChart } from "../utils/HelpUtils";
import { buildInscripcionModuleChart } from "../utils/InscriptionUtils";
import { buildPortfolioModuleChart } from "../utils/PortfolioUtils";
import { buildResultModuleChart } from "../utils/ResultUtils";
import { getGeneralValidation } from "../services/ValidationServices";
import { buildValidationModuleChart } from "../utils/ValidationUtils";
import {
  getAgendamientoData,
  getGrabacionesData,
  getInscriptionData,
} from "../services/menuAPIServices";
import {
  buildAgendamientoModuleChart,
  buildGrabacionesModuleChart,
} from "../utils/menuChartMappers";
export function useModules() {
  const { getToken } = useContext(AuthContext);
  const [inscriptionChart, setInscriptionChart] = useState(MODULE_CHART_SETUP);
  const [validationChart, setValidationChart] = useState(MODULE_CHART_SETUP);
  const [portfolioChart, setPortfolioChart] = useState(MODULE_CHART_SETUP);
  const [resultChart, setResultChart] = useState(MODULE_CHART_SETUP);
  const [recordSchedulingChart, setRecordSchedulingChart] =
    useState(MODULE_CHART_SETUP);
  const [recordChart, setRecordChart] = useState(MODULE_CHART_SETUP);
  const [helpChart, setHelpChart] = useState(MODULE_CHART_SETUP);
  const [loadingStatus, setLoadingStatus] = useState({});
  const changeLoadingStatus = (field, state) => {
    setLoadingStatus((prev) => ({
      ...prev,
      [field]: state,
    }));
  };
  useEffect(() => {
    changeLoadingStatus("inscription", true);
    getInscriptionData(getToken()).then((data) => {
      setInscriptionChart(
        buildInscripcionModuleChart(data.inscripcion_general.docentes)
      );
      changeLoadingStatus("inscription", false);
    });
    changeLoadingStatus("validation", true);
    getGeneralValidation(getToken()).then((data) => {
      setValidationChart(buildValidationModuleChart(data.validacion));
      changeLoadingStatus("validation", false);
    });
    changeLoadingStatus("help", true);
    getZohoCalls(getToken()).then((data) => {
      setHelpChart(buildHelpModuleChart(data));
      changeLoadingStatus("help", false);
    });
    changeLoadingStatus("portfolio", true);
    getPortafolioData(getToken()).then((data) => {
      setPortfolioChart(buildPortfolioModuleChart(data.docentes));
      changeLoadingStatus("portfolio", false);
    });

    changeLoadingStatus("result", true);
    getResultData(getToken()).then((data) => {
      setResultChart(buildResultModuleChart(data.ratios));
      changeLoadingStatus("result", false);
    });

    changeLoadingStatus("agendamiento", true);
    getAgendamientoData(getToken()).then((data) => {
      setRecordSchedulingChart(
        buildAgendamientoModuleChart(data.agendamiento_docentes)
      );
      changeLoadingStatus("agendamiento", false);
    });
    changeLoadingStatus("grabaciones", true);
    getGrabacionesData(getToken()).then((data) => {
      setRecordChart(buildGrabacionesModuleChart(data.docentes_estado_rinde));
      changeLoadingStatus("grabaciones", false);
    });
  }, [getToken]);
  return {
    inscriptionChart,
    validationChart,
    portfolioChart,
    resultChart,
    recordSchedulingChart,
    recordChart,
    helpChart,
    loadingStatus,
  };
}
