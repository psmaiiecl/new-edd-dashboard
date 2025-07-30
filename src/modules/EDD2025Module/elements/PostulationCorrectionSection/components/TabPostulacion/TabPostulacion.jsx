import { tabList } from "../../../../../data/TabList";
import { Button } from "../../../../../../components/Button";
import { useCustomDownload } from "../../../../../../hooks/useCustomDownload";
import { BASE_API_URL_2025 } from "../../../../data/BASE_API_URL";

export function TabsPostulacion({ setActive, active }) {
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
            <div className="postulacion-excel">
                <Button
                    text={"Descargar Excel"}
                    action={() => {
                        customDownload(
                            BASE_API_URL_2025 + "/2025-portafolio-excel-docente",
                            { method: "POST" },
                            "portafolio-docente.csv"
                        );
                    }}
                />
                {/* <Button
                    text={"Excel Sostenedor"}
                    action={() => {
                        customDownload(
                            BASE_API_URL_2025 + "/2025-portafolio-excel-sostenedor",
                            { method: "POST" },
                            "portafolio-sostenedores.csv"
                        );
                    }}
                /> */}
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
