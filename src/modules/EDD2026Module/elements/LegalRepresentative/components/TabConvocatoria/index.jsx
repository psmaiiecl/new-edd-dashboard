import "./index.css";
import { useTabConvocatoria } from "./hooks/useTabConvocatoria";
import { CustomBarChart } from "../../../../../../components/CustomBarChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";

export function TabConvocatoria() {
  const { docentes } = useTabConvocatoria();
  return (
    <TabContent>
      <CustomBarChart
        subtitle={"ESTADO DE DOCENTES DISTRIBUIDOS <b>POR CONVOCATORIA</b>"}
        data={docentes}
        height={450}
      />
    </TabContent>
  );
}
