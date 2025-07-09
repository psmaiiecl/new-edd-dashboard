import { CustomBarChart } from "../../../../../../components/CustomBarChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import "./style.css";
import { useTabCTG } from "./hooks/useTabCTG";
import { Fragment } from "react";

export function TabCTG() {
  const { chartData, tableData } = useTabCTG();
  return (
    <TabContent>
      <div className="dual-bar-chart-container">
        <CustomBarChart
          table={false}
          data={chartData.docentes}
          height={900}
          subtitle={"Agendamiento de Docentes <b>por CTG</b>"}
        />
        <CustomBarChart
          table={false}
          data={chartData.establecimientos}
          height={900}
          subtitle={"Agendamiento de Establecimientos <b>por CTG</b>"}
        />
      </div>
      <div className="combined-table-container">
        <table className="combined-table roboto-regular">
          <thead>
            <tr>
              <th rowSpan={2}>Región</th>
              <th rowSpan={2}>CTG</th>
              {tableData?.columns.map((col, idx) => (
                <th
                  key={idx}
                  colSpan={col?.span || 2}
                  style={{ backgroundColor: col.color }}
                >
                  {col.label}
                </th>
              ))}
              <th rowSpan={2}>Total Doc</th>
              <th rowSpan={2}>Total EE</th>
              <th rowSpan={2}>% Avance Doc</th>
              <th rowSpan={2}>% Avance EE</th>
            </tr>
            <tr>
              {tableData?.columns.map((col, idx) => (
                <Fragment key={idx}>
                  {col.keys?.doc && (
                    <th style={{ backgroundColor: col.color }}>Doc</th>
                  )}
                  {col.keys?.ee && (
                    <th style={{ backgroundColor: col.color }}>EE</th>
                  )}
                </Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.rows.map((row, idx) => (
              <tr key={idx}>
                <td className="to-right-cell">{row.region}</td>
                <td>{row.nombre}</td>
                {tableData?.columns.map((col, cidx) => (
                  <Fragment key={cidx}>
                    {col.keys?.doc && (
                      <td className="text-center">
                        {row.values[col.label]?.doc ?? "-"}
                      </td>
                    )}
                    {col.keys?.ee && (
                      <td className="text-center">
                        {row.values[col.label]?.ee ?? "-"}
                      </td>
                    )}
                  </Fragment>
                ))}
                <td className="text-center">{row.total.doc}</td>
                <td className="text-center">{row.total.ee}</td>
                <td className="text-center">{row.avance.doc.toFixed(1)}%</td>
                <td className="text-center">{row.avance.ee.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TabContent>
  );
}
