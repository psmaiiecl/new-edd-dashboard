import { buildInscripcionModuleChart } from "../utils/InscriptionUtils";
import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getInscriptionData } from "../services/InscriptionServices";
import { getZohoCalls } from "../services/HelpServices";
import { buildHelpModuleChart } from "../utils/HelpUtils";
export function useModules() {
  const { getToken } = useContext(AuthContext);
  const [inscriptionChart, setInscriptionChart] = useState(MODULE_CHART_SETUP);
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
      setHelpChart(buildHelpModuleChart(data))
      changeLoadingStatus("help", false);
    })
  }, [getToken]);
  return {
    inscriptionChart,
    helpChart,
    loadingStatus,
  };
}
