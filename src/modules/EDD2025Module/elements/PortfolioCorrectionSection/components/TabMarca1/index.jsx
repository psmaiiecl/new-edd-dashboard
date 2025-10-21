import "./style.css";
import { Button } from "../../../../../../components/Button";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import Select from "react-select";

export function TabMarca1() {
  return (
    <TabContent>
      <div className="normal-container">
        <div className="pie-grid-2">
          <div className="big-counter-container">
            <span className="roboto-regular">
              Contabilizador de correcciones EA
            </span>
            <div className="big-counter-number ">
              <span className="roboto-bold">15</span>
            </div>
            <div className="big-counter-button">
              <Button text={"Descargar Excel"} />
            </div>
          </div>
          <div className="big-counter-container">
            <span className="roboto-regular">
              Contabilizador de correcciones PARVULARIA M2
            </span>
            <div className="big-counter-number ">
              <span className="roboto-bold">20</span>
            </div>
            <div className="big-counter-button">
              <Button text={"Descargar Excel"} />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="tab-general-filter-row">
        <div className="tab-general-filter">
          <span>Seleccione módulo: </span>
          <Select
            // value={selectedFilter.modulo}
            // onChange={(option) => handleFilter("modulo", option)}
            // options={filterItems.modulo}
            isSearchable
            noOptionsMessage={() => "Ningun módulo"}
            placeholder="Seleccione un módulo"
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
        <div className="tab-general-filter">
          <span>Seleccione nivel: </span>
          <Select
            // value={selectedFilter.nivel}
            // onChange={(option) => handleFilter("nivel", option)}
            // options={filterItems.nivel}
            isSearchable
            noOptionsMessage={() => "Ningun nivel"}
            placeholder="Seleccione un nivel"
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
      <div className="normal-container">
        <div>
          <div className="big-counter-container">
            <span className="roboto-regular">
              Contabilizador de correcciones cantidad de estudiantes
            </span>
            <div className="big-counter-number ">
              <span className="roboto-bold">32</span>
            </div>
            <div className="big-counter-button">
              <Button text={"Descargar Excel"} />
            </div>
          </div>
        </div>
      </div>
    </TabContent>
  );
}
