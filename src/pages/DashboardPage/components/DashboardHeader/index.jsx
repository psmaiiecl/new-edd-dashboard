import "./index.css";
import { useNavigate } from "react-router";
import Select from "react-select";
import { Button } from "../../../../components/Button";
import { BackButton } from "../../../../components/BackButton";
import { AuthContext } from "../../../../context/AuthContext";
import { useContext } from "react";

export function DashboardHeader({
  selectedModule,
  setSelectedModule,
  moduleOptions,
}) {
  const navigate = useNavigate();
  const { getTipoUsuario } = useContext(AuthContext);

  return (
    <header className="dashboard-header">
      <div className="dashboard-header__left">
        <BackButton />

        <div className="dashboard-header__title-group roboto-bold">
          <span className="dashboard-header__title">
            Evaluación del Desempeño Docente
          </span>
          <span className="dashboard-header__subtitle">
            Dashboard EDD - {selectedModule?.value}
          </span>
        </div>
      </div>

      <div className="dashboard-header__right roboto-regular">
        <Select
          isDisabled={getTipoUsuario() === 5}
          value={selectedModule}
          onChange={(option) => {
            setSelectedModule(option);
            navigate(`/dashboard/${option.value}`);
          }}
          options={moduleOptions}
          isSearchable={false}
          className="roboto-regular"
          menuPosition="fixed"
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
          <Button text={"Cerrar Sesión"} action={() => navigate("/")} />
        </div>
      </div>

      <div className="dashboard-header__accent" />
    </header>
  );
}
