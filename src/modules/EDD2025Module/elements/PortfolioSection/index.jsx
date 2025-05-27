import "./index.css";
import { useState } from "react";
import { TabGeneralPortafolio } from "./components/TabGeneralPortafolio";
import { TabDependenciaPortafolio } from "./components/TabDependenciaPortafolio";
import { TabConvocatoriaPortafolio } from "./components/TabConvocatoriaPortafolio";
import { TabRegionPortafolio } from "./components/TabRegionPortafolio";
import { TabAgrupacionPortafolio } from "./components/TabAgrupacionPortafolio";
import { TabsPortafolio } from "../PortfolioSection/components/TabsPortafolio/Tabs";
import FiltrosPortfolioSection from "./components/FiltrosPortfolioSection";

export function PortfolioSection2025() {
  const [activeTab, setActiveTab] = useState("tab1");

  const [filtros, setFiltros] = useState({
    dependencia: "",
    region: "",
  });

  const handleFiltroChange = (filtroNombre, valor) => {
    setFiltros((prev) => ({
      ...prev,
      [filtroNombre]: valor,
    }));
  };

  return (
    <section className="pagina-portafolio roboto-regular">
      <article className="portafolio-content">
        <TabsPortafolio setActive={setActiveTab} active={activeTab} />

        {/* TAB 1 - General */}
        <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
          <FiltrosPortfolioSection
            filtros={filtros}
            onFiltroChange={handleFiltroChange}
          />
          <TabGeneralPortafolio
            filtros={filtros}
            onFiltroChange={handleFiltroChange}
          />
        </div>

        {/* TAB 2 - Dependencia */}
        <div style={{ display: activeTab === "tab2" ? "block" : "none" }}>
          <TabDependenciaPortafolio isActive={activeTab === "tab2"} />
        </div>

        {/* TAB 3 - Convocatoria */}
        <div style={{ display: activeTab === "tab3" ? "block" : "none" }}>
          <TabConvocatoriaPortafolio isActive={activeTab === "tab3"} />
        </div>

        {/* TAB 4 - Región */}
        <div style={{ display: activeTab === "tab4" ? "block" : "none" }}>
          <TabRegionPortafolio isActive={activeTab === "tab4"} />
        </div>

        {/* TAB 5 - Agrupación */}
        <div style={{ display: activeTab === "tab5" ? "block" : "none" }}>
          <TabAgrupacionPortafolio isActive={activeTab === "tab5"} />
        </div>
      </article>
    </section>
  );
}
