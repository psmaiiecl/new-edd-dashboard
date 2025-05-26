import "./index.css";
import Select from "react-select";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// eslint-disable-next-line no-unused-vars
import exporting from "highcharts/modules/exporting";
import { BasicLegend } from "../BasicLegend";
import { useTabGeneral } from "./hooks/useTabGeneral";
import { DEPENDENCY_LIST } from "../../data/DependencyList";

export function TabGeneral() {
  const {
    selectedFilter,
    setSelectedFilter,
    docenteSugeridoChart,
    docenteAgregadoChart,
    docenteInscritoChart,
    entidadSostenedorChart,
    sostenedorChart,
    avancePointChart,
  } = useTabGeneral();

  return (
    <div className="tab-general">
      <div className="tab-general-filtro">
        <span>Dependencia: </span>
        <Select
          className="roboto-regular tab-general-filtro-container"
          value={selectedFilter}
          onChange={(option) => setSelectedFilter(option)}
          options={DEPENDENCY_LIST}
          isSearchable
          noOptionsMessage={() => "Ninguna dependencia"}
          placeholder="Seleccione una dependencia"
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
      <div className="tab-general-upper">
        <div className="tab-general-docente">
          <div className="general-pie-chart-container">
            <HighchartsReact
              options={docenteSugeridoChart}
              highcharts={Highcharts}
            />
            <hr />
            <BasicLegend
              data={docenteSugeridoChart.series}
              total={+docenteSugeridoChart.title.number}
            />
          </div>
          <div className="general-pie-chart-container">
            <HighchartsReact
              options={docenteAgregadoChart}
              highcharts={Highcharts}
            />
            <hr />
            <BasicLegend
              data={docenteAgregadoChart.series}
              total={+docenteAgregadoChart.title.number}
            />
          </div>
          <div className="general-pie-chart-container">
            <HighchartsReact
              options={docenteInscritoChart}
              highcharts={Highcharts}
            />
            <hr />
            <BasicLegend
              data={docenteInscritoChart.series}
              total={+docenteInscritoChart.title.number}
            />
          </div>
        </div>
        <div className="tab-general-docente">
          <div className="general-pie-chart-container">
            <HighchartsReact
              options={entidadSostenedorChart}
              highcharts={Highcharts}
            />
            <hr />
            <BasicLegend
              data={entidadSostenedorChart.series}
              total={+entidadSostenedorChart.title.number}
            />
          </div>
          <div className="general-pie-chart-container">
            <HighchartsReact
              options={sostenedorChart}
              highcharts={Highcharts}
            />
            <hr />
            <BasicLegend
              data={sostenedorChart.series}
              total={+sostenedorChart.title.number}
            />
          </div>
        </div>
      </div>
      <div className="general-point-chart-container">
        <HighchartsReact options={avancePointChart} highcharts={Highcharts} />
      </div>
    </div>
  );
}
