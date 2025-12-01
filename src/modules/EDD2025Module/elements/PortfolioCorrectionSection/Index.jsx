import { useContext, useEffect, useMemo, useState } from "react";
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
import { TabProductividad } from "./components/TabProductividad";
import { TabMarca1 } from "./components/TabMarca1";
import { AuthContext } from "../../../../context/AuthContext";
import { filterTabsByUserRole } from "../../../../components/CustomTabs/utils/tabFilter";

export function PortfolioCorrectionSection2025() {
  const { getTipoUsuario } = useContext(AuthContext);
  const tipoUsuario = getTipoUsuario();

  const filteredTabList = useMemo(() => {
    return filterTabsByUserRole(tabList, tipoUsuario);
  }, [tipoUsuario]);
  const filteredResultadosTabList = useMemo(() => {
    return filterTabsByUserRole(resultadosTabList, tipoUsuario);
  }, [tipoUsuario]);
  const filteredMonitoreoTabList = useMemo(() => {
    return filterTabsByUserRole(monitoreoTabList, tipoUsuario);
  }, [tipoUsuario]);

  const [activeTab, setActiveTab] = useState(null);
  const [innerTab, setInnerTab] = useState(null);

  useEffect(() => {
    const firstOuter = filteredTabList.find((t) => !t.exclude)?.index ?? null;
    setActiveTab(firstOuter);
  }, [filteredTabList]);

  useEffect(() => {
    const selectedOuter = filteredTabList.find((t) => t.index === activeTab);

    if (!selectedOuter?.inner) {
      setInnerTab(null);
      return;
    }

    const filteredInnerTabs = filterTabsByUserRole(
      selectedOuter.inner,
      tipoUsuario
    );

    const firstInner = filteredInnerTabs.find((t) => !t.exclude);

    if (firstInner) {
      setInnerTab(firstInner.index);
    } else {
      setInnerTab(null);
    }
  }, [activeTab, tipoUsuario, filteredTabList]);

  return (
    <ModulePageLayout>
      <CustomTabs
        setActiveFn={setActiveTab}
        currentActive={activeTab}
        tabArray={filteredTabList}
      ></CustomTabs>
      {![6].includes(tipoUsuario) && (
        <TabPanel isActive={activeTab === "tab1"}>
          <CustomTabs
            setActiveFn={setInnerTab}
            currentActive={innerTab}
            tabArray={filteredResultadosTabList}
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
      )}
      <TabPanel isActive={activeTab === "tab2"}>
        <CustomTabs
          setActiveFn={setInnerTab}
          currentActive={innerTab}
          tabArray={filteredMonitoreoTabList}
        ></CustomTabs>
        {innerTab === "mtab1" && <TabCorreccionesGrupales />}
        {innerTab === "mtab2" && <TabTercerasCorrecciones />}
        {innerTab === "mtab3" && <TabDistribucionPuntaje />}
        {innerTab === "mtab4" && <TabProductividad />}
      </TabPanel>
      <TabPanel isActive={activeTab === "tab3"}>
        <TabMarca1 />
      </TabPanel>
    </ModulePageLayout>
  );
}
