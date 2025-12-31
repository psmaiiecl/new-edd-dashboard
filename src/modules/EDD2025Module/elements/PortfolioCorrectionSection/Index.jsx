import { useContext, useEffect, useMemo, useState } from "react";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";
import { IATabList, monitoreoTabList, resultadosTabList, tabList } from "./data/TabList";
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
import { useCustomFetch } from "../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../data/BASE_API_URL";
import { TabEviIncognita } from "./components/TabEviIncognita";
import { TabMIDE } from "./components/TabMIDE";
import { TabBC } from "./components/TabBC";

export function PortfolioCorrectionSection2025() {
  const { getTipoUsuario } = useContext(AuthContext);
  const tipoUsuario = getTipoUsuario();
  const customFetch = useCustomFetch();

  const filteredTabList = useMemo(() => {
    return filterTabsByUserRole(tabList, tipoUsuario);
  }, [tipoUsuario]);
  const filteredResultadosTabList = useMemo(() => {
    return filterTabsByUserRole(resultadosTabList, tipoUsuario);
  }, [tipoUsuario]);
  const filteredMonitoreoTabList = useMemo(() => {
    return filterTabsByUserRole(monitoreoTabList, tipoUsuario);
  }, [tipoUsuario]);
  const filteredIATabList = useMemo(() => {
    return filterTabsByUserRole(IATabList, tipoUsuario);
  }, [tipoUsuario]);

  const [activeTab, setActiveTab] = useState(null);
  const [innerTab, setInnerTab] = useState(null);
  const [selectors, setSelectors] = useState({});

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

  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-cpf-filtros",
      method: "GET",
      shouldCache: true,
    }).then((data) => {
      setSelectors(data);
    });
  }, [customFetch]);

  return (
    <ModulePageLayout>
      <CustomTabs
        setActiveFn={setActiveTab}
        currentActive={activeTab}
        tabArray={filteredTabList}
      ></CustomTabs>
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
          <TabModulo
            module={"Módulo 1"}
            selectors={selectors?.anidamiento || []}
          />
        </TabPanel>
        <TabPanel isActive={innerTab === "rtab3"}>
          <TabModulo
            module={"Módulo 2"}
            selectors={selectors?.anidamiento || []}
          />
        </TabPanel>
        <TabPanel isActive={innerTab === "rtab4"}>
          <TabModulo
            module={"Módulo 3"}
            selectors={selectors?.anidamiento || []}
          />
        </TabPanel>
      </TabPanel>
      <TabPanel isActive={activeTab === "tab2"}>
        <CustomTabs
          setActiveFn={setInnerTab}
          currentActive={innerTab}
          tabArray={filteredMonitoreoTabList}
        ></CustomTabs>
        {innerTab === "mtab1" && (
          <TabCorreccionesGrupales selectors={selectors} />
        )}
        {innerTab === "mtab2" && (
          <TabTercerasCorrecciones selectors={selectors} />
        )}
        {innerTab === "mtab3" && (
          <TabDistribucionPuntaje selectors={selectors} />
        )}
        {innerTab === "mtab4" && <TabProductividad selectors={selectors} />}
      </TabPanel>
      <TabPanel isActive={activeTab === "tab6"}>
        <TabEviIncognita selectors={selectors} />
      </TabPanel>
      <TabPanel isActive={activeTab === "tab3"}>
        <TabMarca1 />
      </TabPanel>
      <TabPanel isActive={activeTab === "tab5"}>
        <TabBC selectors={selectors} />
      </TabPanel>
      <TabPanel isActive={activeTab === "tab7"}>
        {activeTab === "tab7" && <TabMIDE selectors={selectors} />}
      </TabPanel>
      <TabPanel isActive={activeTab === "tab4"}>
        <CustomTabs
          setActiveFn={setInnerTab}
          currentActive={innerTab}
          tabArray={filteredIATabList}
        ></CustomTabs>
        <TabPanel isActive={innerTab === "itab1"}>
        </TabPanel>
        <TabPanel isActive={innerTab === "itab2"}>
        </TabPanel>
        <TabPanel isActive={innerTab === "itab3"}>
        </TabPanel>
        <TabPanel isActive={innerTab === "itab4"}>
        </TabPanel>
      </TabPanel>
    </ModulePageLayout>
  );
}
