import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import Select from "react-select";
import useTabPrecapacitacion from "./hooks/useTabPrecapacitacion";

function TabPrecapacitacion() {
  const { selectedFilter, handleFilter, chartData } = useTabPrecapacitacion();

  return (
    <TabContent>
      <div className="tab-general-filter-row">
        <div className="tab-general-filter">
          <span>Centro de Corrección: </span>
          <Select
            // value={selectedFilter.convocatoria}
            // onChange={(option) => handleFilter("convocatoria", option)}
            // options={CONVOCATORIA_LIST}
            isSearchable
            noOptionsMessage={() => "Ninguna CdC"}
            placeholder="Seleccione un CdC"
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
          <span>Especialidad: </span>
          <Select
            // value={selectedFilter.estado}
            // onChange={(option) => handleFilter("estado", option)}
            // options={ESTADO_LIST}
            isSearchable
            noOptionsMessage={() => "Ningun especialidad"}
            placeholder="Seleccione una especialidad"
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
          <span>Módulo: </span>
          <Select
            // value={selectedFilter.nivel}
            // onChange={(option) => handleFilter("nivel", option)}
            // options={CAMBIO_LIST}
            isSearchable
            noOptionsMessage={() => "Ninguna módulo"}
            placeholder="Seleccione un módulo"
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
        <div className="pie-grid-2">
          <CustomPieChart
            subtitle={"ESTADO DE <b>CORRECTORES</b>"}
            data={chartData.correctores}
          />
          <CustomPieChart
            subtitle={"ESTADO DE <b>SUPERVISORES</b>"}
            data={chartData.supervisores}
          />
        </div>
      </div>
    </TabContent>
  );
}

export default TabPrecapacitacion;
