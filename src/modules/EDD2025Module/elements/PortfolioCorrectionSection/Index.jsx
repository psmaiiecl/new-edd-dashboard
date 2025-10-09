import { useEffect, useState } from "react";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";
import { monitoreoTabList, resultadosTabList, tabList } from "./data/TabList";
import { TabDistribucionResultados } from "./components/TabDistribucionResultados";
import { TabModulo } from "./components/TabModulo";
import { TabCorreccionesGrupales } from "./components/TabCorreccionesGrupales";
import "./style.css";
import { TabTercerasCorrecciones } from "./components/TabTercerasCorrecciones";
import { TabDistribucionPuntaje } from "./components/TabDistribucionPuntaje";
import { TabPanel } from "../../../../components/TabPanel";

export function PortfolioCorrectionSection2025() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [innerTab, setInnerTab] = useState("rtab1");

  useEffect(() => {
    const outer = tabList.find((tab) => tab.index === activeTab);
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
      <TabPanel isActive={activeTab === "tab1"}>
        <CustomTabs
          setActiveFn={setInnerTab}
          currentActive={innerTab}
          tabArray={resultadosTabList}
        ></CustomTabs>
        <TabPanel isActive={innerTab === "rtab1"}>
          <TabDistribucionResultados />
        </TabPanel>
        <TabPanel isActive={innerTab === "rtab2"}>
          <TabModulo module={"Módulo 1"} />
        </TabPanel>
        <TabPanel isActive={innerTab === "rtab3"}>
          <TabModulo module={"Módulo 2"} />
        </TabPanel>
        <TabPanel isActive={innerTab === "rtab4"}>
          <TabModulo module={"Módulo 3"} />
        </TabPanel>
      </TabPanel>
      <TabPanel isActive={activeTab === "tab2"}>
        <CustomTabs
          setActiveFn={setInnerTab}
          currentActive={innerTab}
          tabArray={monitoreoTabList}
        ></CustomTabs>
        {innerTab === "mtab1" && <TabCorreccionesGrupales />}
        {innerTab === "mtab2" && <TabTercerasCorrecciones />}
        {innerTab === "mtab3" && <TabDistribucionPuntaje />}
      </TabPanel>
    </ModulePageLayout>
  );
}
