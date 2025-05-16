import React from "react";
import GenericPieChart from "../../components/PieChart/GenericPieChart";

export function TabAgrupacionPortafolio() {
  const baseURL = "http://api-docentemas-dev.3htp.cloud:8095/back/public/api2025";

  const avanceAgrupacionMapper = (data) =>
    data
      ? {
          total: {
            subtitulo: 'AVANCE POR AGRUPACIÓN',
            data: data.total_agrupacion
          },
          series: [
            { name: "Agrupación A", y: data.agrupacion_a, color: "#65d9ab" },
            { name: "Agrupación B", y: data.agrupacion_b, color: "#ff8e53" },
            { name: "Agrupación C", y: data.agrupacion_c, color: "#ffd153" },
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
    <div className="tab-agrupacion">
      <div className="tab-agrupacion-upper">
        <div className="highcharts-container">
          <GenericPieChart
            title={"Avance por Agrupación"}
            serviceUrl={`${baseURL}/2025-portafolio-avance-agrupacion`}
            keyPath="agrupacion"
            dataMapper={avanceAgrupacionMapper}
          />
        </div>
      </div>
    </div>
  );
}
