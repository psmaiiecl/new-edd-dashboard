import "./index.css";
import { useState } from "react";
import { TabGeneralProcesamiento } from "./components/TabGeneralProcesamiento/TabGeneralProcesamiento";
import { TabDependenciaProcesamiento } from "./components/TabDependenciaProcesamiento/TabDependenciaProcesamiento";
import { TabConvocatoriaProcesamiento } from "./components/TabConvocatoriaProcesamiento/TabConvocatoriaProcesamiento";
import { TabRegionProcesamiento } from "./components/TabRegionProcesamiento/TabRegionProcesamiento";
import { TabCtgProcesamiento } from "./components/TabCtgProcesamiento/TabCtgProcesamiento";
import { TabsProcesamiento } from "./components/TabsProcesamiento/TabsProcesamiento";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { TabContent } from "../../../../components/Layout/TabContent";

export function SDProcessingSection2025() {
  const [activeTab, setActiveTab] = useState("tab1");

  const [filtros, setFiltros] = useState({
    dependencia: "",
    region: "",
  });

  const handleFiltroChange = (dependencia, valor) => {
    setFiltros((prev) => ({
      ...prev,
      [dependencia]: valor,
    }));
  };

  return (
    <ModulePageLayout>
      <TabsProcesamiento setActive={setActiveTab} active={activeTab} />

      {/* TAB 1 - General */}
      <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
        <TabContent>
          <TabGeneralProcesamiento
          />
        </TabContent>
      </div>

      {/* TAB 2 - Dependencia */}
      <div style={{ display: activeTab === "tab2" ? "block" : "none" }}>
        <TabDependenciaProcesamiento isActive={activeTab === "tab2"} />
      </div>

      {/* TAB 3 - Convocatoria */}
      <div style={{ display: activeTab === "tab3" ? "block" : "none" }}>
        <TabConvocatoriaProcesamiento isActive={activeTab === "tab3"} />
      </div>

      {/* TAB 4 - CTG */}
      <div style={{ display: activeTab === "tab4" ? "block" : "none" }}>
        <TabCtgProcesamiento isActive={activeTab === "tab4"} />
      </div>

      {/* TAB 5 - Región */}
      <div style={{ display: activeTab === "tab5" ? "block" : "none" }}>
        <TabRegionProcesamiento isActive={activeTab === "tab5"} />
      </div>


    </ModulePageLayout>
  );
}
