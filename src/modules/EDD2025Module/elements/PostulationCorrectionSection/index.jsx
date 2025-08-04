import "./index.css";
import { useState } from "react";
import TabsPostulacion from "./components/TabsPostulacion/TabsPostulacion";
import TabsGeneralPostulacion  from "./components/TabGeneralPostulacion/TabGeneralPostulacion";
// import { TabPreseleccionPostulacion } from "./components/TabPreseleccionPostulacion";
// import { TabCuotasCdcPostulacion } from "./components/TabCuotasCdcPostulacion";
// import { TabPrecapacitacionPostulacion } from "./components/TabPrecapaciotacionPostulacion";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { TabContent } from "../../../../components/Layout/TabContent";

export function PostulationCorrectionSection2025() {
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
      <TabsPostulacion setActive={setActiveTab} active={activeTab} />

      {/* TAB 1 - General */}
      <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
        <TabContent>
          <TabsGeneralPostulacion
          />
        </TabContent>
      </div>

      {/* TAB 2 - Dependencia
      <div style={{ display: activeTab === "tab2" ? "block" : "none" }}>
        <TabPreseleccionPostulacion isActive={activeTab === "tab2"} />
      </div>

      {/* TAB 3 - Convocatoria 
      <div style={{ display: activeTab === "tab3" ? "block" : "none" }}>
        <TabCuotasCdcPostulacion isActive={activeTab === "tab3"} />
      </div>

      {/* TAB 4 - CTG
      <div style={{ display: activeTab === "tab4" ? "block" : "none" }}>
        <TabPrecapacitacionPostulacion isActive={activeTab === "tab4"} />
      </div> */}

    </ModulePageLayout>
  );
}
