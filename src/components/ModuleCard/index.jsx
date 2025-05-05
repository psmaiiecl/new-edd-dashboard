import "./index.css";
import ConeIcon from "../../assets/images/cone.svg";
import { StandardLoadingPanel } from "../../components/StandardLoadingPanel";

export function ModuleCard({
  title,
  action,
  children,
  locked = false,
  loading = false,
}) {
  return (
    <div
      className={`roboto-regular module-card ${locked ? "" : "active"}`}
      onClick={() => {
        if (!locked) action();
      }}
    >
      <div className={`module-card__title${locked ? " module-card__title-locked" : ""}`}>
        <span>{title}</span>
      </div>
      <div
        className={`module-card__content${locked ? " module-card__lock" : ""}`}
      >
        {loading ? <StandardLoadingPanel /> : <></>}
        {locked ? <><img src={ConeIcon} /><span className="roboto-regular">Módulo en construcción</span></> : children}
      </div>
    </div>
  );
}
