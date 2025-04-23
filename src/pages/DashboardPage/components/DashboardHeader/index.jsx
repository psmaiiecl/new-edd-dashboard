import "./index.css";
import { useNavigate } from "react-router";
import Select from "react-select";
import { Button } from "../../../../components/Button";
import { BackButton } from "../../../../components/BackButton";

export function DashboardHeader({
  selectedModule,
  setSelectedModule,
  moduleOptions,
}) {
  const navigate = useNavigate();

  return (
    <nav className="dashboard-header">
      <BackButton />
      <span className="roboto-bold dashboard-header__title">
        Evaluación del Desempeño Docente
      </span>
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
  );
}
