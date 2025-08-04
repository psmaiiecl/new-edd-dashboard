import { tabList } from "../../data/TabList";
import { Button } from "../../../../../../components/Button";
import { useCustomDownload } from "../../../../../../hooks/useCustomDownload";
import { BASE_API_URL_2025 } from "../../../../data/BASE_API_URL";
import "./Tabs.css";
export function TabsProcesamiento({ setActive, active }) {
  const customDownload = useCustomDownload();
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
      <div className="tab__addOns">
        <div style={{ width: 100 }}></div>
        <Button
          text={"Excel Docente"}
          action={() => {
            customDownload(
              BASE_API_URL_2025 + "/2025-procesamiento-excel",
              { method: "POST" },
              "procesamiento_sd.csv"
            );
          }}
        />
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
