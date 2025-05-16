import "./index.css";
import { Route, Routes, useParams } from "react-router";
import { useState } from "react";
import { EDD2024Module } from "../../modules/EDD2024Module";
import { EDD2025Module } from "../../modules/EDD2025Module";
import { InscriptionSection2025 } from "../../modules/EDD2025Module/elements/InscriptionSection";
import { PortfolioSection2025 } from "../../modules/EDD2025Module/elements/PortfolioSection";
import { DashboardHeader } from "./components/DashboardHeader";
import { ValidationSection2025 } from "../../modules/EDD2025Module/elements/ValidationSection";

export function DashboardPage() {
  const { year } = useParams();

  const moduleOptions = [
    { label: "2025", value: "2025" },
    { label: "2024", value: "2024" },
  ];
  const [selectedModule, setSelectedModule] = useState(
    () => moduleOptions.find((m) => m.value === year) || moduleOptions[0]
  );

  return (
    <>
      <DashboardHeader
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        moduleOptions={moduleOptions}
      />
      <article className="dashboard-module">
        <Routes>
          {selectedModule.value === "2024" && (
            <Route path="/" element={<EDD2024Module />}></Route>
          )}
          {selectedModule.value === "2025" && (
            <Route path="/" element={<EDD2025Module />}>
              <Route path="inscripcion" element={<InscriptionSection2025 />} />
              <Route path="validacion" element={<ValidationSection2025 />} />
              <Route path="portafolio" element={<PortfolioSection2025 />} />
            </Route>
          )}
        </Routes>
      </article>
    </>
  );
}
