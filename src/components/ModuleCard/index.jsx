import "./index.css";
import LockIcon from "../../assets/images/lock.svg";

export function ModuleCard({ title, action, children, locked = false }) {
  return (
    <div className={`roboto-regular module-card ${locked ? '' : 'active'}`} onClick={action}>
      <div className="module-card__title">
        <span>{title}</span>
      </div>
      <div className={ `module-card__content${locked ? " module-card__lock" : ""}`}>
        {locked ? <img src={LockIcon} /> : children}
      </div>
    </div>
  );
}
