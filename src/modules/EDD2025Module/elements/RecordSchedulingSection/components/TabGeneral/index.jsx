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
import { useTabGeneral } from "./hooks/useTabGeneral";
import { TabContent } from "../../../../../../components/Layout/TabContent";

export function TabGeneral() {
  const customFetch = useCustomFetch();

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

  const {
    docentesAgendados,
    establecimientosAgendados,
    agendamientoApilado,
    agendamientoSemanal,
    agendamientoGlobal,
  } = useTabGeneral();
  useEffect(() => {
    

    customFetch({
      route:
        BASE_API_URL_2024 +
        "/datos-json?etiqueta=2024-grabaciones-agendamiento-semanal-apilado",
    }).then((data) =>
      setWeeklyStackChart()
      //buildAgendamientoApilado(weeklyStackChart, data.agendamiento_semanal)
    );

    customFetch({
      route:
        BASE_API_URL_2024 +
        "/datos-json?etiqueta=2024-grabaciones-agendamiento-semanal",
    }).then((data) => {
      setWeeklyScheduleChart();
      //buildAgendamientoGeneral(weeklyScheduleChart, data.agendamiento_semanal)
      setFullScheduleChart();
      //buildAgendamientoGeneral(fullScheduleChart, data.agendamiento_acumulado)
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <TabContent>
      <div className="normal-container">
        <div className="pie-grid-2">
          <CustomPieChart
            data={docentesAgendados}
            subtitle={"DOCENTES A <b>AGENDAR GRABACIÓN</b>"}
          />
          <CustomPieChart
            data={establecimientosAgendados}
            subtitle={"ESTABLECIMIENTOS A <b>AGENDAR GRABACIÓN</b>"}
          />
        </div>
      </div>
      <div className="normal-container">
        <div className="general-point-chart-container">
          {/* <HighchartsReact options={weeklyStackChart} highcharts={Highcharts} /> */}
        </div>
        <div className="general-point-chart-container">
          {/* <HighchartsReact
            options={weeklyScheduleChart}
            highcharts={Highcharts}
          /> */}
        </div>
        <div className="general-point-chart-container">
          {/* <HighchartsReact
            options={fullScheduleChart}
            highcharts={Highcharts}
          /> */}
        </div>
      </div>
    </TabContent>
  );
}
