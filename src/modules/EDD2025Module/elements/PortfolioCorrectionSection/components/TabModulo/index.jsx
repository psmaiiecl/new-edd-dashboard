import { TabContent } from "../../../../../../components/Layout/TabContent";
import { agrupacionModulo } from "../../data/selectorLists";
import Select from "react-select";
import { useTab } from "./hooks/useTab";
import { CustomColumnChart } from "../../../../../../components/CustomColumnChart";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export function TabModulo({ module }) {
  const { selectedFilter, handleFilter, data, filterItems } = useTab(module);

  return (
    <TabContent>
      <div className="tab-general-filter-row">
        <div className="tab-general-filter">
          <span>Seleccione agrupación: </span>
          <Select
            value={selectedFilter.agrupacion}
            onChange={(option) => handleFilter("agrupacion", option)}
            options={agrupacionModulo}
            isSearchable
            noOptionsMessage={() => "Ninguna agrupación"}
            placeholder="Seleccione una agrupación"
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
        {selectedFilter.agrupacion.value === "General" && (
          <div className="tab-general-filter">
            <span>Seleccione nivel: </span>
            <Select
              value={selectedFilter.nivel}
              onChange={(option) => handleFilter("nivel", option)}
              options={filterItems.nivel}
              isSearchable
              noOptionsMessage={() => "Ningun nivel"}
              placeholder="Seleccione un nivel"
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
        )}

        <div className="tab-general-filter">
          <span>Seleccione especialidad: </span>
          <Select
            value={selectedFilter.especialidad}
            onChange={(option) => handleFilter("especialidad", option)}
            options={filterItems.especialidad}
            isSearchable
            noOptionsMessage={() => "Ninguna especialidad"}
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
      </div>
      <div className="normal-container">
        <div className="pie-grid-2">
          <CustomColumnChart title={module} data={data.comparacion} />
          <div className="column-chart-container">
            <HighchartsReact options={data.cohen} highcharts={Highcharts} />
          </div>
        </div>
      </div>
    </TabContent>
  );
}
