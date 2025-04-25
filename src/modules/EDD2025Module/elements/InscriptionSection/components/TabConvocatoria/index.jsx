import { useEffect, useState } from "react";
import "./index.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { getInscripcionConvocatoria } from "../../services/getInscripcionConvocatoria";
import {
  buildDocentesDependenciaChart,
  extraerSumatoriasDocentes,
  extraerSumaTotal,
} from "../../utils/convocatoriaTabUtils";
import { numberFormatter } from "../../../../../../utils/NumberFormatter";
import { BASIC_BAR } from "../../data/BASIC_BAR";

export function TabConvocatoria() {
  const [docentesConvocatoriaData, setDocentesConvocatoriaData] = useState({});
  const [docentesStatus, setDocentesStatus] = useState({
    Inscrito: 0,
    "En Revisión": 0,
    Retirado: 0,
    Pendiente: 0,
    Cancelado: 0,
    total: 0,
  });
  const [docentesConvocatoria, setDocentesConvocatoria] = useState({
    ...BASIC_BAR,
    chart:{
      ...BASIC_BAR.chart,
      height: 450
    },
    subtitle: {
      text: "<b>ESTADO DE DOCENTES</b> DISTRIBUIDOS POR CONVOCATORIA",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    xAxis: {
      ...BASIC_BAR.xAxis,
      categories: [
        "Participación voluntaria",
        "Participación obligatoria",
        "No Habilitado",
      ],

    },
    series: [
      {
        name: "Inscritos en nómina",
        data: [],
        sliced: true,
        selected: true,
        color: "#65D9AB",
      },
      {
        name: "En Revisión",
        data: [],
        color: "#FF8E53",
      },
      {
        name: "Desinscritos",
        data: [],
        color: "#C1D9CA",
      },
      {
        name: "Pendientes",
        data: [],
        color: "#FFD153",
      },
      {
        name: "Cancelados",
        data: [],
        color: "#FF5880",
      },
    ],
  });

  useEffect(() => {
    getInscripcionConvocatoria().then((data) => {
      const dStatus = extraerSumatoriasDocentes(data.docentes);
      const dTotal = extraerSumaTotal(dStatus);
      setDocentesConvocatoriaData(data.docentes);
      setDocentesStatus({ ...dStatus, total: dTotal });
      setDocentesConvocatoria(
        buildDocentesDependenciaChart(
          docentesConvocatoria,
          data.docentes,
          dTotal
        )
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    <td>{numberFormatter(
                      docentesConvocatoriaData[key]?.Retirado.count
                    )}</td>
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
                          (isNaN(docentesStatus[key] / docentesStatus.total) ? 0 : (docentesStatus[key] / docentesStatus.total)) *
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
