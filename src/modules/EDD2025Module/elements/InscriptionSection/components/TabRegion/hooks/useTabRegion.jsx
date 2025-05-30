import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../../../context/AuthContext";
import { BASIC_BAR } from "../../../data/BASIC_BAR";
import { getInscriptionRegion } from "../../../../../services/InscriptionServices";
import {
  buildDocentesRegionChart,
  buildSostenedoresRegionChart,
  extraerSumatoriasDocentes,
  extraerSumatoriaSostenedores,
  extraerSumaTotal,
} from "../../../utils/regionTabUtils";

export function useTabRegion() {
  const { getToken } = useContext(AuthContext);
  const [docentesData, setDocentesData] = useState({});
  const [docentesStatus, setDocentesStatus] = useState({
    Inscrito: 0,
    "En Revisión": 0,
    Desinscrito: 0,
    Pendiente: 0,
    Cancelado: 0,
    total: 0,
  });
  const [docentesChart, setDocentesChart] = useState({
    ...BASIC_BAR,
    subtitle: {
      text: "<b>ESTADO DE DOCENTES</b> DISTRIBUIDOS <b>POR DEPENDENCIA</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Inscritos en nómina",
        data: [],
        sliced: true,
        selected: true,
        color: "#65D9AB",
      },
      {
        name: "En Revisión",
        data: [],
        color: "#FF8E53",
      },
      {
        name: "Desinscritos",
        data: [],
        color: "#C1D9CA",
      },
      {
        name: "Pendientes",
        data: [],
        color: "#FFD153",
      },
      {
        name: "Cancelados",
        data: [],
        color: "#FF5880",
      },
    ],
  });
  const [sostenedoresData, setSostenedoresData] = useState({});
  const [sostenedoresStatus, setSostenedoresStatus] = useState({
    sin_ingreso: 0,
    con_ingreso_sin_docentes: 0,
    inscripcion_iniciada: 0,
    sin_docentes_pendientes: 0,
  });
  const [sostenedoresChart, setSostenedoresChart] = useState({
    ...BASIC_BAR,
    subtitle: {
      text: "<b>SOSTENEDORES</b> DISTRIBUIDOS POR DEPENDENCIA",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Sin Ingreso",
        data: [],
        color: "#FF5880",
      },
      {
        name: "Con ingreso pero sin docentes inscritos",
        data: [],
        color: "#FF8E53",
      },
      {
        name: "Con inscripción iniciada",
        data: [],
        color: "#65D9AB",
      },
      {
        name: "Con inscripción terminada",
        data: [],
        color: "#8FB8FF",
      },
    ],
  });

  useEffect(() => {
    getInscriptionRegion(getToken()).then((data) => {
      const dStatus = extraerSumatoriasDocentes(data.docentes);
      const dTotal = extraerSumaTotal(dStatus);
      setDocentesData(data.docentes);
      setDocentesStatus({ ...dStatus, total: dTotal });
      setDocentesChart(
        buildDocentesRegionChart(docentesChart, data.docentes, dTotal)
      );

      const sStatus = extraerSumatoriaSostenedores(data.sostenedores);
      const sTotal = extraerSumaTotal(sStatus);
      setSostenedoresData(data.sostenedores);
      setSostenedoresStatus({ ...sStatus, total: sTotal });
      setSostenedoresChart(
        buildSostenedoresRegionChart(
          sostenedoresChart,
          data.sostenedores,
          sTotal
        )
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    docentesChart,
    docentesStatus,
    docentesData,
    sostenedoresChart,
    sostenedoresStatus,
    sostenedoresData,
  };
}
