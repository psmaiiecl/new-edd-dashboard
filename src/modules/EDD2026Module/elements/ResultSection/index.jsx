import { useState } from "react";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";
import { TabGeneralResultados } from "./components/Tabs/TabGeneralResultados";
import { Button } from "../../../../components/Button";
import { useCustomDownload } from "../../../../hooks/useCustomDownload";
import { BASE_API_URL_2026 } from "../../../../constants/BASE_API_URL";

export function ResultSection2026() {
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
            customDownload({
              route: BASE_API_URL_2026 + "/informes/docente/excel",
              options: { method: "GET" },
              filename: "Entrega-resultados-docentes.csv",
            });
          }}
        />
        <Button
          text={"Excel Director EE"}
          style={{ width: "500px", textAlign: "center" }}
          action={() => {
            customDownload({
              route: BASE_API_URL_2026 + "/informes/director/excel",
              options: { method: "GET" },
              filename: "Entrega-resultados-director.csv",
            });
          }}
        />
        <Button
          text={"Excel Sostenedor"}
          style={{ width: "500px", textAlign: "center" }}
          action={() => {
            customDownload({
              route: BASE_API_URL_2026 + "/informes/sostenedor/excel",
              options: { method: "GET" },
              filename: "Entrega-resultados-sostenedores.csv",
            });
          }}
        />
      </CustomTabs>
      <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
        <TabGeneralResultados />
      </div>
    </ModulePageLayout>
  );
}
