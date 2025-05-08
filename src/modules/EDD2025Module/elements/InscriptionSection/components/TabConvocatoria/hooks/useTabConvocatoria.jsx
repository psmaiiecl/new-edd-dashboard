import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../../../context/AuthContext";
import { BASIC_BAR } from "../../../data/BASIC_BAR";
import { getInscriptionConvocatoria } from "../../../../../services/InscriptionServices";
import {
  buildDocentesDependenciaChart,
  extraerSumatoriasDocentes,
  extraerSumaTotal,
} from "../../../utils/convocatoriaTabUtils";

export function useTabConvocatoria() {
  const { getToken } = useContext(AuthContext);
  const [docentesConvocatoriaData, setDocentesConvocatoriaData] = useState({});
  const [docentesStatus, setDocentesStatus] = useState({
    Inscrito: 0,
    "En Revisión": 0,
    Desinscrito: 0,
    Pendiente: 0,
    Cancelado: 0,
    total: 0,
  });
  const [docentesConvocatoria, setDocentesConvocatoria] = useState({
    ...BASIC_BAR,
    chart: {
      ...BASIC_BAR.chart,
      height: 450,
    },
    subtitle: {
      text: "<b>ESTADO DE DOCENTES</b> DISTRIBUIDOS POR CONVOCATORIA",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    xAxis: {
      ...BASIC_BAR.xAxis,
      categories: [
        "Participación voluntaria",
        "Participación obligatoria",
        "No Habilitado",
      ],
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

  useEffect(() => {
    getInscriptionConvocatoria(getToken()).then((data) => {
      const dStatus = extraerSumatoriasDocentes(data.docentes);
      const dTotal = extraerSumaTotal(dStatus);
      setDocentesConvocatoriaData(data.docentes);
      setDocentesStatus({ ...dStatus, total: dTotal });
      setDocentesConvocatoria(
        buildDocentesDependenciaChart(
          docentesConvocatoria,
          data.docentes,
          dTotal
        )
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { docentesConvocatoria, docentesStatus, docentesConvocatoriaData };
}
