import "./index.css";
import { useTabRegion } from "./hooks/useTabRegion";
import { CustomBarChart } from "../../../../../../components/CustomBarChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";

export function TabRegion() {
  const { charts } = useTabRegion();
  return (
    <TabContent>
      <CustomBarChart
        subtitle={"ESTADO DE DOCENTES DISTRIBUIDOS <b>POR REGION</b>"}
        data={charts.docentes}
      />
    </TabContent>
  );
}
