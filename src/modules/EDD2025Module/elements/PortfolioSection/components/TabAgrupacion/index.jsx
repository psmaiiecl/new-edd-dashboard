import { CustomColumnChart } from "../../../../../../components/CustomColumnChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import { ColumnChartLegend } from "../ColumnChartLegend";
import { useTab } from "./hooks/useTab";

export function TabAgrupacion() {
  const { data } = useTab();
  return (
    <TabContent>
      <div className="general-pie-chart-container">
        <CustomColumnChart
          data={data?.estado_portafolio}
          title={"ESTADO DE AVANCE DEL PORTAFOLIO <b>POR AGRUPACIÓN</b>"}
        />
        <hr />
        <ColumnChartLegend mappedData={data?.estado_portafolio} />
      </div>
      <div className="general-pie-chart-container">
        <CustomColumnChart
          data={data?.estado_m1}
          title={"ESTADO DE AVANCE DEL MÓDULO 1 <b>POR AGRUPACIÓN</b>"}
        />
        <hr />
        <ColumnChartLegend mappedData={data?.estado_m1} />
      </div>
      <div className="general-pie-chart-container">
        <CustomColumnChart
          data={data?.estado_m2}
          title={"ESTADO DE AVANCE DEL MÓDULO 2 <b>POR AGRUPACIÓN</b>"}
        />
        <hr />
        <ColumnChartLegend mappedData={data?.estado_m2} />
      </div>
      <div className="general-pie-chart-container">
        <CustomColumnChart
          data={data?.estado_m3}
          title={"ESTADO DE AVANCE DEL MÓDULO 3 <b>POR AGRUPACIÓN</b>"}
        />
        <hr />
        <ColumnChartLegend mappedData={data?.estado_m3} />
      </div>
    </TabContent>
  );
}
