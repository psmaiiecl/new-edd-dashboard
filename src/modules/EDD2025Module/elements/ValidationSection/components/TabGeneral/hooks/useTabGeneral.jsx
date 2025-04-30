import { useContext, useEffect, useState } from "react";
import {
  CAMBIO_LIST,
  CONVOCATORIA_LIST,
  ESTADO_LIST,
  SUSPENSION_LIST,
} from "../../../data/FilterList";
import {
  getGeneralValidation,
  getValidationParticipationStatus,
} from "../../../../../services/ValidationServices";
import { AuthContext } from "../../../../../../../context/AuthContext";
import { BASIC_PIE } from "../../../../InscriptionSection/data/BASIC_PIE";
import {
  buildAvanceDiario,
  buildCausales,
  buildDocentesInscritos,
  buildEstadoParticipacion,
  buildEvoCambio,
  buildEvoSuspensionEximicion,
  buildSolicitudes,
} from "../../../utils/generalTabUtils";

export function useTabGeneral() {
  const { getToken } = useContext(AuthContext);
  const [selectedFilter, setSelectedFilter] = useState({
    convocatoria: CONVOCATORIA_LIST[0],
    estado: ESTADO_LIST[0],
    cambio: CAMBIO_LIST[0],
    suspension: SUSPENSION_LIST[0],
  });
  const [docentesChart, setDocentesChart] = useState({
    ...BASIC_PIE,
    plotOptions: {
      ...BASIC_PIE.plotOptions,
      pie: {
        ...BASIC_PIE.plotOptions.pie,
        dataLabels: {
          enabled: false,
        },
      },
    },
    subtitle: {
      text: " DOCENTES <b>INSCRITOS</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Docentes inscritos",
        colorByPoint: true,
        data: [
          {
            name: "Validados",
            y: 0,
            sliced: true,
            selected: true,
            color: "#65D9AB",
          },
          {
            name: "Actualizados",
            y: 0,
            color: "#ffd153",
          },
          {
            name: "No Validados - Susp/Exim Aprobada",
            y: 0,
            color: "#8fb8ff",
          },
          {
            name: "No Validados",
            y: 0,
            color: "#ff8e53",
          },
          {
            name: "Sin Ingreso a Plataforma",
            y: 0,
            color: "#ff5880",
          },
        ],
      },
    ],
  });
  const [solicitudesCambioChart, setSolicitudesCambioChart] = useState({
    ...BASIC_PIE,
    subtitle: {
      text: " SOLICITUDES DE CAMBIO <b>DE AGRUPACIÓN Y/O ASIGNATURA</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Solicitudes de cambio grupo/agrupacion",
        colorByPoint: true,
        data: [
          {
            name: "Aprobadas",
            y: 0,
            sliced: true,
            selected: true,
            color: "#65D9AB",
          },
          {
            name: "Pendientes",
            y: 0,
            color: "#ff8e53",
          },
          {
            name: "Rechazadas",
            y: 0,
            color: "#ff5880",
          },
        ],
      },
    ],
  });
  const [solicitudesSuspensionChart, setSolicitudesSuspensionChart] = useState({
    ...BASIC_PIE,
    subtitle: {
      text: " SOLICITUDES DE <b>SUSPENSIÓN Y/O EXIMICIÓN</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Solicitudes suspensión y/o eximición",
        colorByPoint: true,
        data: [
          {
            name: "Aprobados",
            y: 0,
            sliced: true,
            selected: true,
            color: "#65D9AB",
          },
          {
            name: "Pendientes",
            y: 0,
            color: "#ff8e53",
          },
          {
            name: "Rechazadas",
            y: 0,
            color: "#ff5880",
          },
        ],
      },
    ],
  });
  const [estadoChart, setEstadoChart] = useState({
    ...BASIC_PIE,
    subtitle: {
      text: " ESTADO DE <b>PARTICIPACIÓN</b> DE DOCENTES VALIDADOS",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Estado participación docentes validados",
        colorByPoint: true,
        data: [
          {
            name: "Rinde",
            y: 0,
            sliced: true,
            selected: true,
            color: "#65D9AB",
          },
          {
            name: "No Rinde PF",
            y: 0,
            color: "#ff5880",
          },
        ],
      },
    ],
  });
  const [causalesChart, setCausalesChart] = useState({
    ...BASIC_PIE,
    subtitle: {
      text: " CAUSALES DE <b>NO EVALUACIÓN</b> DE DOCENTES VALIDADOS",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Causales de no evaluación de docentes validados",
        colorByPoint: true,
        data: [
          {
            name: "Suspensión",
            y: 0,
            sliced: true,
            selected: true,
            color: "#65D9AB",
          },
          {
            name: "Eximición",
            y: 0,
            color: "#ffd153",
          },
          {
            name: "19Ñ",
            y: 0,
            color: "#8fb8ff",
          },
          {
            name: "Tramo Voluntario",
            y: 0,
            color: "#ff8e53",
          },
          {
            name: "Aplazamiento",
            y: 0,
            color: "#ff5880",
          },
          {
            name: "Portafolio Corregido",
            y: 0,
            color: "#c1d9ca",
          },
        ],
      },
    ],
  });
  const [avanceDocentePointChart, setAvanceDocentePointChart] = useState({
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
      text: "Avance Diario de Validación Docente",
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
        format: "{value}",
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
        name: "Validados",
        data: [],
      },
      {
        color: "#FF5880",
        name: "No Validados",
        data: [],
      },
      {
        color: "#ff8e53",
        name: "Ingresos",
        data: [],
      },
    ],
  });
  const [evolucionCambioPointChart, setEvolucionCambioPointChart] = useState({
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
      text: "Evolución Diaria de Solicitudes de Cambio de Agrupación/Asignatura",
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
        format: "{value}",
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
        name: "Solicitudes Creadas",
        data: [],
      },
      {
        color: "#ff8e53",
        name: "Solicitudes Procesadas",
        data: [],
      },
    ],
  });
  const [evolucionSolicitudesChart, setEvolucionSolicitudesChart] = useState({
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
      text: "Evolución Diaria de Solicitudes de Suspensión/Eximición",
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
        format: "{value}",
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
        name: "Solicitudes Creadas",
        data: [],
      },
      {
        color: "#ff8e53",
        name: "Solicitudes Procesadas",
        data: [],
      },
    ],
  });

  const handleFilter = (key, option) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [key]: option,
    }));
  };

  useEffect(() => {
    getGeneralValidation(getToken(), selectedFilter).then((data) => {
      setDocentesChart(buildDocentesInscritos(docentesChart, data.validacion));
      setSolicitudesCambioChart(
        buildSolicitudes(solicitudesCambioChart, data.solicitudes_cambio_nivel)
      );
      setSolicitudesSuspensionChart(
        buildSolicitudes(
          solicitudesSuspensionChart,
          data.solicitudes_suspension
        )
      );
      setEvolucionSolicitudesChart(
        buildEvoSuspensionEximicion(
          evolucionSolicitudesChart,
          data.avance_diario_sol_susp_exim
        )
      );
      setEvolucionCambioPointChart(
        buildEvoCambio(
          evolucionCambioPointChart,
          data.avance_diario_sol_cambio_nivel
        )
      );
      setAvanceDocentePointChart(
        buildAvanceDiario(avanceDocentePointChart, data.avance_diario)
      );
    });
    getValidationParticipationStatus(getToken()).then((data) => {
      setEstadoChart(buildEstadoParticipacion(estadoChart, data.participacion));
      setCausalesChart(buildCausales(causalesChart, data.causales));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken, selectedFilter]);

  return {
    selectedFilter,
    handleFilter,
    docentesChart,
    solicitudesCambioChart,
    solicitudesSuspensionChart,
    estadoChart,
    causalesChart,
    avanceDocentePointChart,
    evolucionCambioPointChart,
    evolucionSolicitudesChart,
  };
}
