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
            value={selectedFilter.cambio}
            onChange={(option) => handleFilter("cambio", option)}
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
          <CustomPieChart setup={docentesChart} />
        </div>
        <div className="pie-grid-2">
          <CustomPieChart setup={solicitudesCambioChart} />
          <CustomPieChart setup={solicitudesSuspensionChart} />
        </div>
        <div className="pie-grid-2">
          <CustomPieChart setup={estadoChart} />
          <CustomPieChart setup={causalesChart} />
        </div>
      </div>
      <div className="general-point-chart-container">
        <HighchartsReact
          options={avanceDocentePointChart}
          highcharts={Highcharts}
        />
      </div>
      <div className="general-point-chart-container">
        <HighchartsReact
          options={evolucionCambioPointChart}
          highcharts={Highcharts}
        />
      </div>
      <div className="general-point-chart-container">
        <HighchartsReact
          options={evolucionSolicitudesChart}
          highcharts={Highcharts}
        />
      </div>
    </div>
  );
}
