import React from "react";

import GenericColumnChart from "../../components/ColumnChart/GenericColumnChart";

export function TabDependenciaPortafolio() {
  const baseURL = "http://api-docentemas-dev.3htp.cloud:8095/back/public/api2025";

  const avanceDependenciaMapper = (data) =>
    data
      ? {
          total: {
            subtitulo: 'AVANCE POR DEPENDENCIA',
            data: data.total_dependencia
          },
          series: [
            { name: "Dependencia A", y: data.dependencia_a, color: "#65d9ab" },
            { name: "Dependencia B", y: data.dependencia_b, color: "#ff8e53" },
            { name: "Dependencia C", y: data.dependencia_c, color: "#ffd153" },
          ]
        }
      : {
          total: {
            subtitulo: '',
            data: 0
          },
          series: []
        };

  return (
    <div className="tab-dependencia">
      <div className="tab-dependencia-upper">
        <div className="highcharts-container">
          <GenericColumnChart
            title={"Avance por Dependencia"}
            serviceUrl={`${baseURL}/2025-portafolio-avance-dependencia`}
            keyPath="dependencia"
            dataMapper={avanceDependenciaMapper}
          />
        </div>
      </div>
    </div>
  );
}
