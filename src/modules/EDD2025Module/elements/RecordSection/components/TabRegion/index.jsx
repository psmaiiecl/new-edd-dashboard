import { Fragment } from "react";
import { CustomBarChart } from "../../../../../../components/CustomBarChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import { useTabRegion } from "./hooks/useTabRegion";
import { getColorForAvance } from "../../utils/utils";

function TabRegion() {
  const { chartData, tableData } = useTabRegion();
  return (
    <TabContent>
      <div className="dual-bar-chart-container">
        <CustomBarChart
          table={false}
          data={chartData.docentes}
          height={750}
          subtitle={"ESTADO DE GRABACION DE DOCENTES <b>POR REGIÓN</b>"}
        />
        <CustomBarChart
          table={false}
          data={chartData.establecimientos}
          height={750}
          subtitle={"ESTADO DE GRABACION DE ESTABLECIMIENTOS <b>POR REGIÓN</b>"}
        />
      </div>
      <div className="combined-table-container">
        <table className="combined-table roboto-regular">
          <thead>
            <tr>
              <th rowSpan={2}>Region</th>
              {tableData?.columns.map((col, idx) => (
                <th key={idx} colSpan={col.series.length + 2}>
                  {col.label}
                </th>
              ))}
            </tr>
            <tr>
              {tableData?.columns.map((col, idx) => (
                <Fragment key={idx}>
                  {col.series.map((serie, sidx) => (
                    <th key={sidx} style={{ backgroundColor: serie.color }}>
                      {serie.name}
                    </th>
                  ))}
                  <th style={{ whiteSpace: "nowrap" }}>Total</th>
                  <th style={{ whiteSpace: "nowrap" }}>% Avance</th>
                </Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.rows.map((row, idx) => (
              <tr key={idx}>
                <td className="to-right-cell">{row.rawCategory}</td>
                {tableData?.columns.map((col, cidx) => (
                  <Fragment key={cidx}>
                    {col.series.map((serie, sidx) => (
                      <td key={sidx} className="text-center">
                        {row.values[col.label]?.[serie.name]?.value ?? "-"}
                      </td>
                    ))}
                    <td className="text-center">
                      {row.totals?.[col.label] ?? "-"}
                    </td>
                    <td className="text-center">
                      {row.avance?.[col.label] != null ? (
                        <>
                          <span
                            className="avance-dot"
                            style={{
                              backgroundColor: getColorForAvance(
                                row.avance[col.label]
                              ),
                            }}
                          ></span>
                          {row.avance[col.label]}%
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                  </Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
    </TabContent>
  );
}

export default TabRegion;
