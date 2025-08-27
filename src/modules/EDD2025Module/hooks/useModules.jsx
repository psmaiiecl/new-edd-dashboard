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
  getProcesamientoData,
} from "../services/menuAPIServices";
import {
  buildAgendamientoModuleChart,
  buildGrabacionesModuleChart,
  buildProcesamientoModuleChart
} from "../utils/menuChartMappers";
export function useModules() {
  const { getToken } = useContext(AuthContext);
  const [cardCharts, setCardCharts] = useState({
    inscripcion: { ...MODULE_CHART_SETUP },
    validacion: { ...MODULE_CHART_SETUP },
    ayuda: { ...MODULE_CHART_SETUP },
    portafolio: { ...MODULE_CHART_SETUP },
    resultados: { ...MODULE_CHART_SETUP },
    agendamiento: { ...MODULE_CHART_SETUP },
    grabaciones: { ...MODULE_CHART_SETUP },
    procesamiento: { ...MODULE_CHART_SETUP },
  });
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
      setCardCharts((prev) => ({
        ...prev,
        inscripcion: buildInscripcionModuleChart(
          data.inscripcion_general.docentes
        ),
      }));
      changeLoadingStatus("inscription", false);
    });
    changeLoadingStatus("validation", true);
    getGeneralValidation(getToken()).then((data) => {
      setCardCharts((prev) => ({
        ...prev,
        validacion: buildValidationModuleChart(data.validacion),
      }));
      changeLoadingStatus("validation", false);
    });
    changeLoadingStatus("help", true);
    getZohoCalls(getToken()).then((data) => {
      setCardCharts((prev) => ({
        ...prev,
        ayuda: buildHelpModuleChart(data),
      }));
      changeLoadingStatus("help", false);
    });
    changeLoadingStatus("portfolio", true);
    getPortafolioData(getToken()).then((data) => {
      setCardCharts((prev) => ({
        ...prev,
        portafolio: buildPortfolioModuleChart(data.docentes),
      }));
      changeLoadingStatus("portfolio", false);
    });

    changeLoadingStatus("result", true);
    getResultData(getToken()).then((data) => {
      setCardCharts((prev) => ({
        ...prev,
        resultados: buildResultModuleChart(data.ratios),
      }));
      changeLoadingStatus("result", false);
    });

    changeLoadingStatus("agendamiento", true);
    getAgendamientoData(getToken()).then((data) => {
      setCardCharts((prev) => ({
        ...prev,
        agendamiento: buildAgendamientoModuleChart(data.agendamiento_docentes),
      }));
      changeLoadingStatus("agendamiento", false);
    });
    changeLoadingStatus("grabaciones", true);
    getGrabacionesData(getToken()).then((data) => {
      setCardCharts((prev) => ({
        ...prev,
        grabaciones: buildGrabacionesModuleChart(data.docentes_estado_rinde),
      }));
      changeLoadingStatus("grabaciones", false);
    });
    changeLoadingStatus("procesamiento", true);
    getProcesamientoData(getToken()).then((data) => {
      setCardCharts((prev) => ({
        ...prev,
        procesamiento: buildProcesamientoModuleChart(data.evolucion_diaria.normal),
      }));
      changeLoadingStatus("procesamiento", false);
    });
  }, [getToken]);
  return {
    cardCharts,
    loadingStatus,
  };
}
