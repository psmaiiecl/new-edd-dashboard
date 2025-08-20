import { useState } from "react";
import { tabList } from "./data/TabList";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";
import TabPostulacion from "./components/TabPostulacion";
import TabCuotas from "./components/TabCuotas";
import TabPrecapacitacion from "./components/TabPrecapacitacion";

export function PostulationSection2025() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <ModulePageLayout>
      <CustomTabs
        setActiveFn={setActiveTab}
        currentActive={activeTab}
        tabArray={tabList}
      />
      <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
        <TabPostulacion />
      </div>
      <div style={{ display: activeTab === "tab2" ? "block" : "none" }}>
        <TabCuotas />
      </div>
      <div style={{ display: activeTab === "tab3" ? "block" : "none" }}>
        <TabPrecapacitacion />
      </div>
    </ModulePageLayout>
  );
}
