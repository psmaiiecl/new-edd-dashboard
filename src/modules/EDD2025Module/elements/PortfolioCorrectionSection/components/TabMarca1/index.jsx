import "./style.css";
import { Button } from "../../../../../../components/Button";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import Select from "react-select";
import { flujos } from "./data/selectorLists";
import { useTab } from "./hooks/useTab";
import { useCustomDownload } from "../../../../../../hooks/useCustomDownload";
import { BASE_API_URL_2025 } from "../../../../data/BASE_API_URL";

export function TabMarca1() {
  const { selectedFilter, handleFilter, data, resetFilter } = useTab();
  const customDownload = useCustomDownload();
  return (
    <TabContent>
      <div className="tab-general-filter-row">
        <div className="tab-general-filter">
          <span>Seleccione flujo: </span>
          <Select
            value={selectedFilter.flujo}
            onChange={(option) => handleFilter("flujo", option)}
            options={flujos}
            isSearchable
            noOptionsMessage={() => "Ningun flujo"}
            placeholder="Seleccione un flujo"
            styles={{
              control: (base) => ({
                ...base,
                fontSize: "13px",
                padding: "0px 10px ",
              }),
              option: (base) => ({
                ...base,
                fontSize: "13px",
                color: "black",
              }),
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "5px",
            boxSizing: "border-box",
            alignSelf: "end",
          }}
        >
          <Button text={"Limpiar Filtros"} action={resetFilter} />
          <Button
            text={"Excel"}
            action={() => {
              customDownload({
                route:
                  BASE_API_URL_2025 + "/2025-correccion-pf-excel-discrepancias",
                options: { method: "GET" },
                filename: `HISTORIAL_DISCREPANCIAS.csv`,
              });
            }}
          />
        </div>
      </div>
      <div className="counter-title-container roboto-regular">
        <span className="roboto-bold">{selectedFilter.flujo.title}</span>
        <span>Contabilizador de discrepancias</span>
      </div>
      <div className="normal-container">
        <div
          className={
            data.detalles?.[selectedFilter.flujo.value] ? "pie-grid-2" : ""
          }
        >
          {data.detalles?.[selectedFilter.flujo.value] && (
            <div className="roboto-regular flujo-centros-container">
              <span> Conteo por Centro </span>
              <table className="flujo-centros-container-table">
                <thead className="roboto-regular">
                  <tr>
                    <th>Centro</th>
                    <th>Cantidad Discrepancias</th>
                  </tr>
                </thead>
                <tbody className="roboto-regular">
                  {data.detalles?.[selectedFilter.flujo.value].map(
                    (item, index) => (
                      <tr key={selectedFilter.flujo.value + index}>
                        <td>{item?.cdc ?? "-"}</td>
                        <td>{item?.cantidad_discrepancias ?? "-"}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
          <div className="big-counter-container">
            <span className="roboto-regular">Total Incidencias</span>
            <div className="big-counter-number ">
              <span className="roboto-bold">
                {data.totales?.[selectedFilter.flujo.value] ?? "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </TabContent>
  );
}
