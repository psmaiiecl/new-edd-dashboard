import "./index.css";
import { Route, Routes, useParams } from "react-router";
import { useState } from "react";
import { EDD2024Module } from "../../modules/EDD2024Module";
import { EDD2025Module } from "../../modules/EDD2025Module";
import { InscriptionSection2025 } from "../../modules/EDD2025Module/elements/InscriptionSection";
import { PortfolioSection2025 } from "../../modules/EDD2025Module/elements/PortfolioSection";
import { ResultSection2025 } from "../../modules/EDD2025Module/elements/ResultSection";
import { DashboardHeader } from "./components/DashboardHeader";
import { ValidationSection2025 } from "../../modules/EDD2025Module/elements/ValidationSection";
import { SDRecoverySection2025 } from "../../modules/EDD2025Module/elements/SDRecoverySection";
import { RecordSchedulingSection2025 } from "../../modules/EDD2025Module/elements/RecordSchedulingSection";
import { RecordSection2025 } from "../../modules/EDD2025Module/elements/RecordSection";
// import { SDProcessingSection2025 } from "../../modules/EDD2025Module/elements/SDProcessingSection";
import { PostulationCorrectionSection2025 } from "../../modules/EDD2025Module/elements/PostulationCorrectionSection";
import { PortfolioCorrectionSection2025 } from "../../modules/EDD2025Module/elements/PortfolioCorrectionSection/Index";
import { ProcessingSection2025 } from "../../modules/EDD2025Module/elements/ProcessingSection";

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
              <Route path="resultados" element={<ResultSection2025 />} />
              <Route
                path="agendamiento-grabaciones"
                element={<RecordSchedulingSection2025 />}
              />
              <Route path="grabaciones" element={<RecordSection2025 />} />
              <Route
                path="recuperacion-sd"
                element={<SDRecoverySection2025 />}
              />
              <Route
                path="procesamiento-sd"
                element={<ProcessingSection2025 />}
              />
              <Route
                path="correccion-postulaciones"
                element={<PostulationCorrectionSection2025 />}
              />
              <Route
                path="correccion-portafolios"
                element={<PortfolioCorrectionSection2025 />}
              />
           
            </Route>
          )}
        </Routes>
      </article>
    </>
  );
}
