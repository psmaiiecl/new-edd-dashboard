import "./style.css";
import { useState } from "react";
import { TabGeneral } from "./components/TabGeneral";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";
import { tabList } from "./data/TabList";
import { Button } from "../../../../components/Button";
import { useCustomDownload } from "../../../../hooks/useCustomDownload";
// import { BASE_API_URL_2025 } from "../../data/BASE_API_URL";

export function InscriptionSection2026() {
  const customDownload = useCustomDownload();
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <ModulePageLayout>
      <CustomTabs
        setActiveFn={setActiveTab}
        currentActive={activeTab}
        tabArray={tabList}
      >
        {/* <Button
          text={"Excel Docente"}
          action={() => {
            customDownload({
              route: BASE_API_URL_2025 + "/2025-inscripcion-descarga-excel",
              options: { method: "POST" },
              filename: "inscripcion-docentes.csv",
            });
          }}
        /> */}
      </CustomTabs>
      <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
        <TabGeneral />
      </div>
      <div style={{ display: activeTab === "tab2" ? "block" : "none" }}>
        {/* <TabDependencia /> */}
      </div>
      <div style={{ display: activeTab === "tab3" ? "block" : "none" }}>
        {/* <TabConvocatoria /> */}
      </div>
      <div style={{ display: activeTab === "tab4" ? "block" : "none" }}>
        {/* <TabRegion /> */}
      </div>
    </ModulePageLayout>
  );
}
