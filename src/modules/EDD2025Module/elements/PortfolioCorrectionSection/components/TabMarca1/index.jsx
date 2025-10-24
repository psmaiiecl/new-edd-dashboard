import "./style.css";
import { Button } from "../../../../../../components/Button";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import Select from "react-select";
import { flujos } from "./data/selectorLists";
import { useTab } from "./hooks/useTab";

export function TabMarca1() {
  const { selectedFilter, handleFilter, data } = useTab();
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
          <Button text={"Limpiar Filtros"} action={() => {}} />
          <Button text={"Excel"} action={() => {}} />
        </div>
      </div>
      <div className="counter-title-container roboto-regular">
        <span className="roboto-bold">{selectedFilter.flujo.title}</span>
        <span>Contabilizador de discrepancias</span>
      </div>
      <div className="normal-container">
        <div
          className={
            selectedFilter.flujo.value == "GENERAL_M2" ? "pie-grid-2" : ""
          }
        >
          {selectedFilter.flujo.value == "GENERAL_M2" && (
            <div className="roboto-regular">
              <span> Por Centro </span>
              <table>
                <thead className="roboto-regular">
                  <tr>
                    <th>Centro</th>
                    <th>Conteo</th>
                  </tr>
                </thead>
                <tbody className="roboto-regular">
                  <tr>
                    <th>UDP</th>
                    <th>2</th>
                  </tr>
                  <tr>
                    <th>UDEC</th>
                    <th>5</th>
                  </tr>
                  <tr>
                    <th>ULS</th>
                    <th>3</th>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <div className="big-counter-container">
            <span className="roboto-regular">
              Total Discrepancias
            </span>
            <div className="big-counter-number ">
              <span className="roboto-bold">32</span>
            </div>
            
          </div>
        </div>
      </div>
    </TabContent>
  );
}
