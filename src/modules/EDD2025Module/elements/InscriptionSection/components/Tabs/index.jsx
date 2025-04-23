import "./index.css";
import { Button } from "../../../../../../components/Button";
import { tabList } from "../../Data/TabList";

export function Tabs({ setActive, active }) {
  return (
    <div className="tab-container">
      <div className="tabs">
        {tabList.map((tab) => (
          <TabItem
            key={tab.index}
            isActive={tab.index === active}
            text={tab.label}
            setAsActive={() => setActive(tab.index)}
          />
        ))}
      </div>
      <div className="inscription-excel">
        <Button text={"Descargar Excel"} action={() => {}} />
      </div>
    </div>
  );
}

function TabItem({ isActive, text, setAsActive }) {
  return (
    <div
      className={`${isActive === true && "active"} tabs__tab`}
      onClick={setAsActive}
    >
      <span>{text}</span>
    </div>
  );
}
