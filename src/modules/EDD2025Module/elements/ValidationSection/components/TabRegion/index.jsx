import "./index.css";
import { useTabRegion } from "./hooks/useTabRegion";
import { CustomBarChart } from "../../../../../../components/CustomBarChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";

export function TabRegion() {
  const { docentesRegion, agrupacionRegion, suspensionRegion } = useTabRegion();
  return (
    <TabContent>
      <CustomBarChart
        subtitle={
          "ESTADO DE VALIDACIÓN DE DOCENTES DISTRIBUIDOS <b>POR REGION</b>"
        }
        data={docentesRegion}
      />
      <hr className="section-separator" />
      <CustomBarChart
        subtitle={
          "ESTADO DE SOLICITUDES DE CAMBIO DE <b>AGRUPACIÓN/ASIGNATURA</b>"
        }
        data={agrupacionRegion}
      />

      <hr className="section-separator" />
      <CustomBarChart
        subtitle={"ESTADO DE SOLICITUDES DE <b>SUSPENSIÓN O EXIMICIÓN</b>"}
        data={suspensionRegion}
      />
    </TabContent>
  );
}
