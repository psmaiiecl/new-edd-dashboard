import "./index.css";
import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// eslint-disable-next-line no-unused-vars
import exporting from "highcharts/modules/exporting";
import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import {
  MULTIPLE_BAR_CONFIG,
  PIE_CONFIG,
  POINT_CONFIG,
  STACK_BAR_CONFIG,
} from "../../../../../../constants/CHART_CONFIGS";
import { useCustomFetch } from "../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2024 } from "../../../../data/BASE_API_URL";
import {
  buildAgendamientoApilado,
  buildAgendamientoGeneral,
} from "../../utils/generalTabUtils";

export function TabGeneral() {
  const customFetch = useCustomFetch();

  const [docentesChart, setDocentesChart] = useState({
    ...PIE_CONFIG,
    subtitle: {
      text: "DOCENTES A <b>AGENDAR GRABACIÓN</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Cantidad de Docentes",
        colorByPoint: true,
        data: [
          {
            name: "Docentes Agendados",
            y: 0,
            sliced: true,
            selected: true,
            color: "rgb(143, 184, 255)",
          },
          {
            name: "Docentes con Contacto Inicial",
            y: 0,
            color: "rgb(255, 209, 83)",
          },
          {
            name: "Docentes sin Contacto",
            y: 0,
            color: "rgb(255, 88, 128)",
          },
        ],
      },
    ],
  });
  const [establecimientosChart, setEstablecimientosChart] = useState({
    ...PIE_CONFIG,
    subtitle: {
      text: "ESTABLECIMIENTO A <b>AGENDAR GRABACIÓN</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Cantidad de Establecimientos",
        colorByPoint: true,
        data: [
          {
            name: "Establecimientos con Docentes Agendados",
            y: 0,
            color: "rgb(144, 184, 254)",
          },
          {
            name: "Establecimientos con Contacto Inicial",
            y: 0,
            color: "rgb(253, 208, 80)",
          },
          {
            name: "Establecimientos sin Contacto",
            y: 0,
            color: "rgb(255, 88, 128)",
          },
        ],
      },
    ],
  });
  const [weeklyStackChart, setWeeklyStackChart] = useState({
    ...STACK_BAR_CONFIG,
    title: {
      ...STACK_BAR_CONFIG.title,
      text: "AGENDAMIENTO PARA CADA SEMANA",
    },
  });
  const [weeklyScheduleChart, setWeeklyScheduleChart] = useState({
    ...MULTIPLE_BAR_CONFIG,
    title: {
      ...MULTIPLE_BAR_CONFIG.title,
      text: "Agendamiento Semanal",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Avance",
      },
      labels: {
        format: "{value}",
      },
    },
    xAxis: {
      title: {
        text: "Semanas",
      },
      //categories: semanas,
      crosshair: true,
      accessibility: {
        description: "Semanas",
      },
    },
  });
  const [fullScheduleChart, setFullScheduleChart] = useState({
    ...POINT_CONFIG,
    title: {
      ...POINT_CONFIG.title,
      text: "Agendamiento Acumulado",
    },
    xAxis: {
      title: {
        text: "Semanas",
      },
      //categories: semanas,
      crosshair: true,
      accessibility: {
        description: "Semanas",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Avance",
      },
      labels: {
        format: "{value}",
      },
    },
  });

  useEffect(() => {
    customFetch(
      BASE_API_URL_2024 +
        "/datos-json?etiqueta=2024-grabaciones-agendamiento-semanal-apilado",
      { method: "POST" }
    ).then((data) =>
      setWeeklyStackChart(
        buildAgendamientoApilado(weeklyStackChart, data.agendamiento_semanal)
      )
    );

    customFetch(
      BASE_API_URL_2024 +
        "/datos-json?etiqueta=2024-grabaciones-agendamiento-semanal",
      { method: "POST" }
    ).then((data) => {
      setWeeklyScheduleChart(
        buildAgendamientoGeneral(weeklyScheduleChart, data.agendamiento_semanal)
      );
      setFullScheduleChart(
        buildAgendamientoGeneral(fullScheduleChart, data.agendamiento_acumulado)
      );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="tab-general">
      <div className="normal-container">
        <div className="pie-grid-2">
          <CustomPieChart setup={docentesChart} />
          <CustomPieChart setup={establecimientosChart} />
        </div>
      </div>
      <div className="normal-container">
        <div className="general-point-chart-container">
          <HighchartsReact options={weeklyStackChart} highcharts={Highcharts} />
        </div>
        <div className="general-point-chart-container">
          <HighchartsReact
            options={weeklyScheduleChart}
            highcharts={Highcharts}
          />
        </div>
        <div className="general-point-chart-container">
          <HighchartsReact
            options={fullScheduleChart}
            highcharts={Highcharts}
          />
        </div>
      </div>
    </div>
  );
}
