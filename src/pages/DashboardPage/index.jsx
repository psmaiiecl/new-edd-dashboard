import "./index.css";
import Select from "react-select";
import { Outlet, useNavigate } from "react-router";
import { useState } from "react";

export function DashboardPage() {
  const navigate = useNavigate();
  const moduleOptions = [
    { label: "2024", value: 2024 },
    { label: "2025", value: 2025 },
  ];
  const [selectedModule, setSelectedModule] = useState(
    moduleOptions.find((m) => m.value === new Date().getFullYear()) ||
      moduleOptions[0]
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
        <Outlet />
      </article>
    </>
  );
}
