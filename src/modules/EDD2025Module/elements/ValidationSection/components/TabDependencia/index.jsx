import "./index.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useTabDependencia } from "./hooks/useTabDependencia";
import { numberFormatter } from "../../../../../../utils/NumberFormatter";

export function TabDependencia() {
  const {
    estadoData,
    estadoStatus,
    estadoChart,
    cambioData,
    cambioStatus,
    cambioChart,
    suspensionData,
    suspensionStatus,
    suspensionChart,
  } = useTabDependencia();
  return (
    <div className="tab-dependencia">
      <div className="tab-dependencia-grupo">
        <HighchartsReact options={estadoChart} highcharts={Highcharts} />
        <div className="tab-dependencia-table-container">
          <table className="legend-table">
            <thead className="legend-table__head">
              <tr>
                <th></th>
                {Object.keys(estadoStatus)
                  .slice(0, -1)
                  .map((status, index) => {
                    return <th key={index}>{status}</th>;
                  })}
              </tr>
            </thead>
            <tbody className="legend-table__body">
              <tr>
                <td></td>
                {Object.keys(estadoStatus)
                  .slice(0, -1)
                  .map((key, index) => {
                    const item = estadoStatus[key];
                    const color = estadoChart.series[index]?.color;
                    return (
                      <td key={index}>
                        <div
                          style={{
                            alignItems: "center",
                            backgroundColor: color,
                            borderRadius: "5px",
                            width: "60px",
                            textAlign: "center",
                            padding: "2px",
                            fontWeight: "500",
                            placeSelf: "center",
                            margin: "0 auto",
                          }}
                        >
                          <span>{numberFormatter(item)}</span>
                        </div>
                      </td>
                    );
                  })}
              </tr>
              {Object.keys(estadoData).map((key, index) => {
                return (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{numberFormatter(estadoData[key]?.validados)}</td>
                    <td>{numberFormatter(estadoData[key]?.no_validados)}</td>
                    <td>{numberFormatter(estadoData[key]?.sin_ingreso)}</td>
                  </tr>
                );
              })}

              <tr>
                <td>Total (%)</td>
                {Object.keys(estadoStatus)
                  .slice(0, -1)
                  .map((key, index) => (
                    <td key={index}>
                      {numberFormatter(
                        (
                          (isNaN(estadoStatus[key] / +estadoStatus.total)
                            ? 0
                            : estadoStatus[key] / +estadoStatus.total) * 100
                        ).toFixed(1)
                      ) + "%"}
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr className="section-separator" />
      <div className="tab-dependencia-grupo">
        <HighchartsReact options={cambioChart} highcharts={Highcharts} />
        <div className="tab-dependencia-table-container">
          <table className="legend-table">
            <thead className="legend-table__head">
              <tr>
                <th></th>
                {Object.keys(cambioStatus)
                  .slice(0, -1)
                  .map((status, index) => {
                    return <th key={index}>{status}</th>;
                  })}
              </tr>
            </thead>
            <tbody className="legend-table__body">
              <tr>
                <td></td>
                {Object.keys(cambioStatus)
                  .slice(0, -1)
                  .map((key, index) => {
                    const item = cambioStatus[key];
                    const color = cambioChart.series[index]?.color;
                    return (
                      <td key={index}>
                        <div
                          style={{
                            alignItems: "center",
                            backgroundColor: color,
                            borderRadius: "5px",
                            width: "60px",
                            textAlign: "center",
                            padding: "2px",
                            fontWeight: "500",
                            placeSelf: "center",
                            margin: "0 auto",
                          }}
                        >
                          <span>{numberFormatter(item)}</span>
                        </div>
                      </td>
                    );
                  })}
              </tr>
              {Object.keys(cambioData).map((key, index) => {
                return (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{numberFormatter(cambioData[key]?.aprobadas)}</td>
                    <td>{numberFormatter(cambioData[key]?.no_procesadas)}</td>
                    <td>{numberFormatter(cambioData[key]?.rechazadas)}</td>
                  </tr>
                );
              })}

              <tr>
                <td>Total (%)</td>
                {Object.keys(cambioStatus)
                  .slice(0, -1)
                  .map((key, index) => (
                    <td key={index}>
                      {numberFormatter(
                        (
                          (isNaN(cambioStatus[key] / +cambioStatus.total)
                            ? 0
                            : cambioStatus[key] / +cambioStatus.total) * 100
                        ).toFixed(1)
                      ) + "%"}
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr className="section-separator" />
      <div className="tab-dependencia-grupo">
        <HighchartsReact options={suspensionChart} highcharts={Highcharts} />
        <div className="tab-dependencia-table-container">
          <table className="legend-table">
            <thead className="legend-table__head">
              <tr>
                <th></th>
                {Object.keys(suspensionStatus)
                  .slice(0, -1)
                  .map((status, index) => {
                    return <th key={index}>{status}</th>;
                  })}
              </tr>
            </thead>
            <tbody className="legend-table__body">
              <tr>
                <td></td>
                {Object.keys(suspensionStatus)
                  .slice(0, -1)
                  .map((key, index) => {
                    const item = suspensionStatus[key];
                    const color = suspensionChart.series[index]?.color;
                    return (
                      <td key={index}>
                        <div
                          style={{
                            alignItems: "center",
                            backgroundColor: color,
                            borderRadius: "5px",
                            width: "60px",
                            textAlign: "center",
                            padding: "2px",
                            fontWeight: "500",
                            placeSelf: "center",
                            margin: "0 auto",
                          }}
                        >
                          <span>{numberFormatter(item)}</span>
                        </div>
                      </td>
                    );
                  })}
              </tr>
              {Object.keys(suspensionData).map((key, index) => {
                return (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{numberFormatter(suspensionData[key]?.aprobadas)}</td>
                    <td>
                      {numberFormatter(suspensionData[key]?.no_procesadas)}
                    </td>
                    <td>{numberFormatter(suspensionData[key]?.rechazadas)}</td>
                  </tr>
                );
              })}

              <tr>
                <td>Total (%)</td>
                {Object.keys(suspensionStatus)
                  .slice(0, -1)
                  .map((key, index) => (
                    <td key={index}>
                      {numberFormatter(
                        (
                          (isNaN(
                            suspensionStatus[key] / +suspensionStatus.total
                          )
                            ? 0
                            : suspensionStatus[key] / +suspensionStatus.total) *
                          100
                        ).toFixed(1)
                      ) + "%"}
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
