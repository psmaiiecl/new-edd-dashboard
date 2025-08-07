import "./index.css";

// import "./style.css";
import { useState } from "react";
import TabGeneralPostulacion from "./components/TabGeneralPostulacion/TabGeneralPostulacion";
import TabCuotasCdcPostulacion from "./components/TabCuotasCdcPostulacion/TabCuotasCdcPostulacion";
import TabPrecapacitacionPostulacion from "./components/TabPrecapacitacionPostulacion/TabPrecapacitacionPostulacion";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";
import { tabList } from "./data/TabList";
import { Button } from "../../../../components/Button";
import { useCustomDownload } from "../../../../hooks/useCustomDownload";
import { BASE_API_URL_2025 } from "../../data/BASE_API_URL";

export function PostulationCorrectionSection2025() {
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
              BASE_API_URL_2025 + "/2025-inscripcion-descarga-excel",
              { method: "POST" },
              "inscripcion-docentes.csv"
            );
          }}
        />
      </CustomTabs>
      {/* TAB 1 - General */}
      <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
      
          <TabGeneralPostulacion
          />
   
      </div>
      {/* TAB 2 - CuotasCdc */}
      <div style={{ display: activeTab === "tab2" ? "block" : "none" }}>
        <TabCuotasCdcPostulacion isActive={activeTab === "tab2"} />
      </div>

      {/* TAB 3 - CTG*/}

      <div style={{ display: activeTab === "tab3" ? "block" : "none" }}>
        <TabPrecapacitacionPostulacion isActive={activeTab === "tab3"} />
      </div> 
    </ModulePageLayout>
  );
}