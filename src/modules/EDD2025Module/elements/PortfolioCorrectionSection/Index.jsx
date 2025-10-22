import { Fragment, useEffect, useState } from "react";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";
import { flujosTabList, monitoreoTabList, resultadosTabList, tabList } from "./data/TabList";
import { TabDistribucionResultados } from "./components/TabDistribucionResultados";
import { TabModulo } from "./components/TabModulo";
import { TabCorreccionesGrupales } from "./components/TabCorreccionesGrupales";
import "./style.css";
import { TabTercerasCorrecciones } from "./components/TabTercerasCorrecciones";
import { TabDistribucionPuntaje } from "./components/TabDistribucionPuntaje";
import { TabPanel } from "../../../../components/TabPanel";
import { TabProductividad } from "./components/TabProductividad";
import { TabMarca1 } from "./components/TabMarca1";

export function PortfolioCorrectionSection2025() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [innerTab, setInnerTab] = useState("rtab4");

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
        {innerTab === "mtab4" && <TabProductividad />}
      </TabPanel>
      <TabPanel isActive={activeTab === "tab3"}>
        <CustomTabs
          setActiveFn={setInnerTab}
          currentActive={innerTab}
          tabArray={flujosTabList}
        ></CustomTabs>
        
        {innerTab === "ftab1" && <TabMarca1 />}
      </TabPanel>
    </ModulePageLayout>
  );
}
