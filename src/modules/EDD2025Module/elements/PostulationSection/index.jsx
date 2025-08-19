import { useState } from "react";
import { useCustomDownload } from "../../../../hooks/useCustomDownload";
import { tabList } from "./data/TabList";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";
import { Button } from "../../../../components/Button";
import TabPostulacion from "./components/TabPostulacion";
import TabCuotas from "./components/TabCuotas";

export function PostulationSection2025() {
  const [activeTab, setActiveTab] = useState("tab1");
  const customDownload = useCustomDownload();

  return (
    <ModulePageLayout>
      <CustomTabs
        setActiveFn={setActiveTab}
        currentActive={activeTab}
        tabArray={tabList}
      >
        <div style={{ width: 100 }}></div>
        <Button
          text={"Excel"}
          action={() => {
            // customDownload(
            //   BASE_API_URL_2025 + "/2025-grabaciones-excel",
            //   { method: "POST" },
            //   "grabacion-docentes.csv"
            // );
          }}
        />
      </CustomTabs>
      <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
        <TabPostulacion />
      </div>
      <div style={{ display: activeTab === "tab2" ? "block" : "none" }}>
        <TabCuotas />
      </div>
      <div style={{ display: activeTab === "tab3" ? "block" : "none" }}>
        {/* <TabDependencia /> */}
      </div>
    </ModulePageLayout>
  );
}
