import { CustomColumnChart } from "../../../../../../components/CustomColumnChart";
import { CustomDotLineChart } from "../../../../../../components/CustomDotLineChart";
import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import useTabGeneral from "./hooks/useTabGeneral";

function TabGeneral() {
  const {
    docentesRinde,
    docentesGrabados,
    establecimientosAGrabar,
    sostenedoresParticipantes,
    avanceDiario
  } = useTabGeneral();

  return (
    <TabContent>
      <div className="normal-container">
        <div className="pie-grid-2">
          <CustomPieChart
            data={docentesRinde}
            subtitle={"DOCENTES EN <b>ESTADO RINDE</b>"}
          />
          <CustomPieChart
            data={docentesGrabados}
            subtitle={"TOTAL DOCENTES <b>GRABADOS</b>"}
          />
        </div>
        <div className="pie-grid-2">
          <CustomPieChart
            data={establecimientosAGrabar}
            subtitle={"ESTABLECIMIENTOS A <b>GRABAR</b>"}
          />
          <CustomPieChart
            data={sostenedoresParticipantes}
            subtitle={"SOSTENEDORES <b>PARTICIPANTES</b>"}
          />
        </div>
      </div>
      <CustomDotLineChart
        data={avanceDiario}
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
