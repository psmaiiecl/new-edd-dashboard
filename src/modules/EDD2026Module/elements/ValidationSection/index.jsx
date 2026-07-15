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
import { useQuickSightEmbed } from "../../../../hooks/useQuickSightEmbed";
import { Button } from "../../../../components/Button";
import { BASE_API_URL_2026 } from "../../../../constants/BASE_API_URL";

const QUICKSIGHT_DASHBOARD_ID = "e5e5d6f9-549a-4460-83c3-4733da32b6a5";

export function ValidationSection2026() {
  const customDownload = useCustomDownload();
  const { openDashboard } = useQuickSightEmbed();
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
            customDownload({
              route: BASE_API_URL_2026 + "/validacion/docente/excel",
              options: { method: "GET" },
              filename: "validacion-docentes.csv",
            });
          }}
        />
        <Button
          text={"Excel Sostenedor"}
          action={() => {
            customDownload({
              route:
                BASE_API_URL_2026 + "/validacion/sostenedor/excel",
              options: { method: "GET" },
              filename: "validacion-sostenedores.csv",
            });
          }}
        />
        {activeTab === "tab1" && (
          <Button
            text={"QuickSight"}
            variant="quicksight"
            action={() => openDashboard(QUICKSIGHT_DASHBOARD_ID)}
          />
        )}
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
