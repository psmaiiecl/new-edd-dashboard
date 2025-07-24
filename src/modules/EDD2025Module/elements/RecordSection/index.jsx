import { useState } from "react";
import "./index.css";
import { tabList } from "./data/TabList";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";
import TabGeneral from "./components/TabGeneral";
import TabCTG from "./components/TabCTG";
import TabDependencia from "./components/TabDependencia";
import TabConvocatoria from "./components/TabConvocatoria";
import TabRegion from "./components/TabRegion";

export function RecordSection2025() {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <ModulePageLayout>
      <CustomTabs
        setActiveFn={setActiveTab}
        currentActive={activeTab}
        tabArray={tabList}
      />
      <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
        <TabGeneral />
      </div>
      <div style={{ display: activeTab === "tab2" ? "block" : "none" }}>
        <TabCTG />
      </div>
      <div style={{ display: activeTab === "tab3" ? "block" : "none" }}>
        <TabDependencia />
      </div>
      <div style={{ display: activeTab === "tab4" ? "block" : "none" }}>
        <TabConvocatoria />
      </div>
      <div style={{ display: activeTab === "tab5" ? "block" : "none" }}>
        <TabRegion />
      </div>
    </ModulePageLayout>
  );
}
