import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import Select from "react-select";
import useTabPrecapacitacion from "./hooks/useTabPrecapacitacion";
import { SelectorItems } from "../../data/SelectorItems";
import { SELECT_STYLES } from "../../../../../../constants/CONST";
import { useCustomDownload } from "../../../../../../hooks/useCustomDownload";
import { BASE_API_URL_2025 } from "../../../../data/BASE_API_URL";
import { Button } from "../../../../../../components/Button";

function TabPrecapacitacion() {
  const { selectedFilter, handleFilter, chartData } = useTabPrecapacitacion();
  const customDownload = useCustomDownload();

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
            noOptionsMessage={() => "Ningun CdC"}
            placeholder="Seleccione un CdC"
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
            noOptionsMessage={() => "Ningun especialidad"}
            placeholder="Seleccione una especialidad"
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
            noOptionsMessage={() => "Ninguna módulo"}
            placeholder="Seleccione un módulo"
            styles={SELECT_STYLES}
          />
        </div>
        <div
          style={{
            display: "flex",
            boxSizing: "border-box",
            alignSelf: "end",
          }}
        >
          {/* <Button text={"Limpiar Filtros"} action={() => clearFilters()} /> */}
          <Button
            text={"Descargar Excel"}
            action={() => {
              customDownload({
                route: BASE_API_URL_2025 + "/2025-precapacitacion-excel",
                options: { method: "GET" },
                filename: "precapacitacion_excel.xlsx",
              });
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
