import "./index.css";
import Select from "react-select";
import { useTabGeneral } from "./hooks/useTabGeneral";
import { DEPENDENCY_LIST } from "../../data/DependencyList";
import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import { CustomDotLineChart } from "../../../../../../components/CustomDotLineChart";

export function TabGeneral() {
  const {
    selectedFilter,
    setSelectedFilter,
    docentesSugeridos,
    docentesAgregados,
    docentesInscritos,
    entidadesSostenedoras,
    sostenedoresParticipantes,
    avanceDiario,
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
          <CustomPieChart
            subtitle={"DOCENTES <b>SUGERIDOS</b>"}
            data={docentesSugeridos}
          />
          <CustomPieChart
            subtitle={"DOCENTES <b>AGREGADOS POR SOSTENEDORES</b>"}
            data={docentesAgregados}
          />
          <CustomPieChart
            subtitle={"TOTAL <b>DOCENTES INSCRITOS</b>"}
            data={docentesInscritos}
          />
        </div>
        <div className="pie-grid-2">
          <CustomPieChart
            subtitle={"TOTAL <b>ENTIDADES SOSTENEDORAS</b>"}
            data={entidadesSostenedoras}
          />
          <CustomPieChart
            subtitle={"SOSTENEDORES <b>PARTICIPANTES</b>"}
            data={sostenedoresParticipantes}
          />
        </div>
        <CustomDotLineChart
          title={"AVANCE DIARIO <b>PROCESO DE INSCRIPCIÓN 2025 POR DOCENTE</b>"}
          data={avanceDiario}
        />
      </div>
    </div>
  );
}
