import { useContext } from "react";
import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import { SELECT_STYLES } from "../../../../../../constants/CONST";
import { getFechas, getSalas, SelectorItems } from "../../data/SelectorItems";
import { useTab } from "./hooks/useTab";
import Select from "react-select";
import { AuthContext } from "../../../../../../context/AuthContext";

export function TabAsistencias() {
    const { data, handleFilter, selectedFilter } = useTab();
    const { getPayload } = useContext(AuthContext);
  return (
    <TabContent>
      <div className="tab-general-filter-row">
        <div className="tab-general-filter">
          <span>Centro de Corrección: </span>
          <Select
            value={selectedFilter.cdc}
            onChange={(option) => handleFilter("cdc", option)}
            options={SelectorItems.cdc}
            isDisabled = {getPayload()?.centro}
            isSearchable
            noOptionsMessage={() => "Ninguna CdC"}
            placeholder="Seleccione"
            styles={SELECT_STYLES}
          />
        </div>
        <div className="tab-general-filter">
          <span>Módulo: </span>
          <Select
            value={selectedFilter.modulo}
            onChange={(option) => handleFilter("modulo", option)}
            options={SelectorItems.modulos}
            isSearchable
            noOptionsMessage={() => "Ningun módulo"}
            placeholder="Seleccione"
            styles={SELECT_STYLES}
          />
        </div>
        <div className="tab-general-filter">
          <span>Especialidad: </span>
          <Select
            value={selectedFilter.especialidad}
            onChange={(option) => handleFilter("especialidad", option)}
            options={SelectorItems.especialidades}
            isSearchable
            noOptionsMessage={() => "Ninguna especialidad"}
            placeholder="Seleccione"
            styles={SELECT_STYLES}
          />
        </div>
        <div className="tab-general-filter">
          <span>Sala: </span>
          <Select
            value={selectedFilter.sala}
            onChange={(option) => handleFilter("sala", option)}
            options={getSalas()}
            isSearchable
            noOptionsMessage={() => "Ninguna sala"}
            placeholder="Seleccione"
            styles={SELECT_STYLES}
          />
        </div>
        <div className="tab-general-filter">
          <span>Cargo: </span>
          <Select
            value={selectedFilter.cargo}
            onChange={(option) => handleFilter("cargo", option)}
            options={SelectorItems.cargos}
            isSearchable
            noOptionsMessage={() => "Ningun cargo"}
            placeholder="Seleccione"
            styles={SELECT_STYLES}
          />
        </div>
        <div className="tab-general-filter">
          <span>Fecha: </span>
          <Select
            value={selectedFilter.fecha}
            onChange={(option) => handleFilter("fecha", option)}
            options={getFechas()}
            isSearchable
            noOptionsMessage={() => "Ninguna fecha"}
            placeholder="Seleccione"
            styles={SELECT_STYLES}
          />
        </div>
      </div>
      <div className="normal-container">
            <div className="pie-grid-1">
                <CustomPieChart subtitle={"ASISTENCIA <b>CORRECTORES</b>"} data={data}/>
            </div>
      </div>
    </TabContent>
  );
}
