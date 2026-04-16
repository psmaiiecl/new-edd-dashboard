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
import { PortfolioCorrectionSection2025 } from "../../modules/EDD2025Module/elements/PortfolioCorrectionSection";
import { ProcessingSection2025 } from "../../modules/EDD2025Module/elements/ProcessingSection";
import { PostulationSection2025 } from "../../modules/EDD2025Module/elements/PostulationSection";
import { RouteProtector } from "../../components/RouteProtector";
import EDD2026Module from "../../modules/EDD2026Module";
import LegalRepresentative2026 from "../../modules/EDD2026Module/elements/LegalRepresentative";

export function DashboardPage() {
  const { year } = useParams();

  const moduleOptions = [
    { label: "2026", value: "2026" },
    { label: "2025", value: "2025" },
    { label: "2024", value: "2024" },
  ];
  const [selectedModule, setSelectedModule] = useState(
    () => moduleOptions.find((m) => m.value === year)
    // () => moduleOptions.find((m) => m.value === year) || moduleOptions[0]
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
            <Route
              path="/"
              element={
                <RouteProtector excludedRoles={[5, 6, 7, 8, 9]}>
                  <EDD2024Module />
                </RouteProtector>
              }
            ></Route>
          )}
          {selectedModule.value === "2025" && (
            <Route path="/" element={<EDD2025Module />}>
              <Route
                path="inscripcion"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <InscriptionSection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="validacion"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <ValidationSection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="portafolio"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <PortfolioSection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="resultados"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <ResultSection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="agendamiento-grabaciones"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <RecordSchedulingSection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="grabaciones"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <RecordSection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="recuperacion-sd"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <SDRecoverySection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="procesamiento-sd"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <ProcessingSection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="correccion-postulaciones"
                element={
                  <RouteProtector excludedRoles={[6]}>
                    <PostulationSection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="correccion-portafolios"
                element={
                  <RouteProtector excludedRoles={[5]}>
                    <PortfolioCorrectionSection2025 />
                  </RouteProtector>
                }
              />
            </Route>
          )}
          {selectedModule.value === "2026" && (
            <Route path="/" element={<EDD2026Module />}>
              <Route
                path="representantes-legales"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <LegalRepresentative2026 />
                  </RouteProtector>
                }
              />
              {/* <Route
                path="inscripcion"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <InscriptionSection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="validacion"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <ValidationSection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="portafolio"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <PortfolioSection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="resultados"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <ResultSection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="agendamiento-grabaciones"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <RecordSchedulingSection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="grabaciones"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <RecordSection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="recuperacion-sd"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <SDRecoverySection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="procesamiento-sd"
                element={
                  <RouteProtector excludedRoles={[5, 6]}>
                    <ProcessingSection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="correccion-postulaciones"
                element={
                  <RouteProtector excludedRoles={[6]}>
                    <PostulationSection2025 />
                  </RouteProtector>
                }
              />
              <Route
                path="correccion-portafolios"
                element={
                  <RouteProtector excludedRoles={[5]}>
                    <PortfolioCorrectionSection2025 />
                  </RouteProtector>
                }
              /> */}
            </Route>
          )}
        </Routes>
      </article>
    </>
  );
}
