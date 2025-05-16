import React from "react";
import GenericBarChart from "../../components/BarChart/GenericBarChart";

export function TabConvocatoriaPortafolio() {
  const baseURL =
    "http://api-docentemas-dev.3htp.cloud:8095/back/public/api2025";

  const avanceConvocatoriaMapper = (data) =>
    data
      ? {
          total: {
            subtitulo: "AVANCE POR CONVOCATORIA",
            data: data.total_convocatoria,
          },
          series: [
            {
              name: "Convocatoria A",
              y: data.convocatoria_a,
              color: "#65d9ab",
            },
            {
              name: "Convocatoria B",
              y: data.convocatoria_b,
              color: "#ff8e53",
            },
            {
              name: "Convocatoria C",
              y: data.convocatoria_c,
              color: "#ffd153",
            },
          ],
        }
      : {
          total: {
            subtitulo: "",
            data: 0,
          },
          series: [],
        };

  return (
    <div className="tab-convocatoria">
      <div className="tab-convocatoria-upper">
        <div className="highcharts-container">
          <GenericBarChart
            title={"Avance por Convocatoria"}
            serviceUrl={`${baseURL}/2025-portafolio-avance-convocatoria`}
            keyPath="convocatoria"
            dataMapper={avanceConvocatoriaMapper}
          />
        </div>
      </div>
    </div>
  );
}
