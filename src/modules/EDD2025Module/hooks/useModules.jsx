import { useContext, useEffect, useState } from "react";
import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";
import { AuthContext } from "../../../context/AuthContext";
import { buildHelpModuleChart } from "../utils/HelpUtils";
import { buildInscripcionModuleChart } from "../utils/InscriptionUtils";
import { buildPortfolioModuleChart } from "../utils/PortfolioUtils";
import { buildResultModuleChart } from "../utils/ResultUtils";
import { buildValidationModuleChart } from "../utils/ValidationUtils";
import {
  buildAgendamientoModuleChart,
  buildGrabacionesModuleChart,
  buildPortfolioCorrectionModuleChart,
  buildPostulacionModuleChart,
  buildProcesamientoModuleChart,
  buildRecuperacionModuleChart,
} from "../utils/menuChartMappers";
import { BASE_API_URL_2024, BASE_API_URL_2025 } from "../data/BASE_API_URL";
import { useCustomFetch } from "../../../hooks/useCustomFetch";
export function useModules() {
  const { getToken } = useContext(AuthContext);
  const customFetch = useCustomFetch();

  const [cardCharts, setCardCharts] = useState({
    inscripcion: { ...MODULE_CHART_SETUP },
    validacion: { ...MODULE_CHART_SETUP },
    ayuda: { ...MODULE_CHART_SETUP },
    portafolio: { ...MODULE_CHART_SETUP },
    resultados: { ...MODULE_CHART_SETUP },
    agendamiento: { ...MODULE_CHART_SETUP },
    grabaciones: { ...MODULE_CHART_SETUP },
    procesamiento: { ...MODULE_CHART_SETUP },
    recuperacion: { ...MODULE_CHART_SETUP },
    correccion_postulaciones: { ...MODULE_CHART_SETUP },
    correccion_portafolios: { ...MODULE_CHART_SETUP },
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
    customFetch({
      route: BASE_API_URL_2025 + "/2025-datos-inscripcion",
      shouldCache: true,
      hasLoadPanel: false,
    })
      .then((data) => {
        setCardCharts((prev) => ({
          ...prev,
          inscripcion: buildInscripcionModuleChart(
            data.inscripcion_general.docentes
          ),
        }));
      })
      .finally(() => changeLoadingStatus("inscription", false));

    changeLoadingStatus("validation", true);
    customFetch({
      route: BASE_API_URL_2025 + "/2025-validacion-general",
      shouldCache: true,
      hasLoadPanel: false,
      formData: {
        convocatoria: { value: "" },
        estado: { value: "" },
        nivel: { value: "" },
        suspension: { value: "" },
      },
    })
      .then((data) => {
        setCardCharts((prev) => ({
          ...prev,
          validacion: buildValidationModuleChart(data.validacion),
        }));
      })
      .finally(() => changeLoadingStatus("validation", false));

    changeLoadingStatus("help", true);
    customFetch({
      route: BASE_API_URL_2025 + "/2025-llamadas-zoho",
      shouldCache: true,
      hasLoadPanel: false,
    })
      .then((data) => {
        setCardCharts((prev) => ({
          ...prev,
          ayuda: buildHelpModuleChart(data),
        }));
      })
      .finally(() => changeLoadingStatus("help", false));

    changeLoadingStatus("portfolio", true);
    customFetch({
      route: BASE_API_URL_2025 + "/2025-portafolio-avance-portafolio",
      shouldCache: true,
      hasLoadPanel: false,
    })
      .then((data) => {
        setCardCharts((prev) => ({
          ...prev,
          portafolio: buildPortfolioModuleChart(data.docentes),
        }));
      })
      .finally(() => changeLoadingStatus("portfolio", false));

    changeLoadingStatus("result", true);
    customFetch({
      route: BASE_API_URL_2025 + "/2025-informes-resultados",
      shouldCache: true,
      hasLoadPanel: false,
    })
      .then((data) => {
        setCardCharts((prev) => ({
          ...prev,
          resultados: buildResultModuleChart(data.ratios),
        }));
      })
      .finally(() => changeLoadingStatus("result", false));

    changeLoadingStatus("agendamiento", true);
    customFetch({
      route: BASE_API_URL_2025 + "/2025-agendamiento-grabaciones-tab-general",
      shouldCache: true,
      hasLoadPanel: false,
    })
      .then((data) => {
        setCardCharts((prev) => ({
          ...prev,
          agendamiento: buildAgendamientoModuleChart(
            data.agendamiento_docentes
          ),
        }));
      })
      .finally(() => changeLoadingStatus("agendamiento", false));

    changeLoadingStatus("grabaciones", true);
    customFetch({
      route: BASE_API_URL_2025 + "/2025-grabaciones-tab-general",
      shouldCache: true,
      hasLoadPanel: false,
    })
      .then((data) => {
        setCardCharts((prev) => ({
          ...prev,
          grabaciones: buildGrabacionesModuleChart(data.docentes_estado_rinde),
        }));
      })
      .finally(() => changeLoadingStatus("grabaciones", false));

    changeLoadingStatus("procesamiento", true);
    customFetch({
      route: BASE_API_URL_2025 + "/2025-procesamiento-tab-general",
      shouldCache: true,
      hasLoadPanel: false,
    })
      .then((data) => {
        setCardCharts((prev) => ({
          ...prev,
          procesamiento: buildProcesamientoModuleChart(
            data.evolucion_diaria.normal
          ),
        }));
      })
      .finally(() => changeLoadingStatus("procesamiento", false));

    changeLoadingStatus("recuperacion", true);
    customFetch({
      route: BASE_API_URL_2025 + "/2025-recuperacion-tab-general",
      shouldCache: true,
      hasLoadPanel: false,
    })
      .then((data) => {
        setCardCharts((prev) => ({
          ...prev,
          recuperacion: buildRecuperacionModuleChart(data.recuperacion_menu),
        }));
      })
      .finally(() => changeLoadingStatus("recuperacion", false));

    changeLoadingStatus("correccion_postulaciones", true);
    customFetch({
      route: BASE_API_URL_2025 + "/2025-postulacion",
      shouldCache: true,
      hasLoadPanel: false,
      method: "GET",
    })
      .then((data) => {
        setCardCharts((prev) => ({
          ...prev,
          correccion_postulaciones: buildPostulacionModuleChart(data),
        }));
      })
      .finally(() => changeLoadingStatus("correccion_postulaciones", false));

    changeLoadingStatus("correccion_portafolios", true);
    customFetch({
      route:
        BASE_API_URL_2024 +
        "/2024-correccion_portafolios/resultados/distribucion",
      shouldCache: true,
      hasLoadPanel: false,
    })
      .then((data) => {
        setCardCharts((prev) => ({
          ...prev,
          correccion_portafolios: buildPortfolioCorrectionModuleChart(data),
        }));
      })
      .finally(() => changeLoadingStatus("correccion_portafolios", false));
  }, [customFetch, getToken]);
  return {
    cardCharts,
    loadingStatus,
  };
}
