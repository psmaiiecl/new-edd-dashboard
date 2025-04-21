import { buildInscripcionModuleChart } from "../utils/InscriptionUtils";
import { MODULE_CHART_SETUP } from "../data/ModuleChartBase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getInscriptionData } from "../services/InscriptionServices";
export function useModules() {
  const { getToken } = useContext(AuthContext);
  const [inscriptionChart, setInscriptionChart] = useState(MODULE_CHART_SETUP);
  useEffect(() => {
    getInscriptionData(getToken()).then((data) => {
      setInscriptionChart(
        buildInscripcionModuleChart(data.inscripcion_general.docentes)
      );
    });
    
  }, [getToken]);
  return {
    inscriptionChart,
  };
}
