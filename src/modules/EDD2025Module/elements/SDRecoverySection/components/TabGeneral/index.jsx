import { CustomColumnChart } from "../../../../../../components/CustomColumnChart";
import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import useTabGeneral from "./hooks/useTabGeneral";

function TabGeneral() {
  const { recuperacionGrabaciones, recuperacionSD } = useTabGeneral();

  return (
    <TabContent>
      <div className="normal-container">
        <div className="pie-grid-2">
          <CustomPieChart
            data={recuperacionGrabaciones}
            subtitle={
              "RECUPERACIÓN DE GRABACIONES RESPECTO A <b>GRABACIONES REALIZADAS</b>"
            }
          />
          <CustomPieChart
            data={recuperacionSD}
            subtitle={
              "RECUPERACIÓN DE TARJETAS SD RESPECTO A <b>GRABACIONES REALIZADAS</b>"
            }
          />
        </div>
      </div>
      <CustomColumnChart
        data={null}
        title={"GRABACIONES RECIBIDAS <b>DIARIAMENTE</b>"}
      />
      <hr />
    </TabContent>
  );
}

export default TabGeneral;
