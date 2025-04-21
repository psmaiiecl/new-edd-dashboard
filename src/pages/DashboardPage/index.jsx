import "./index.css";
import Select from "react-select";
import { Route, Routes, useNavigate, useParams } from "react-router";
import { useState } from "react";
import { EDD2024Module } from "../../modules/EDD2024Module";
import { EDD2025Module } from "../../modules/EDD2025Module";
import { InscriptionSection2025 } from "../../modules/EDD2025Module/elements/InscriptionSection";
import { Button } from "../../components/Button";

export function DashboardPage() {
  const navigate = useNavigate();
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
      <nav className="dashboard-header">
        <span className="roboto-bold">Evaluación del Desempeño Docente</span>
        <Select
          className="roboto-regular"
          value={selectedModule}
          onChange={(option) => {
            setSelectedModule(option);
            navigate(`/dashboard/${option.value}`);
          }}
          options={moduleOptions}
          isSearchable={false}
          noOptionsMessage={() => "Ningún módulo"}
          placeholder="Seleccione una módulo"
          styles={{
            control: (base) => ({
              ...base,
              fontSize: "13px",
              padding: "0px 10px ",
            }),
            option: (base) => ({
              ...base,
              fontSize: "13px",
              color: "black",
            }),
          }}
        />
        <div className="dashboard-logout">
          <Button
            text={"Cerrar Sesión"}
            action={() => {
              navigate("/");
            }}
          />
        </div>
      </nav>
      <article className="dashboard-module">
        <Routes>
          {selectedModule.value === "2024" && (
            <Route path="/" element={<EDD2024Module />}></Route>
          )}
          {selectedModule.value === "2025" && (
            <Route path="/" element={<EDD2025Module />}>
              <Route path="inscripcion" element={<InscriptionSection2025 />} />
            </Route>
          )}
        </Routes>
      </article>
    </>
  );
}
