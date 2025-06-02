import "./index.css";
import Select from "react-select";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// eslint-disable-next-line no-unused-vars
import exporting from "highcharts/modules/exporting";
import {
  CAMBIO_LIST,
  CONVOCATORIA_LIST,
  ESTADO_LIST,
  SUSPENSION_LIST,
} from "../../data/FilterList";
import { useTabGeneral } from "./hooks/useTabGeneral";
import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import { PIE_CONFIG } from "../../../../../../constants/CHART_CONFIGS";
import { CustomDotLineChart } from "../../../../../../components/CustomDotLineChart";

export function TabGeneral() {
  const {
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
  } = useTabGeneral();

  return (
    <div className="tab-general roboto-regular">
      <div className="tab-general-filter-row">
        <div className="tab-general-filter">
          <span>Convocatoria: </span>
          <Select
            value={selectedFilter.convocatoria}
            onChange={(option) => handleFilter("convocatoria", option)}
            options={CONVOCATORIA_LIST}
            isSearchable
            noOptionsMessage={() => "Ninguna convocatoria"}
            placeholder="Seleccione una convocatoria"
            styles={{
              control: (base) => ({
                ...base,
                fontSize: "13px",
                padding: "0px 10px ",
              }),
              option: (base) => ({
                ...base,
                fontSize: "13px",
                color: "black",
              }),
            }}
          />
        </div>
        <div className="tab-general-filter">
          <span>Estado de Validación: </span>
          <Select
            value={selectedFilter.estado}
            onChange={(option) => handleFilter("estado", option)}
            options={ESTADO_LIST}
            isSearchable
            noOptionsMessage={() => "Ningun estado"}
            placeholder="Seleccione un estado"
            styles={{
              control: (base) => ({
                ...base,
                fontSize: "13px",
                padding: "0px 10px ",
              }),
              option: (base) => ({
                ...base,
                fontSize: "13px",
                color: "black",
              }),
            }}
          />
        </div>
        <div className="tab-general-filter">
          <span>Cambio Agrupación/Asignatura: </span>
          <Select
            value={selectedFilter.nivel}
            onChange={(option) => handleFilter("nivel", option)}
            options={CAMBIO_LIST}
            isSearchable
            noOptionsMessage={() => "Ninguna agrupacion/asignatura"}
            placeholder="Seleccione una agrupacion/asignatura"
            styles={{
              control: (base) => ({
                ...base,
                fontSize: "13px",
                padding: "0px 10px ",
              }),
              option: (base) => ({
                ...base,
                fontSize: "13px",
                color: "black",
              }),
            }}
          />
        </div>
        <div className="tab-general-filter">
          <span>Suspensión/Eximición: </span>
          <Select
            value={selectedFilter.suspension}
            onChange={(option) => handleFilter("suspension", option)}
            options={SUSPENSION_LIST}
            isSearchable
            noOptionsMessage={() => "Ninguna suspensión/eximición"}
            placeholder="Seleccione una suspensión/eximición"
            styles={{
              control: (base) => ({
                ...base,
                fontSize: "13px",
                padding: "0px 10px ",
              }),
              option: (base) => ({
                ...base,
                fontSize: "13px",
                color: "black",
              }),
            }}
          />
        </div>
      </div>
      <div className="normal-container">
        <div className="pie-grid-1">
          <CustomPieChart
            subtitle={"DOCENTES <b>INSCRITOS</b>"}
            data={docentesChart}
            overrideConfig={docentesOverrideConfigs}
          />
        </div>
        <div className="pie-grid-2">
          <CustomPieChart
            subtitle={
              "SOLICITUDES DE CAMBIO <b>DE AGRUPACIÓN Y/O ASIGNATURA</b>"
            }
            data={solicitudesCambioChart}
          />
          <CustomPieChart
            subtitle={"SOLICITUDES DE <b>SUSPENSIÓN Y/O EXIMICIÓN</b>"}
            data={solicitudesSuspensionChart}
          />
        </div>
        <div className="pie-grid-2">
          <CustomPieChart
            subtitle={"ESTADO DE <b>PARTICIPACIÓN</b> DE DOCENTES VALIDADOS"}
            data={estadoChart}
          />
          <CustomPieChart
            subtitle={"CAUSALES DE <b>NO EVALUACIÓN</b> DE DOCENTES VALIDADOS"}
            data={causalesChart}
          />
        </div>
      </div>
      <hr />
      <CustomDotLineChart
        title={"AVANCE DIARIO <b>VALIDACION DE DOCENTES</b>"}
        data={avanceDocentePointChart}
        overrideConfig={axisOverrideConfig}
      />
      <hr />
      <CustomDotLineChart
        title={
          "EVOLUCIÓN DIARIA DE SOLICITUDES DE <b>CAMBIO DE AGRUPACIÓN Y ASIGNATURA</b>"
        }
        data={evolucionCambioPointChart}
        overrideConfig={axisOverrideConfig}
      />
      <hr />
      <CustomDotLineChart
        title={"EVOLUCIÓN DIARIA DE SOLICITUDES DE <b>SUSPENSIÓN/EXIMICIÓN</b>"}
        data={evolucionSolicitudesChart}
        overrideConfig={axisOverrideConfig}
      />
    </div>
  );
}

const docentesOverrideConfigs = {
  plotOptions: {
    ...PIE_CONFIG.plotOptions,
    pie: {
      ...PIE_CONFIG.plotOptions.pie,
      size: "80%",
    },
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
    itemMarginBottom: 8,
    itemStyle: {
      fontSize: "12px",
      whiteSpace: "normal",
    },
    x: -100,
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 1000,
        },
        chartOptions: {
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
            x: 0,
            y: 0,
          },
        },
      },
    ],
  },
};

const axisOverrideConfig = {
  yAxis: {
    title: {
      enabled: false,
    },
    labels: {
      format: "{value}",
    },
  },
};
