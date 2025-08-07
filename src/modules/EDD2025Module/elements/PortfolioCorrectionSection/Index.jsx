import { useEffect, useState } from "react";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";
import { monitoreoTabList, resultadosTabList, tabList } from "./data/TabList";
import { TabDistribucionResultados } from "./components/TabDistribucionResultados";

export function PortfolioCorrectionSection2025() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [innerTab, setInnerTab] = useState("rtab1");

  useEffect(() => {
    const outer = tabList.find(tab => tab.index === activeTab);
    if (outer && outer.inner && outer.inner.length > 0) {
      setInnerTab(outer.inner[0].index);
    }
  }, [activeTab]);
  return (
    <ModulePageLayout>
      <CustomTabs
        setActiveFn={setActiveTab}
        currentActive={activeTab}
        tabArray={tabList}
      ></CustomTabs>
      <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
        <CustomTabs
          setActiveFn={setInnerTab}
          currentActive={innerTab}
          tabArray={resultadosTabList}
        ></CustomTabs>
        <div style={{ display: innerTab === "rtab1" ? "block" : "none" }}>
          <TabDistribucionResultados />
        </div>
        <div style={{ display: innerTab === "rtab2" ? "block" : "none" }}>
          Módulo 1
        </div>
        <div style={{ display: innerTab === "rtab3" ? "block" : "none" }}>
          Módulo 2
        </div>
        <div style={{ display: innerTab === "rtab4" ? "block" : "none" }}>
          Módulo 3
        </div>
      </div>
      <div style={{ display: activeTab === "tab2" ? "block" : "none" }}>
        <CustomTabs
          setActiveFn={setInnerTab}
          currentActive={innerTab}
          tabArray={monitoreoTabList}
        ></CustomTabs>
        <div style={{ display: innerTab === "mtab1" ? "block" : "none" }}>
          Calibracion correcciones grupales
        </div>
        <div style={{ display: innerTab === "mtab2" ? "block" : "none" }}>
          Calibracion terceras correcciones
        </div>
        <div style={{ display: innerTab === "mtab3" ? "block" : "none" }}>
          Distribucion porcentajes
        </div>
      </div>
    </ModulePageLayout>
  );
}
