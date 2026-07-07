import { CustomBarChart } from "../../../../../../components/CustomBarChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import { ColumnChartLegend } from "../ColumnChartLegend";
import { useTabConvocatoria } from "./hooks/useTabConvocatoria";

export function TabConvocatoria() {
  const { data } = useTabConvocatoria();
  return (
    <TabContent>
      <div className="general-pie-chart-container">
        <CustomBarChart
          table={null}
          height={300}
          data={data?.estado_portafolio}
          subtitle={"ESTADO DE AVANCE DEL PORTAFOLIO <b>POR CONVOCATORIA</b>"}
        />
        <hr />
        <ColumnChartLegend mappedData={data?.estado_portafolio} />
      </div>
      <div className="general-pie-chart-container">
        <CustomBarChart
          table={null}
          height={300}
          data={data?.estado_m1}
          subtitle={"ESTADO DE AVANCE DEL MÓDULO 1 <b>POR CONVOCATORIA</b>"}
        />
        <hr />
        <ColumnChartLegend mappedData={data?.estado_m1} />
      </div>
      <div className="general-pie-chart-container">
        <CustomBarChart
          table={null}
          height={300}
          data={data?.estado_m2}
          subtitle={"ESTADO DE AVANCE DEL MÓDULO 2 <b>POR CONVOCATORIA</b>"}
        />
        <hr />
        <ColumnChartLegend mappedData={data?.estado_m2} />
      </div>
      <div className="general-pie-chart-container">
        <CustomBarChart
          table={null}
          height={300}
          data={data?.estado_m3}
          subtitle={"ESTADO DE AVANCE DEL MÓDULO 3 <b>POR CONVOCATORIA</b>"}
        />
        <hr />
        <ColumnChartLegend mappedData={data?.estado_m3} />
      </div>
    </TabContent>
  );
}
