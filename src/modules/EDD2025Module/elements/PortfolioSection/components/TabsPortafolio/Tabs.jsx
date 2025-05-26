import { tabList } from "../../data/TabList";
import { Button } from "../../../../../../components/Button";

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
      <div className="inscription-excel">
        <Button text={"Excel Docente"} action={() => { }} />
        <Button text={"Excel Sostenedor"} action={() => { }} />
      </div>
    </div>
  );
}

function TabItem({ isActive, text, setAsActive }) {
  return (
    <div
      className={`tabs__tab ${isActive ? "active" : ""}`}
      onClick={setAsActive}
    >
      <span>{text}</span>
    </div>
  );
}
