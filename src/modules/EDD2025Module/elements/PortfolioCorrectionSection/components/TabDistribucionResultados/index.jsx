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
            {data.table && (
              <table className="roboto-regular distribucion-table">
                <thead>
                  <tr>
                    <th style={{ backgroundColor: "#0059ffff" }}>CC</th>
                    <th style={{ backgroundColor: "#fd9800ff" }}>
                      Corregidos {data.table.anioComparacion ?? ""}
                    </th>
                    <th style={{ backgroundColor: "#ffbe69ff" }}>
                      % {data.table.anioComparacion ?? ""}
                    </th>
                    <th style={{ backgroundColor: "#a0ff71ff" }}>
                      Corregidos {data.table.anioActual ?? ""}
                    </th>
                    <th style={{ backgroundColor: "#c7faaeff" }}>
                      % {data.table.anioActual ?? ""}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.table.rows.map((row, idx) => (
                    <tr
                      key={idx}
                      style={row?.border ? { borderTop: "3px solid #ddd" } : {}}
                    >
                      <td>
                        <span style={row?.bold ? { fontWeight: 600 } : {}}>
                          {row.categoria}
                        </span>
                      </td>
                      <td>
                        <span style={row?.bold ? { fontWeight: 600 } : {}}>
                          {row.prev}
                        </span>
                      </td>
                      <td>
                        <span style={row?.bold ? { fontWeight: 600 } : {}}>
                          {row.prevPct}
                        </span>
                      </td>
                      <td>
                        <span style={row?.bold ? { fontWeight: 600 } : {}}>
                          {row.curr}
                        </span>
                      </td>
                      <td>
                        <span style={row?.bold ? { fontWeight: 600 } : {}}>
                          {row.currPct}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </TabContent>
  );
}
