import "./index.css";
import { tabList } from "../../data/TabList";
import { Button } from "../../../../../../components/Button";
import {
  getExcelDocente,
  getExcelSostenedor,
} from "../../../../services/ValidationServices";
import { useContext } from "react";
import { LoadingContext } from "../../../../../../context/LoadingContext";

export function Tabs({ setActive, active }) {
  const { queueLoading, dequeueLoading } = useContext(LoadingContext);
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
        <Button
          text={"Excel Docente"}
          action={() => {
            queueLoading();
            getExcelDocente(dequeueLoading);
          }}
        />
        <Button
          text={"Excel Sostenedor"}
          action={() => {
            queueLoading();
            getExcelSostenedor(dequeueLoading);
          }}
        />
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
