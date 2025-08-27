import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { buildEvolucionProcesamiento, mapGraphTable } from "../../../utils/utils";
import mappers from "../../../utils/mapSpecs";

function useTabGeneral() {
  const customFetch = useCustomFetch();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-procesamiento-tab-general",
      shouldCache: true,
    }).then(data => { 
      const evolucion = buildEvolucionProcesamiento(data?.evolucion_diaria.acumulado);
      // const avanceDiario = mapEvolucionData(data?.evolucion_diaria.normal);
      const { chart: avanceChart } = mapGraphTable(data?.evolucion_diaria.normal, mappers.avance_chart);
      const { table: avanceTable } = mapGraphTable(data?.evolucion_diaria.normal, mappers.avance_table);
      avanceChart.override.chart = { ... avanceChart.override.chart, height: (avanceTable.tableData.length * 20) + 235};
      console.log({
        evolucion,
        avance:{
          chart: avanceChart,
          table: avanceTable
        }
      });
      setChartData({
        evolucion,
        avance:{
          chart: avanceChart,
          table: avanceTable
        }
      });
    });
  }, [customFetch]);

  return { chartData };
}

export default useTabGeneral;
