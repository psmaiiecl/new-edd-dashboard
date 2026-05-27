import "./index.css";
import { useTabConvocatoria } from "./hooks/useTabConvocatoria";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import { CustomBarChart } from "../../../../../../components/CustomBarChart";

export function TabConvocatoria() {
  const {
    docentesConvocatoria,
    agrupacionConvocatoria,
    suspensionConvocatoria,
  } = useTabConvocatoria();
  return (
    <TabContent>
      <CustomBarChart
        subtitle={
          "ESTADO DE VALIDACIÓN DE DOCENTES DISTRIBUIDOS <b>POR CONVOCATORIA</b>"
        }
        data={docentesConvocatoria}
        height={400}
      />
      <hr className="section-separator" />
      <CustomBarChart
        subtitle={
          "ESTADO DE SOLICITUDES DE CAMBIO DE <b>AGRUPACIÓN/ASIGNATURA</b>"
        }
        data={agrupacionConvocatoria}
        height={400}
      />

      <hr className="section-separator" />
      <CustomBarChart
        subtitle={"ESTADO DE SOLICITUDES DE <b>SUSPENSIÓN O EXIMICIÓN</b>"}
        data={suspensionConvocatoria}
        height={400}
      />
    </TabContent>
  );
}
