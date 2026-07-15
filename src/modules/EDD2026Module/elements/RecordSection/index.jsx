import { useContext, useState } from "react";
import { tabList } from "./data/TabList";
import { ModulePageLayout } from "../../../../components/Layout/ModulePageLayout";
import { CustomTabs } from "../../../../components/CustomTabs";
import { TabGeneral } from "./components/TabGeneral";
import { TabCTG } from "./components/TabCTG";
import { TabDependencia } from "./components/TabDependencia";
import { TabConvocatoria } from "./components/TabConvocatoria";
import { TabRegion } from "./components/TabRegion";
import { useCustomDownload } from "../../../../hooks/useCustomDownload";
import { useQuickSightEmbed } from "../../../../hooks/useQuickSightEmbed";
import { BASE_API_URL_2026 } from "../../../../constants/BASE_API_URL";
import { Button } from "../../../../components/Button";
import { AuthContext } from "../../../../context/AuthContext";
import { canSeeByRole } from "../../../../utils/roleAccess";
import BuildingPanel from "../../../../components/BuildingPanel";

const QUICKSIGHT_DASHBOARD_ID_GRABACIONES =  "1335e849-813b-47b0-9b7f-4994aae32843";
const QUICKSIGHT_DASHBOARD_ID_ACREDITACION = "f6723eac-7ddb-4382-8893-87005c4f5807";

// Roles a excluir/permitir para los botones de QuickSight — completar cuando se defina la política de acceso
const QUICKSIGHT_ROLE_ACCESS = { excludedRoles: [], permittedRoles: [1] };

export function RecordSection2026() {
  const [activeTab, setActiveTab] = useState("tab1");
  const customDownload = useCustomDownload();
  const { openDashboard } = useQuickSightEmbed();
  const { getTipoUsuario } = useContext(AuthContext);
  const tipoUsuario = getTipoUsuario();

  return (
    <ModulePageLayout>
      <CustomTabs
        setActiveFn={setActiveTab}
        currentActive={activeTab}
        // tabArray={tabList}
        tabArray={[]}
      >
        {/* <Button
          text={"Excel Docente"}
          action={() => {
            customDownload({
              route: BASE_API_URL_2026 + "/grabaciones/docente/excel",
              options: { method: "GET" },
              filename: "grabacion-docentes.csv",
            });
          }}
        /> */}
        {canSeeByRole(tipoUsuario, QUICKSIGHT_ROLE_ACCESS) &&
          activeTab === "tab1" && (
            <>
              <Button
                text={"Quicksight Grabaciones"}
                variant="quicksight"
                action={() =>
                  openDashboard(QUICKSIGHT_DASHBOARD_ID_GRABACIONES)
                }
              />
              <Button
                text={"Quicksight Acreditación"}
                variant="quicksight"
                action={() =>
                  openDashboard(QUICKSIGHT_DASHBOARD_ID_ACREDITACION)
                }
              />
            </>
          )}
      </CustomTabs>
      <BuildingPanel />
      {/* <div style={{ display: activeTab === "tab1" ? "block" : "none" }}>
        <TabGeneral />
      </div>
      <div style={{ display: activeTab === "tab2" ? "block" : "none" }}>
        <TabCTG />
      </div>
      <div style={{ display: activeTab === "tab3" ? "block" : "none" }}>
        <TabDependencia />
      </div>
      <div style={{ display: activeTab === "tab4" ? "block" : "none" }}>
        <TabConvocatoria />
      </div>
      <div style={{ display: activeTab === "tab5" ? "block" : "none" }}>
        <TabRegion />
      </div> */}
    </ModulePageLayout>
  );
}
