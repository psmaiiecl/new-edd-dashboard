import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../../../context/AuthContext";
import { LoadingContext } from "../../../../../../../context/LoadingContext";
import { DEPENDENCY_LIST } from "../../../data/DependencyList";
import { BASIC_PIE } from "../../../data/BASIC_PIE";
import { getFilteredInscriptionData } from "../../../../../services/InscriptionServices";
import {
  buildAvanceDiario,
  buildDocentesAgregados,
  buildDocentesInscritos,
  buildDocentesSugeridos,
  buildEntidadesSostenedoras,
  buildSostenedoresParticipantes,
} from "../../../utils/generalTabUtils";
import { AVANCE_DIARIO_2024 } from "../../../data/AVANCE_DIARIO_2024";

export function useTabGeneral() {
  const { getToken } = useContext(AuthContext);
  const { queueLoading, dequeueLoading } = useContext(LoadingContext);
  const [selectedFilter, setSelectedFilter] = useState(DEPENDENCY_LIST[0]);
  const [docenteSugeridoChart, setDocenteSugeridoChart] = useState({
    ...BASIC_PIE,
    subtitle: {
      text: " DOCENTES <b>SUGERIDOS</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Docentes sugeridos",
        colorByPoint: true,
        data: [
          {
            name: "Inscritos",
            y: 0,
            sliced: true,
            selected: true,
            color: "#65D9AB",
          },
          {
            name: "Desinscritos",
            y: 0,
            color: "#C1D9CA",
          },
          {
            name: "Pendientes",
            y: 0,
            color: "#FFD153",
          },
        ],
      },
    ],
  });
  const [docenteAgregadoChart, setDocenteAgregadoChart] = useState({
    ...BASIC_PIE,
    subtitle: {
      text: " DOCENTES <b>AGREGADOS POR SOSTENEDORES</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Docentes agregados por sostenedores",
        colorByPoint: true,
        data: [
          {
            name: "Inscritos",
            y: 0,
            sliced: true,
            selected: true,
            color: "#65D9AB",
          },
          {
            name: "En Revisión",
            y: 0,
            color: "#FF8E53",
          },
          {
            name: "No Inscritos",
            y: 0,
            color: "#FF5880",
          },
        ],
      },
    ],
  });
  const [docenteInscritoChart, setDocenteInscritoChart] = useState({
    ...BASIC_PIE,
    subtitle: {
      text: " TOTAL <b>DOCENTES INSCRITOS</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Total docentes inscritos",
        colorByPoint: true,
        data: [
          {
            name: "Inscritos",
            y: 0,
            sliced: true,
            selected: true,
            color: "#65D9AB",
          },
          {
            name: "Cancelados",
            y: 0,
            color: "#FF5880",
          },
        ],
      },
    ],
  });
  const [entidadSostenedorChart, setEntidadSostenedorChart] = useState({
    ...BASIC_PIE,
    subtitle: {
      text: "TOTAL <b>ENTIDADES SOSTENEDORAS</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Sostenedores",
        colorByPoint: true,
        data: [
          {
            name: "Con Rep. Legal registrado",
            y: 0,
            sliced: true,
            selected: true,
            color: "#FF5880",
          },
          {
            name: "Sin Rep. Legal registrado",
            y: 0,
            color: "#FF8E53",
          },
        ],
      },
    ],
  });
  const [sostenedorChart, setSostenedorChart] = useState({
    ...BASIC_PIE,
    legend: {
      ...BASIC_PIE.legend,
      layout: "horizontal",
      itemDistance: 10,
      alignColumns: false,
      width: "100%",
      itemMarginTop: 2,
    },
    subtitle: {
      text: " SOSTENEDORES <b>PARTICIPANTES</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Sostenedores",
        colorByPoint: true,
        data: [
          {
            name: "Sin ingreso",
            y: 0,
            sliced: true,
            selected: true,
            color: "#FF5880",
          },
          {
            name: "Con ingreso sin docentes inscritos",
            y: 0,
            color: "#FF8E53",
          },
          {
            name: "Inscripción iniciada",
            y: 0,
            color: "#65D9AB",
          },
          {
            name: "Sin docentes pendientes",
            y: 0,
            color: "#8FB8FF",
          },
        ],
      },
    ],
  });
  const [avancePointChart, setAvancePointChart] = useState({
    chart: {
      align: "left",
      renderTo: "container_avance",
    },
    leyend: {
      itemStyle: {
        fontSize: "22px",
      },
    },
    title: {
      text: "Avance Diario Proceso de Inscripción 2025 por Docente",
      align: "center",
      style: {
        fontWeight: "bold",
        fontSize: "18px",
        color: "#666666",
      },
    },
    yAxis: {
      title: {
        enabled: false,
      },
      labels: {
        format: "{value}%",
      },
    },
    xAxis: {
      type: "category",
      categories: [],
      title: {
        text: "Fecha",
        style: {
          fontWeight: "bold",
          fontSize: "18px",
          color: "#666666",
        },
      },
    },

    plotOptions: {
      series: {
        color: "#FFA500",
        label: {
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        color: "#5157FF",
        name: "Porcentaje avance",
        data: [],
        tooltip: {
          valueSuffix: "%",
          valueDecimals: 1,
        },
      },
      {
        color: "#28a745",
        name: "Porcentaje avance 2024",
        data: [],
        tooltip: {
          valueSuffix: "%",
          valueDecimals: 1,
        },
      },
    ],
  });

  useEffect(() => {
    queueLoading();
    getFilteredInscriptionData(getToken(), selectedFilter.value).then(
      (data) => {
        setDocenteSugeridoChart(
          buildDocentesSugeridos(docenteSugeridoChart, data.inscripcion_general)
        );
        setDocenteAgregadoChart(
          buildDocentesAgregados(docenteAgregadoChart, data.inscripcion_general)
        );
        setDocenteInscritoChart(
          buildDocentesInscritos(docenteInscritoChart, data.inscripcion_general)
        );
        setEntidadSostenedorChart(
          buildEntidadesSostenedoras(
            entidadSostenedorChart,
            data.inscripcion_general
          )
        );
        setSostenedorChart(
          buildSostenedoresParticipantes(
            sostenedorChart,
            data.inscripcion_general
          )
        );
        setAvancePointChart(
          buildAvanceDiario(
            avancePointChart,
            data.avance_diario,
            AVANCE_DIARIO_2024
          )
        );
        dequeueLoading();
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  return {
    selectedFilter,
    setSelectedFilter,
    docenteSugeridoChart,
    docenteAgregadoChart,
    docenteInscritoChart,
    entidadSostenedorChart,
    sostenedorChart,
    avancePointChart,
  };
}
