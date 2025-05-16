import "./index.css";
import { useState } from "react";
import { TabGeneralPortafolio } from "./components/TabGeneralPortafolio";
import { TabDependenciaPortafolio } from "./components/TabDependenciaPortafolio";
// import { TabConvocatoriaPortafolio } from "./components/TabConvocatoriaPortafolio";
// import { TabRegionPortafolio } from "./components/TabRegionPortafolio";
// import { TabAgrupacionPortafolio } from "./components/TabAgrupacionPortafolio";
import { TabsPortafolio } from "../PortfolioSection/components/TabsPortafolio/Tabs";

export function PortfolioSection2025() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <section className="pagina-portafolio roboto-regular">
      <article className="portafolio-content">
        <TabsPortafolio setActive={setActiveTab} active={activeTab} />
        <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
          <TabGeneralPortafolio />
          {/* </div> */}
          {/* <div style={{ display: activeTab === "tab2" ? "block" : "none" }}>
          <TabDependenciaPortafolio />
        </div> */}
          {/* <div style={{ display: activeTab === "tab3" ? "block" : "none" }}>
          <TabConvocatoriaPortafolio />
        </div> */}
          {/* <div style={{ display: activeTab === "tab4" ? "block" : "none" }}>
          <TabRegionPortafolio />
        </div> */}
          {/* <div style={{ display: activeTab === "tab5" ? "block" : "none" }}>
          <TabAgrupacionPortafolio /> {/* NUEVO COMPONENTE */}
        </div>
      </article>
    </section>
  );
}
