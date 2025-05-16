import { useContext, useEffect, useState } from "react";
import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";
import { AuthContext } from "../../../context/AuthContext";
import { getZohoCalls } from "../services/HelpServices";
import { getInscriptionData } from "../services/InscriptionServices";
import { getPortafolioData } from "../services/PortfolioServices";
import { buildHelpModuleChart } from "../utils/HelpUtils";
import { buildInscripcionModuleChart } from "../utils/InscriptionUtils";
import { buildPortfolioModuleChart } from "../utils/PortfolioUtils";
export function useModules() {
  const { getToken } = useContext(AuthContext);
  const [inscriptionChart, setInscriptionChart] = useState(MODULE_CHART_SETUP);
  const [portfolioChart, setPortfolioChart] = useState(MODULE_CHART_SETUP);
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
    changeLoadingStatus("help", true);
    getZohoCalls(getToken()).then((data) => {
      console.log(data);
      setHelpChart(buildHelpModuleChart(data));
      changeLoadingStatus("help", false);
    });
    changeLoadingStatus("portfolio", true);
    getPortafolioData(getToken()).then((data) => {
      setPortfolioChart(
      buildPortfolioModuleChart(data.docentes)
      );
      changeLoadingStatus("portfolio", false);
    });
  }, [getToken]);
  return {
    inscriptionChart,
    portfolioChart,
    helpChart,
    loadingStatus,
  };
}
