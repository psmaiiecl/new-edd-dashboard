import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../../../context/AuthContext";
import {
  getValidacionCambioNivelVistaRegion,
  getValidacionSolicitaSuspenderVistaRegion,
  getValidacionVistaRegion,
} from "../../../../../services/ValidationServices";
import { BASIC_BAR } from "../../../../InscriptionSection/data/BASIC_BAR";
import {
  buildEstadoChart,
  buildSolicitudChart,
  extraerSumatoriasDocentes,
  extraerSumatoriasSolicitudes,
  extraerSumaTotal,
} from "../../../utils/regionTabUtils";

export function useTabRegion() {
  const { getToken } = useContext(AuthContext);
  const [estadoData, setEstadoData] = useState({});
  const [estadoStatus, setEstadoStatus] = useState({
    validados: 0,
    no_validados: 0,
    sin_ingreso: 0,
    total: 0,
  });
  const [estadoChart, setEstadoChart] = useState({
    ...BASIC_BAR,
    subtitle: {
      text: "<b>ESTADO DE VALIDACIÓN DE DOCENTES</b> DISTRIBUIDOS <b>POR DEPENDENCIA</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Validados",
        data: [],
        sliced: true,
        selected: true,
        color: "#65D9AB",
      },
      {
        name: "No Validados",
        data: [],
        color: "#FFD153",
      },
      {
        name: "Sin Ingreso",
        data: [],
        color: "#FF5880",
      },
    ],
  });
  const [cambioData, setCambioData] = useState({});
  const [cambioStatus, setCambioStatus] = useState({
    aprobadas: 0,
    no_procesadas: 0,
    rechazadas: 0,
    total: 0,
  });
  const [cambioChart, setCambioChart] = useState({
    ...BASIC_BAR,
    subtitle: {
      text: "<b>ESTADO DE SOLICITUDES</b> DE CAMBIO DE <b>AGRUPACIÓN/ASIGNATURA</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Aprobadas",
        data: [],
        sliced: true,
        selected: true,
        color: "#65D9AB",
      },
      {
        name: "No Procesadas",
        data: [],
        color: "#FFD153",
      },
      {
        name: "Rechazadas",
        data: [],
        color: "#FF5880",
      },
    ],
  });
  const [suspensionData, setSuspensionData] = useState({});
  const [suspensionStatus, setSuspensionStatus] = useState({
    aprobadas: 0,
    no_procesadas: 0,
    rechazadas: 0,
    total: 0,
  });
  const [suspensionChart, setSuspensionChart] = useState({
    ...BASIC_BAR,
    subtitle: {
      text: "<b>ESTADO DE SOLICITUDES</b> DE <b>SUSPENSIÓN O EXIMICIÓN</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Aprobadas",
        data: [],
        sliced: true,
        selected: true,
        color: "#65D9AB",
      },
      {
        name: "No Procesadas",
        data: [],
        color: "#FFD153",
      },
      {
        name: "Rechazadas",
        data: [],
        color: "#FF5880",
      },
    ],
  });
  useEffect(() => {
    getValidacionVistaRegion(getToken()).then((data) => {
      const eStatus = extraerSumatoriasDocentes(data.docentes);
      const eTotal = extraerSumaTotal(eStatus);
      setEstadoData(data.docentes);
      setEstadoStatus({ ...eStatus, total: eTotal });
      setEstadoChart(buildEstadoChart(estadoChart, data.docentes, eTotal));
    });
    getValidacionCambioNivelVistaRegion(getToken()).then((data) => {
      const eStatus = extraerSumatoriasSolicitudes(data);
      const eTotal = extraerSumaTotal(eStatus);
      setCambioData(data);
      setCambioStatus({ ...eStatus, total: eTotal });
      setCambioChart(buildSolicitudChart(cambioChart, data, eTotal));
    });
    getValidacionSolicitaSuspenderVistaRegion(getToken()).then((data) => {
      const eStatus = extraerSumatoriasSolicitudes(data);
      const eTotal = extraerSumaTotal(eStatus);
      setSuspensionData(data);
      setSuspensionStatus({ ...eStatus, total: eTotal });
      setSuspensionChart(buildSolicitudChart(suspensionChart, data, eTotal));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken]);
  return {
    estadoData,
    estadoStatus,
    estadoChart,
    cambioData,
    cambioStatus,
    cambioChart,
    suspensionData,
    suspensionStatus,
    suspensionChart,
  };
}
