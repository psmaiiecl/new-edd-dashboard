import "./index.css";
import Select from "react-select";
import { useTabGeneral } from "./hooks/useTabGeneral";
import { DEPENDENCY_LIST } from "../../data/DependencyList";
import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import { CustomDotLineChart } from "../../../../../../components/CustomDotLineChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";

export function TabGeneral() {
  const { selectedFilter, setSelectedFilter, charts } = useTabGeneral();

  return (
    <TabContent>
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
          <CustomPieChart
            subtitle={"DOCENTES <b>SUGERIDOS</b>"}
            data={charts.docentes_sugeridos}
          />
          <CustomPieChart
            subtitle={"DOCENTES <b>AGREGADOS POR SOSTENEDORES</b>"}
            data={charts.docentes_agregados}
          />
          
          <CustomPieChart
            subtitle={"TOTAL <b>DOCENTES INSCRITOS</b>"}
            data={charts.docentes_inscritos}
          />
        </div>
        <CustomDotLineChart
          title={"AVANCE DIARIO <b>PROCESO DE INSCRIPCIÓN 2026 POR DOCENTE</b>"}
          data={charts.avance_diario}
        />
      </div>
    </TabContent>
  );
}
