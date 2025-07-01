import "./style.css";
import { useState } from "react";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";
import { TabGeneralResultados } from "./components/Tabs/TabGeneralResultados";
import { Button } from "../../../../components/Button";
import { useCustomDownload } from "../../../../hooks/useCustomDownload";
import { BASE_API_URL_2025 } from "../../data/BASE_API_URL";
import { RatiosPanel } from "./components/RatiosPanel/RatiosPanel";

export function ResultSection2025() {
  const customDownload = useCustomDownload();
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <ModulePageLayout>
      <CustomTabs
        setActiveFn={setActiveTab}
        currentActive={activeTab}
        tabArray={[]}
      >
        <Button
          text={"Excel Docente"}
          style={{ width: "500px", textAlign: "center" }}
          action={() => {
            customDownload(
              BASE_API_URL_2025 + "/2025-informes-resultados-excel-docente",
              { method: "POST" },
              "Entrega-resultados-docentes.csv"
            );
          }}
        />
        <Button
          text={"Excel Director EE"}
          style={{ width: "500px", textAlign: "center" }}
          action={() => {
            customDownload(
              BASE_API_URL_2025 + "/2025-informes-resultados-excel-director",
              { method: "POST" },
              "Entrega-resultados-director.csv"
            );
          }}
        />
        <Button
          text={"Excel Sostenedor"}
          style={{ width: "500px", textAlign: "center" }}
          action={() => {
            customDownload(
              BASE_API_URL_2025 + "/2025-informes-resultados-excel-sostenedor",
              { method: "POST" },
              "Entrega-resultados-sostenedores.csv"
            );
          }}
        />
      </CustomTabs>
      <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
        <TabGeneralResultados />
      </div>
    </ModulePageLayout>
  );
}
