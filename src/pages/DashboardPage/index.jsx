import { useState } from "react";
import Select from "react-select";
import "./index.css";
import { EDD2024Module } from "../../modules/EDD2024Module";
import { EDD2025Module } from "../../modules/EDD2025Module";

export function DashboardPage() {
  const [module, setModule] = useState({ label: "2024", value: "2024" });
  return (
    <>
      <nav className="dashboard-header">
        <span className="roboto-bold">Evaluación del Desempeño Docente</span>
        <Select
          className="roboto-regular"
          value={module}
          onChange={(option) => setModule(option)}
          options={[
            { label: "2024", value: "2024" },
            { label: "2025", value: "2025" },
          ]}
          isSearchable
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
      </nav>
      <article className="dashboard-module">
        {module.value === "2024" && <EDD2024Module />}
        {module.value === "2025" && <EDD2025Module />}
      </article>
    </>
  );
}
