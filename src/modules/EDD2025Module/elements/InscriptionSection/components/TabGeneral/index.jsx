import "./index.css";
import Select from "react-select";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// eslint-disable-next-line no-unused-vars
import exporting from "highcharts/modules/exporting";
import { useTabGeneral } from "./hooks/useTabGeneral";
import { DEPENDENCY_LIST } from "../../data/DependencyList";
import { CustomPieChart } from "../../../../../../components/CustomPieChart";

export function TabGeneral() {
  const {
    selectedFilter,
    setSelectedFilter,
    docentesSugeridos,
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
      <div className="normal-container">
        <div className="pie-grid-3">
          <CustomPieChart setup={docentesSugeridos} />
          <CustomPieChart setup={docenteAgregadoChart} />
          <CustomPieChart setup={docenteInscritoChart} />
        </div>
        <div className="pie-grid-2">
          <CustomPieChart setup={entidadSostenedorChart} />
          <CustomPieChart setup={sostenedorChart} />
        </div>
        <div className="general-point-chart-container">
          <HighchartsReact options={avancePointChart} highcharts={Highcharts} />
        </div>
      </div>
    </div>
  );
}
