import { useState } from "react";
import { CustomTabs } from "../../../../components/CustomTabs";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { useCustomDownload } from "../../../../hooks/useCustomDownload";
import { BASE_API_URL_2025 } from "../../data/BASE_API_URL";
import { tabList } from "./data/TabList";
import TabGeneral from "./components/TabGeneral";
import { Button } from "../../../../components/Button";

export function ProcessingSection2025() {
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
          text={"Excel Docente"}
          action={() => {
            customDownload(
              BASE_API_URL_2025 + "/2025-grabaciones-excel",
              { method: "POST" },
              "grabacion-docentes.csv"
            );
          }}
        />
      </CustomTabs>
      <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
        <TabGeneral />
      </div>
      <div style={{ display: activeTab === "tab2" ? "block" : "none" }}>
        {/* <TabCTG /> */}
      </div>
      <div style={{ display: activeTab === "tab3" ? "block" : "none" }}>
        {/* <TabDependencia /> */}
      </div>
      <div style={{ display: activeTab === "tab4" ? "block" : "none" }}>
        {/* <TabConvocatoria /> */}
      </div>
      <div style={{ display: activeTab === "tab5" ? "block" : "none" }}>
        {/* <TabRegion /> */}
      </div>
    </ModulePageLayout>
  );
}
