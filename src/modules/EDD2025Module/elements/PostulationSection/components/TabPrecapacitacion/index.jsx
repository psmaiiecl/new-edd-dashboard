import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import Select from "react-select";
import useTabPrecapacitacion from "./hooks/useTabPrecapacitacion";
import { SelectorItems } from "../../data/SelectorItems";

function TabPrecapacitacion() {
  const { selectedFilter, handleFilter, chartData, selectorEspecialidades } =
    useTabPrecapacitacion();

  return (
    <TabContent>
      <div className="tab-general-filter-row">
        <div className="tab-general-filter">
          <span>Centro de Corrección: </span>
          <Select
            value={selectedFilter.cdc}
            onChange={(option) => handleFilter("cdc", option)}
            options={SelectorItems.cdc}
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
            value={selectedFilter.especialidad}
            onChange={(option) => handleFilter("especialidad", option)}
            options={SelectorItems.especialidades}
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
            value={selectedFilter.modulo}
            onChange={(option) => handleFilter("modulo", option)}
            options={SelectorItems.modulos}
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
