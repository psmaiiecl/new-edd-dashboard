import { tabList } from "../../data/TabList";
import "./Tabs.css";

export function TabsPortafolio({ setActive, active }) {
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
