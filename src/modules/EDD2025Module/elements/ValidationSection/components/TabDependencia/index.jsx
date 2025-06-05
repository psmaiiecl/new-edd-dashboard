import "./index.css";
import { useTabDependencia } from "./hooks/useTabDependencia";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import { CustomBarChart } from "../../../../../../components/CustomBarChart";

export function TabDependencia() {
  const { docentesDependencia, agrupacionDependencia, suspensionDependencia } =
    useTabDependencia();
  return (
    <TabContent>
      <CustomBarChart
        subtitle={
          "ESTADO DE VALIDACIÓN DE DOCENTES DISTRIBUIDOS <b>POR DEPENDENCIA</b>"
        }
        data={docentesDependencia}
      />
      <hr className="section-separator" />
      <CustomBarChart
        subtitle={
          "ESTADO DE SOLICITUDES DE CAMBIO DE <b>AGRUPACIÓN/ASIGNATURA</b>"
        }
        data={agrupacionDependencia}
      />

      <hr className="section-separator" />
      <CustomBarChart
        subtitle={"ESTADO DE SOLICITUDES DE <b>SUSPENSIÓN O EXIMICIÓN</b>"}
        data={suspensionDependencia}
      />
    </TabContent>
  );
}
