import { useState } from "react";
import { useCustomDownload } from "../../../../hooks/useCustomDownload";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";

export function PortfolioCorrectionSection2025() {
  const customDownload = useCustomDownload();
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <ModulePageLayout>
      <CustomTabs
        setActiveFn={setActiveTab}
        currentActive={activeTab}
        tabArray={[]}
      >
      </CustomTabs>
      <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
        {/* <TabGeneral /> */}
      </div>
      <div style={{ display: activeTab === "tab2" ? "block" : "none" }}>
        {/* <TabDependencia /> */}
      </div>
      <div style={{ display: activeTab === "tab3" ? "block" : "none" }}>
        {/* <TabConvocatoria /> */}
      </div>
      <div style={{ display: activeTab === "tab4" ? "block" : "none" }}>
        {/* <TabRegion /> */}
      </div>
    </ModulePageLayout>
  );
}
