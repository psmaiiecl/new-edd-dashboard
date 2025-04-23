import "./index.css";
import LockIcon from "../../assets/images/lock.svg";
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
      <div className="module-card__title">
        <span>{title}</span>
      </div>
      <div
        className={`module-card__content${locked ? " module-card__lock" : ""}`}
      >
        {loading ? <StandardLoadingPanel /> : <></>}
        {locked ? <img src={LockIcon} /> : children}
      </div>
    </div>
  );
}
