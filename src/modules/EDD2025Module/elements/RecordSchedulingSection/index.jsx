import { useState } from "react";
import { TabGeneral } from "./components/TabGeneral";
import { Tabs } from "./components/Tabs";
import "./index.css";
import { tabList } from "./data/TabList";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";

export function RecordSchedulingSection2025() {
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
    </ModulePageLayout>
  );
}
