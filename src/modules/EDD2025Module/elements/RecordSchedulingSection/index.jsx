import { useState } from "react";
import { TabGeneral } from "./components/TabGeneral";
import { Tabs } from "./components/Tabs";
import "./index.css";
import { tabList } from "./data/TabList";

export function RecordSchedulingSection2025() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <section className="pagina-agendamiento roboto-regular">
      <article className="agendamiento-content">
        <Tabs tabList={tabList} setActive={setActiveTab} active={activeTab} />
        <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
          <TabGeneral />
        </div>
      </article>
    </section>
  );
}
