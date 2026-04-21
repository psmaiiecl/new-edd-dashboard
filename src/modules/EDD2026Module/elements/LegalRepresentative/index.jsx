import "./style.css";
import { useState } from "react";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";
import { tabList } from "./data/TabList";
import { Button } from "../../../../components/Button";
import { useCustomDownload } from "../../../../hooks/useCustomDownload";
import { TabGeneral } from "./components/TabGeneral";
import { BASE_API_URL_2026 } from "../../../../constants/BASE_API_URL.JS";

export default function LegalRepresentative2026() {
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
          text={"Excel"}
          action={() => {
            customDownload({
              route:
                BASE_API_URL_2026 +
                "/representantes-legales/excel",
              options: { method: "GET" },
              filename: "representantes-legales.csv",
            });
          }}
        />
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
