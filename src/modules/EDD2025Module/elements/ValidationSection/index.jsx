import "./style.css";
import { useState } from "react";
import { TabGeneral } from "./components/TabGeneral";
import { TabDependencia } from "./components/TabDependencia";
import { TabConvocatoria } from "./components/TabConvocatoria";
import { TabRegion } from "./components/TabRegion";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";
import { tabList } from "./data/TabList";
import { useCustomDownload } from "../../../../hooks/useCustomDownload";
import { Button } from "../../../../components/Button";
import { BASE_API_URL_2025 } from "../../data/BASE_API_URL";

export function ValidationSection2025() {
  const customDownload = useCustomDownload();
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <ModulePageLayout>
      <CustomTabs
        setActiveFn={setActiveTab}
        currentActive={activeTab}
        tabArray={tabList}
      >
        <Button
          text={"Excel Docente"}
          action={() => {
            customDownload(
              BASE_API_URL_2025 + "/2025-validacion-descarga-excel",
              { method: "POST" },
              "validacion-docentes.csv"
            );
          }}
        />
        <Button
          text={"Excel Sostenedor"}
          action={() => {
            customDownload(
              BASE_API_URL_2025 + "/2025-validacion-descarga-excel-sostenedor",
              { method: "POST" },
              "validacion-sostenedores.csv"
            );
          }}
        />
      </CustomTabs>
      <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
        <TabGeneral />
      </div>
      <div style={{ display: activeTab === "tab2" ? "block" : "none" }}>
        <TabDependencia />
      </div>
      <div style={{ display: activeTab === "tab3" ? "block" : "none" }}>
        <TabConvocatoria />
      </div>
      <div style={{ display: activeTab === "tab4" ? "block" : "none" }}>
        <TabRegion />
      </div>
    </ModulePageLayout>
  );
}
