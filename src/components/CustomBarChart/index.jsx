import "./style.css";
import { useEffect, useState } from "react";
import { initBarChartConfig } from "../../utils/ChartConfigBuilder";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// eslint-disable-next-line no-unused-vars
import exporting from "highcharts/modules/exporting";
import { numberFormatter } from "../../utils/NumberFormatter";

/**
 * La data que debe llegar a este componente para poder renderizarse debe tener la siguiente estructura:
 * data{
 *  series: {},
 *  total: {
 *     numeric: total,
 *     text: numberFormatter(total),
 *  },
 *  table:{},
 *  override: {}
 *}
 */
export function CustomBarChart({
  subtitle,
  height,
  data,
  table = true,
  overrideConfig,
}) {
  const [chartSetup, setChartSetup] = useState(
    initBarChartConfig(subtitle, height, overrideConfig)
  );
  const [tableData, setTableData] = useState(null);
  useEffect(() => {
    if (!data) return;
    setTableData(data.tableData);
    setChartSetup((prev) => ({
      ...prev,
      title: {
        ...prev.title,
        text: data.total.text,
      },
      series: data.series,
      ...data?.override,
    }));
  }, [data]);

  return (
    <div className={`bar-chart-container ${table ? "" : "single-column"}`}>
      <HighchartsReact options={chartSetup} highcharts={Highcharts} />
      {tableData && (
        <div className="bar-table-container">
          <table className="legend-table">
            <thead className="legend-table__head">
              <tr>
                <th></th>
                {tableData.head.map((estado, index) => (
                  <th key={index}>{estado}</th>
                ))}
              </tr>
            </thead>
            <tbody className="legend-table__body">
              <tr>
                <td></td>
                {tableData.subtotals.map((subtotal, index) => {
                  return (
                    <td key={index}>
                      <div
                        style={{
                          alignItems: "center",
                          backgroundColor: subtotal.color,
                          borderRadius: "5px",
                          width: "60px",
                          textAlign: "center",
                          padding: "2px",
                          fontWeight: "500",
                          placeSelf: "center",
                          margin: "0 auto",
                        }}
                      >
                        <span>{numberFormatter(subtotal.number)}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
              {tableData.data.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, index) => (
                    <td key={index}>{cell}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <td>Total (%)</td>
                {tableData.percentages.map((item, index) => (
                  <td key={index}>{item}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
