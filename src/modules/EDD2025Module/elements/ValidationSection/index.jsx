import "./index.css";
import { useState } from "react";
import { Tabs } from "./components/Tabs";
import { TabGeneral } from "./components/TabGeneral";
import { TabDependencia } from "./components/TabDependencia";
import { TabConvocatoria } from "./components/TabConvocatoria";
import { TabRegion } from "./components/TabRegion";

export function ValidationSection2025() {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <section className="validation-page roboto-regular">
      <article className="validation-content">
        <Tabs setActive={setActiveTab} active={activeTab} />
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
