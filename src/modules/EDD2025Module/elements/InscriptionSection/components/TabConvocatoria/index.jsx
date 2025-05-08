import "./index.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { numberFormatter } from "../../../../../../utils/NumberFormatter";
import { useTabConvocatoria } from "./hooks/useTabConvocatoria";

export function TabConvocatoria() {
  const { docentesConvocatoria, docentesStatus, docentesConvocatoriaData } =
    useTabConvocatoria();
  return (
    <div className="tab-dependencia">
      <div className="tab-dependencia-grupo">
        <HighchartsReact
          options={docentesConvocatoria}
          highcharts={Highcharts}
        />
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
                    const color = docentesConvocatoria.series[index]?.color;
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
              {Object.keys(docentesConvocatoriaData).map((key, index) => {
                if (key === "convocatoria") return;
                return (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>
                      {numberFormatter(
                        docentesConvocatoriaData[key].Inscrito?.count
                      )}
                    </td>
                    <td>
                      {numberFormatter(
                        docentesConvocatoriaData[key]["En Revisión"]?.count
                      )}
                    </td>
                    <td>
                      {numberFormatter(
                        docentesConvocatoriaData[key]?.Retirado.count
                      )}
                    </td>
                    <td>
                      {numberFormatter(
                        docentesConvocatoriaData[key]?.Pendiente.count
                      )}
                    </td>
                    <td>
                      {numberFormatter(
                        docentesConvocatoriaData[key]?.Cancelado.count
                      )}
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
                          (isNaN(docentesStatus[key] / docentesStatus.total)
                            ? 0
                            : docentesStatus[key] / docentesStatus.total) * 100
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
