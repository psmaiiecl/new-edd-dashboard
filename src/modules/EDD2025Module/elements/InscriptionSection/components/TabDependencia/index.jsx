import "./index.css";
import { useEffect, useState } from "react";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { getInscripcionDependencia } from "../../services/getInscripcionDependencia";
import {
  buildDocentesDependenciaChart,
  buildSostenedoresDependenciaChart,
  extraerSumatoriasDocentes,
  extraerSumatoriaSostenedores,
  extraerSumaTotal,
} from "../../utils/dependenciaTabUtils";
import { numberFormatter } from "../../../../../../utils/NumberFormatter";
import { BASIC_BAR } from "../../data/BASIC_BAR";

export function TabDependencia() {
  const [docentesData, setDocentesData] = useState({});
  const [docentesStatus, setDocentesStatus] = useState({
    Inscrito: 0,
    "En Revisión": 0,
    Desinscrito: 0,
    Pendiente: 0,
    Cancelado: 0,
    total: 0,
  });
  const [docentesChart, setDocentesChart] = useState({
    ...BASIC_BAR,
    subtitle: {
      text: "<b>ESTADO DE DOCENTES</b> DISTRIBUIDOS <b>POR DEPENDENCIA</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
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
  const [sostenedoresData, setSostenedoresData] = useState({});
  const [sostenedoresStatus, setSostenedoresStatus] = useState({
    sin_ingreso: 0,
    con_ingreso_sin_docentes: 0,
    inscripcion_iniciada: 0,
    sin_docentes_pendientes: 0,
  });
  const [sostenedoresChart, setSostenedoresChart] = useState({
    ...BASIC_BAR,
    subtitle: {
      text: "<b>SOSTENEDORES</b> DISTRIBUIDOS POR DEPENDENCIA",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Sin Ingreso",
        data: [],
        color: "#FF5880",
      },
      {
        name: "Con ingreso pero sin docentes inscritos",
        data: [],
        color: "#FF8E53",
      },
      {
        name: "Con inscripción iniciada",
        data: [],
        color: "#65D9AB",
      },
      {
        name: "Con inscripción terminada",
        data: [],
        color: "#8FB8FF",
      },
    ],
  });

  useEffect(() => {
    getInscripcionDependencia().then((data) => {
      const dStatus = extraerSumatoriasDocentes(data.docentes);
      const dTotal = extraerSumaTotal(dStatus);
      setDocentesData(data.docentes);
      setDocentesStatus({ ...dStatus, total: dTotal });
      setDocentesChart(
        buildDocentesDependenciaChart(docentesChart, data.docentes, dTotal)
      );

      const sStatus = extraerSumatoriaSostenedores(data.sostenedores);
      const sTotal = extraerSumaTotal(sStatus);
      setSostenedoresData(data.sostenedores);
      setSostenedoresStatus({ ...sStatus, total: sTotal });
      setSostenedoresChart(
        buildSostenedoresDependenciaChart(
          sostenedoresChart,
          data.sostenedores,
          sTotal
        )
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
                      {numberFormatter(docentesData[key].Desinscrito.count)}
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
                          (isNaN(docentesStatus[key] / +docentesStatus.total) ? 0 : (docentesStatus[key] / +docentesStatus.total)) *
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
                          (isNaN(sostenedoresStatus[key] / sostenedoresStatus.total) ? 0 : (sostenedoresStatus[key] / sostenedoresStatus.total)) *
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
