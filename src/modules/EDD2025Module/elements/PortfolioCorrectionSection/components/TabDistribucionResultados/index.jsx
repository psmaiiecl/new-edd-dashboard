import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import Select from "react-select";
import { agrupacionesDistRes } from "../../data/selectorLists";
import { useTab } from "./hooks/useTab";
import { SELECT_STYLES } from "../../../../../../constants/CONST";

export function TabDistribucionResultados() {
  const { selectedFilter, handleFilter, data } = useTab();

  return (
    <TabContent>
      <div className="tab-general-filter-row">
        <div className="tab-general-filter">
          <span>Seleccione agrupación: </span>
          <Select
            value={selectedFilter.agrupacion}
            onChange={(option) => handleFilter("agrupacion", option)}
            options={agrupacionesDistRes}
            isSearchable
            noOptionsMessage={() => "Ninguna agrupacion"}
            placeholder="Seleccione una agrupacion"
            styles={SELECT_STYLES}
          />
        </div>
        <div style={{ width: "100%" }}></div>
      </div>
      <div className="normal-container">
        <div className="pie-grid-2">
          <CustomPieChart
            subtitle={"CORRECCION DE <b>PORTAFOLIOS 2025</b>"}
            data={data.chart}
          />
          <div className="distribucion-table-container">

          <table className="roboto-regular distribucion-table">
            <thead>
              <tr>
                <th style={{ backgroundColor: "#0059ffff" }}>CC</th>
                <th style={{ backgroundColor: "#fd9800ff" }}>Corregidos 2024</th>
                <th style={{ backgroundColor: "#ffbe69ff" }}>% 2024</th>
                <th style={{ backgroundColor: "#a0ff71ff" }}>Corregidos 2025</th>
                <th style={{ backgroundColor: "#c7faaeff" }}>% 2025</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>{data.table?.cat23_a || '-'}</td>
                <td>11,2%</td>
                <td>1433</td>
                <td>5,78%</td>
              </tr>
              <tr>
                <td>B</td>
                <td>19859</td>
                <td>42,01%</td>
                <td>11326</td>
                <td>45,7%</td>
              </tr>
              <tr>
                <td>C</td>
                <td>12318</td>
                <td>26,06%</td>
                <td>7026</td>
                <td>28,35%</td>
              </tr>
              <tr>
                <td>D</td>
                <td>6150</td>
                <td>13,01%</td>
                <td>3696</td>
                <td>14,91%</td>
              </tr>
              <tr>
                <td>E</td>
                <td>3653</td>
                <td>7,73%</td>
                <td>1304</td>
                <td>5,26%</td>
              </tr>
              <tr style={{ display: "none" }}>
                <td>Sin CC</td>
                <td>0.0%</td>
                <td>1.7%</td>
              </tr>
              <tr style={{ borderTop: "3px solid #ddd" }}>
                <td>
                  <b>Total Corregidos</b>
                </td>
                <td>
                  <b>47.275</b>
                </td>
                <td>100%</td>
                <td>
                  <b>24.785</b>
                </td>
                <td>98.3%</td>
              </tr>
              <tr>
                <td>
                  <b>Total Portafolios</b>
                </td>
                <td>
                  <b>47.275</b>
                </td>
                <td>100%</td>
                <td>
                  <b>25.224</b>
                </td>
                <td>100%</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </TabContent>
  );
}
