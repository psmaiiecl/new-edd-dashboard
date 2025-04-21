import "./index.css";
import { useState } from "react";
import { TabConvocatoria } from "./components/TabConvocatoria";
import { TabDependencia } from "./components/TabDependencia";
import { TabGeneral } from "./components/TabGeneral";
import { TabRegion } from "./components/TabRegion";
import { Tabs } from "./components/Tabs/Tabs";
import BackIcon from "../../../../assets/icons/back.svg";
import { useNavigate } from "react-router";

export function InscriptionSection2025() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <section className="pagina-inscripcion roboto-regular">
      <div className="go-back" onClick={() => navigate(-1)}>
        <img src={BackIcon} />
      </div>
      <article className="inscripcion-content">
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
