import { CustomColumnChart } from "../../../../../../components/CustomColumnChart";
import { CustomDotLineChart } from "../../../../../../components/CustomDotLineChart";
import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";

function TabGeneral() {
  return (
    <TabContent>
      <div className="normal-container">
        <div className="pie-grid-2">
          <CustomPieChart
            data={null}
            subtitle={"DOCENTES EN <b>ESTADO RINDE</b>"}
          />
          <CustomPieChart
            data={null}
            subtitle={"TOTAL DOCENTES <b>GRABADOS</b>"}
          />
        </div>
        <div className="pie-grid-2">
          <CustomPieChart
            data={null}
            subtitle={"ESTABLECIMIENTOS A <b>GRABAR</b>"}
          />
          <CustomPieChart
            data={null}
            subtitle={"SOSTENEDORES <b>PARTICIPANTES</b>"}
          />
        </div>
      </div>
      <CustomDotLineChart
        data={null}
        title={"AVANCE DIARIO DEL PROCESO <b>DE GRABACIONES</b>"}
      />
      <hr />
      <CustomColumnChart data={null} title={"GRABACIONES <b>SEMANALES</b>"} />
      <hr />
      <CustomDotLineChart data={null} title={"GRABACIONES <b>ACUMULADAS</b>"} />
    </TabContent>
  );
}

export default TabGeneral;
