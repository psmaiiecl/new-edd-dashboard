import "./index.css";
import { useTabRegion } from "./hooks/useTabRegion";
import { CustomBarChart } from "../../../../../../components/CustomBarChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";

export function TabRegion() {
  const { charts } = useTabRegion();
  return (
    <TabContent>
      <CustomBarChart
        subtitle={
          "ESTADO DE VALIDACIÓN DE DOCENTES DISTRIBUIDOS <b>POR REGION</b>"
        }
        data={charts.docentes}
      />
      <hr className="section-separator" />
      <CustomBarChart
        subtitle={
          "ESTADO DE SOLICITUDES DE CAMBIO DE <b>AGRUPACIÓN/ASIGNATURA</b>"
        }
        data={charts.solicitudes_cambio_nivel}
      />

      <hr className="section-separator" />
      <CustomBarChart
        subtitle={"ESTADO DE SOLICITUDES DE <b>SUSPENSIÓN O EXIMICIÓN</b>"}
        data={charts.solicitudes_suspension}
      />
    </TabContent>
  );
}
