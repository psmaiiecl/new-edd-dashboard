import { useContext, useState } from "react";
import { tabList } from "./data/TabList";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";
import TabPostulacion from "./components/TabPostulacion";
import TabCuotas from "./components/TabCuotas";
import TabPrecapacitacion from "./components/TabPrecapacitacion";
import { Button } from "../../../../components/Button";
import { AuthContext } from "../../../../context/AuthContext";
import { useCustomDownload } from "../../../../hooks/useCustomDownload";
import { BASE_API_URL_2025 } from "../../data/BASE_API_URL";

export function PostulationSection2025() {
  const customDownload = useCustomDownload();
  const [activeTab, setActiveTab] = useState("tab1");
  const { getPayload } = useContext(AuthContext);
  const centro = getPayload()?.centro ?? null;

  return (
    <ModulePageLayout>
      <CustomTabs
        setActiveFn={setActiveTab}
        currentActive={activeTab}
        tabArray={tabList}
      >
        <Button
          text={"Excel Cuotas"}
          action={() => {
            let param = "";
            if (centro) param = `?centro=${centro}`;
            customDownload({
              route: BASE_API_URL_2025 + "/2025-excel-cuotas-cdc" + param,
              options: { method: "GET" },
              filename: `CUOTAS-CENTRO-${centro ? centro : "TOTAL"}.csv`,
            });
          }}
        />
      </CustomTabs>
      <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
        <TabPostulacion />
      </div>
      <div style={{ display: activeTab === "tab2" ? "block" : "none" }}>
        <TabCuotas />
      </div>
      {/* <div style={{ display: activeTab === "tab3" ? "block" : "none" }}>
        <TabPrecapacitacion />
      </div> */}
    </ModulePageLayout>
  );
}
