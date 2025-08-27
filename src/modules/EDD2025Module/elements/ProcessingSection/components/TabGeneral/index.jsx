import { CustomBarChart } from "../../../../../../components/CustomBarChart";
import { CustomDotLineChart } from "../../../../../../components/CustomDotLineChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import { numberFormatter } from "../../../../../../utils/NumberFormatter";
import useTabGeneral from "./hooks/useTabGeneral";

function TabGeneral() {
  const { chartData } = useTabGeneral();

  return (
    <TabContent>
      <CustomDotLineChart
        data={chartData?.evolucion}
        title={"EVOLUCIÓN DEL PROCESAMIENTO <b>DE GRABACIONES</b>"}
      />
      <hr />
      <div className="dual-bar-chart-container">
        <div className="combined-table-container">
          <table className="combined-table roboto-regular">
            <thead>
              <tr>
                {chartData?.avance.table.tableColumns.map((col) => (
                  <th
                    key={col.key}
                    style={{
                      backgroundColor: col.color || "transparent",
                      color: col.color ? "#000" : "#333",
                      fontWeight: "bold",
                    }}
                  >
                    {numberFormatter(
                      chartData?.avance.table.tableTotals[col.key]
                    )}
                  </th>
                ))}
              </tr>

              <tr>
                {chartData?.avance.table.tableColumns.map((col) => (
                  <th
                    key={col.key}
                    style={{
                      backgroundColor: col.color || "transparent",
                      color: col.color ? "#000" : "#333",
                    }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chartData?.avance.table.tableData.map((row, i) => (
                <tr key={i}>
                  {chartData?.avance.table.tableColumns.map((col) => (
                    <td key={col.key}>{numberFormatter(row[col.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CustomBarChart
          table={false}
          data={chartData?.avance.chart}
          height={900}
          subtitle={"ESTADO DE PROCESAMIENTO DE GRABACIONES <b>DIARIO</b>"}
        />
      </div>
    </TabContent>
  );
}

export default TabGeneral;
