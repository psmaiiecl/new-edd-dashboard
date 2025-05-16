import React from "react";
import GenericPieChart from "../../components/PieChart/GenericPieChart";

export function TabRegionPortafolio() {
  const baseURL =
    "http://api-docentemas-dev.3htp.cloud:8095/back/public/api2025";

  const avanceRegionMapper = (data) =>
    data
      ? {
          total: {
            subtitulo: "AVANCE POR REGIÓN",
            data: data.total_region,
          },
          series: [
            { name: "Región A", y: data.region_a, color: "#65d9ab" },
            { name: "Región B", y: data.region_b, color: "#ff8e53" },
            { name: "Región C", y: data.region_c, color: "#ffd153" },
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
    <div className="tab-region">
      <div className="tab-region-upper">
        <div className="highcharts-container">
          <GenericPieChart
            title={"Avance por Región"}
            serviceUrl={`${baseURL}/2025-portafolio-avance-region`}
            keyPath="region"
            dataMapper={avanceRegionMapper}
          />
        </div>
      </div>
    </div>
  );
}
