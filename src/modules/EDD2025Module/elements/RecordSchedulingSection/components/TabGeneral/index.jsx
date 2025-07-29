import "./index.css";
import { useTabGeneral } from "./hooks/useTabGeneral";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import { CustomColumnChart } from "../../../../../../components/CustomColumnChart";
import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import { CustomDotLineChart } from "../../../../../../components/CustomDotLineChart";

export function TabGeneral() {
  const {
    docentesAgendados,
    establecimientosAgendados,
    agendamientoApilado,
    agendamientoSemanal,
    agendamientoGlobal,
  } = useTabGeneral();

  return (
    <TabContent>
      <div className="normal-container">
        <div className="pie-grid-2">
          <CustomPieChart
            data={docentesAgendados}
            subtitle={"DOCENTES A <b>AGENDAR GRABACIÓN</b>"}
          />
          <CustomPieChart
            data={establecimientosAgendados}
            subtitle={"ESTABLECIMIENTOS A <b>AGENDAR GRABACIÓN</b>"}
          />
        </div>
      </div>
      <CustomColumnChart
        title={"AGENDAMIENTO <b>APILADO PARA CADA SEMANA</b>"}
        data={agendamientoApilado}
        type={"STACK"}
      />
      <hr />
      <CustomColumnChart
        title={"AGENDAMIENTO <b>SEMANAL</b>"}
        data={agendamientoSemanal}
         overrideConfig={{
          yAxis: {
            min: 0,
            title: {
              text: "Avance",
            },
            labels: {
              format: "{value}",
            },
          },
        }}s
      />
      <hr />
      <CustomDotLineChart
        title={"AGENDAMIENTO <b>ACUMULADO</b>"}
        data={agendamientoGlobal}
        overrideConfig={{
          yAxis: {
            min: 0,
            title: {
              text: "Avance",
            },
            labels: {
              format: "{value}",
            },
          },
        }}
      />
    </TabContent>
  );
}
