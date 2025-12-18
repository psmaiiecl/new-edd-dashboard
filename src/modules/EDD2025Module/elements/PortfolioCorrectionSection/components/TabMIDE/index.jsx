import { SELECT_STYLES } from "../../../../../../constants/CONST";
import Select from "react-select";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import { useTab } from "./hooks/useTab";
import { Button } from "../../../../../../components/Button";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// eslint-disable-next-line no-unused-vars
import exporting from "highcharts/modules/exporting";
import HighchartsMore from "highcharts/highcharts-more";
import "./style.css";

export function TabMIDE({ selectors }) {
  const {
    selectedFilter,
    handleFilter,
    data,
    cleanFilters,
    handleDraftTolerancia,
    toleranciaDraft,
    applyTolerancia,
  } = useTab();
  return (
    <TabContent>
      <div className="tab-general-filter-row">
        <div className="tab-general-filter">
          <span>Seleccione grupo de trabajo: </span>
          <Select
            // value={selectedFilter?.grupo_trabajo || ""}
            //onChange={(option) => handleFilter("grupo_trabajo", option)}
            options={selectors?.grupo_trabajo || []}
            isSearchable
            noOptionsMessage={() => "Ningún grupo de trabajo"}
            placeholder="Seleccione un grupo de trabajo"
            styles={SELECT_STYLES}
          />
        </div>
        <div className="tolerancia-control roboto-regular">
          <label>
            Banda Tolerancia: <strong>±{toleranciaDraft}%</strong>
          </label>
          <input
            type="range"
            min={1}
            max={50}
            step={1}
            value={toleranciaDraft}
            onChange={(e) => handleDraftTolerancia(Number(e.target.value))}
            onMouseUp={applyTolerancia}
            onTouchEnd={applyTolerancia}
          />
          <input
            type="number"
            className="roboto-regular"
            min={1}
            max={50}
            step={1}
            value={toleranciaDraft}
            onChange={(e) => handleDraftTolerancia(Number(e.target.value))}
            onBlur={applyTolerancia}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "5px",
            boxSizing: "border-box",
            alignSelf: "center",
          }}
        >
          <Button text={"Limpiar Filtros"} action={cleanFilters} />
        </div>
      </div>
      <div className="normal-container">
        <div className="chart-grid">
          {data?.charts &&
            data?.charts.map((options, i) => (
              <div className="chart-card">
                <HighchartsReact
                  key={i}
                  highcharts={Highcharts}
                  options={options}
                />
              </div>
            ))}
        </div>
      </div>
    </TabContent>
  );
}
