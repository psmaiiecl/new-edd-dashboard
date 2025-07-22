import { Fragment } from "react";
import { CustomBarChart } from "../../../../../../components/CustomBarChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import { useTabConvocatoria } from "./hooks/useTabConvocatoria";
import "./style.css";

export function TabConvocatoria() {
  const { chartData, tableData } = useTabConvocatoria();
  return (
    <TabContent>
      <div className="dual-bar-chart-container">
        <CustomBarChart
          table={false}
          data={chartData.docentes}
          height={500}
          subtitle={"Agendamiento de Docentes <b>por Convocatoria</b>"}
        />
        <CustomBarChart
          table={false}
          data={chartData.establecimientos}
          height={500}
          subtitle={"Agendamiento de Establecimientos <b>por Convocatoria</b>"}
        />
      </div>
      <div className="combined-table-container">
        <table className="combined-table roboto-regular">
          <thead>
            <tr>
              <th rowSpan={2}>Convocatoria</th>
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
                <td className="to-right-cell">{row?.rawCategory}</td>
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
                <td className="text-center">{row.avance.doc}%</td>
                <td className="text-center">{row.avance.ee}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
    </TabContent>
  );
}
