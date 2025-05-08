import "./index.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { numberFormatter } from "../../../../../../utils/NumberFormatter";
import { useTabDependencia } from "./hooks/useTabDependencia";

export function TabDependencia() {
  const {
    docentesChart,
    docentesStatus,
    docentesData,
    sostenedoresChart,
    sostenedoresStatus,
    sostenedoresData,
  } = useTabDependencia();
  return (
    <div className="tab-dependencia">
      <div className="tab-dependencia-grupo">
        <HighchartsReact options={docentesChart} highcharts={Highcharts} />
        <div className="tab-dependencia-table-container">
          <table className="legend-table">
            <thead className="legend-table__head">
              <tr>
                <th></th>
                {Object.keys(docentesStatus)
                  .slice(0, -1)
                  .map((status, index) => {
                    return <th key={index}>{status}</th>;
                  })}
              </tr>
            </thead>
            <tbody className="legend-table__body">
              <tr>
                <td></td>
                {Object.keys(docentesStatus)
                  .slice(0, -1)
                  .map((key, index) => {
                    const item = docentesStatus[key];
                    const color = docentesChart.series[index]?.color;
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
              {Object.keys(docentesData).map((key, index) => {
                return (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{numberFormatter(docentesData[key].Inscrito.count)}</td>
                    <td>
                      {numberFormatter(docentesData[key]["En Revisión"].count)}
                    </td>
                    <td>
                      {numberFormatter(docentesData[key].Retirado.count)}
                    </td>
                    <td>
                      {numberFormatter(docentesData[key].Pendiente.count)}
                    </td>
                    <td>
                      {numberFormatter(docentesData[key].Cancelado.count)}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>Total (%)</td>
                {Object.keys(docentesStatus)
                  .slice(0, -1)
                  .map((key, index) => (
                    <td key={index}>
                      {numberFormatter(
                        (
                          (isNaN(docentesStatus[key] / +docentesStatus.total)
                            ? 0
                            : docentesStatus[key] / +docentesStatus.total) * 100
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
        <HighchartsReact options={sostenedoresChart} highcharts={Highcharts} />
        <div className="tab-dependencia-table-container">
          <table className="legend-table">
            <thead className="legend-table__head">
              <tr>
                <th></th>
                {Object.keys(sostenedoresStatus)
                  .slice(0, -1)
                  .map((status, index) => {
                    return (
                      <th key={index}>
                        {status.replaceAll("_", " ").toUpperCase()}
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody className="legend-table__body">
              <tr>
                <td></td>
                {Object.keys(sostenedoresStatus)
                  .slice(0, -1)
                  .map((key, index) => {
                    const item = sostenedoresStatus[key];
                    const color = sostenedoresChart.series[index]?.color;
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
                          }}
                        >
                          <span>{numberFormatter(item)}</span>
                        </div>
                      </td>
                    );
                  })}
              </tr>
              {Object.keys(sostenedoresData?.sin_ingreso || [])
                .sort((a, b) =>
                  a.localeCompare(b, "es", { sensitivity: "base" })
                )
                .filter((d) => d !== "Sin Información")
                .map((area, index) => (
                  <tr key={index}>
                    <td>{area}</td>
                    {Object.keys(sostenedoresStatus)
                      .slice(0, -1)
                      .map((key, index2) => (
                        <td key={index2}>
                          {numberFormatter(sostenedoresData[key][area])}
                        </td>
                      ))}
                  </tr>
                ))}
              <tr>
                <td>Total (%)</td>
                {Object.keys(sostenedoresStatus)
                  .slice(0, -1)
                  .map((key, index) => (
                    <td key={index}>
                      {numberFormatter(
                        (
                          (isNaN(
                            sostenedoresStatus[key] / sostenedoresStatus.total
                          )
                            ? 0
                            : sostenedoresStatus[key] /
                              sostenedoresStatus.total) * 100
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
