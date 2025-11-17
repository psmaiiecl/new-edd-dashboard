import { useState } from "react";
import { useCustomDownload } from "../../../../hooks/useCustomDownload";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { tabList } from "./data/TabList";
import { BASE_API_URL_2025 } from "../../data/BASE_API_URL";
import { CustomTabs } from "../../../../components/CustomTabs";
import { Button } from "../../../../components/Button";
import { TabGeneral } from "./components/TabGeneral";
import { TabDependencia } from "./components/TabDependencia";
import { TabConvocatoria } from "./components/TabConvocatoria";
import { TabRegion } from "./components/TabRegion";
import { TabAgrupacion } from "./components/TabAgrupacion";

export function PortfolioSection2025() {
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
            customDownload({
              route: BASE_API_URL_2025 + "/2025-portafolio-excel-docente",
              options: { method: "POST" },
              filename: "portafolio-docente.csv",
            });
          }}
        />
        <Button
          text={"Excel Sostenedor"}
          action={() => {
            customDownload({
              route: BASE_API_URL_2025 + "/2025-portafolio-excel-sostenedor",
              options: { method: "POST" },
              filename: "portafolio-sostenedores.csv",
            });
          }}
        />
      </CustomTabs>
      <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
        <TabGeneral/>
      </div>
      <div style={{ display: activeTab === "tab2" ? "block" : "none" }}>
        <TabDependencia/>
      </div>
      <div style={{ display: activeTab === "tab3" ? "block" : "none" }}>
        <TabConvocatoria/>
      </div>
      <div style={{ display: activeTab === "tab4" ? "block" : "none" }}>
        <TabRegion/>
      </div>
      <div style={{ display: activeTab === "tab5" ? "block" : "none" }}>
        <TabAgrupacion/>
      </div>
    </ModulePageLayout>
  );
}
