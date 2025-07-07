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
        <Button
          text={"Excel Docente"}
          action={() =>
            window.open(
              "https://resultados-ee-2024.iie.cl/resultados_api/documentos/informe-sostenedores/excel-sostenedores.csv",
              "_blank"
            )
          }
        />
       <Button
          text={"Excel Sostenedor"}
          action={() =>
            window.open(
              "https://resultados-ee-2024.iie.cl/resultados_api/documentos/informe-sostenedores/excel-establecimientos.csv",
              "_blank"
            )
          }
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
