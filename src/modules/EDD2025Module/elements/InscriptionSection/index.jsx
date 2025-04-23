import "./index.css";
import { useState } from "react";
import { Tabs } from "./components/Tabs";
import { TabGeneral } from "./components/TabGeneral";
import { TabConvocatoria } from "./components/TabConvocatoria";
import { TabDependencia } from "./components/TabDependencia";
import { TabRegion } from "./components/TabRegion";

export function InscriptionSection2025() {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <section className="pagina-inscripcion roboto-regular">
      <article className="inscripcion-content">
        {/* <Tabs setActive={setActiveTab} active={activeTab} /> */}
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
      </article>
    </section>
  );
}
