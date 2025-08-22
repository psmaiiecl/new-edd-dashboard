import { TabContent } from "../../../../../../components/Layout/TabContent";
import { SelectorItems } from "../../data/SelectorItems";
import useTabCuotas from "./hooks/useTabCuotas";
import Select from "react-select";

function TabCuotas() {
  const { tableData, selectorCentros, filters, handleFilter } = useTabCuotas();

  return (
    <TabContent>
      {tableData.resumen && (
        <div style={{ maxWidth: "100%", overflowX: "scroll" }}>
          <table className="roboto-regular">
            <thead>
              <tr>
                <th rowSpan={2} style={{ backgroundColor: "#5197d1ff" }}>
                  Centro
                </th>
                <th rowSpan={2} style={{ backgroundColor: "#5197d1ff" }}>
                  Total de Postulaciones
                </th>
                <th colSpan={5} style={{ backgroundColor: "#5197d1ff" }}>
                  Correctores
                </th>
                <th colSpan={3} style={{ backgroundColor: "#5197d1ff" }}>
                  Supervisdores
                </th>
                <th rowSpan={2} style={{ backgroundColor: "#f5f831ff" }}>
                  Lista de Espera
                </th>
              </tr>
              <tr>
                <th style={{ backgroundColor: "var(--blue-10)" }}>
                  Correctores +30%
                </th>
                <th style={{ backgroundColor: "var(--blue-10)" }}>
                  Correctores +10%
                </th>
                <th style={{ backgroundColor: "var(--blue-10)" }}>
                  Correctores
                </th>
                <th style={{ backgroundColor: "var(--blue-10)" }}>
                  Seleccionados
                </th>
                <th style={{ backgroundColor: "var(--blue-10)" }}>
                  % Seleccionados
                </th>
                <th style={{ backgroundColor: "var(--blue-10)" }}>
                  Requeridos
                </th>
                <th style={{ backgroundColor: "var(--blue-10)" }}>
                  Seleccionados
                </th>
                <th style={{ backgroundColor: "var(--blue-10)" }}>
                  % Seleccionados
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.resumen.map((item, index) => (
                <tr key={index}>
                  <td>{item.centro}</td>
                  <td>{item.total_postulaciones}</td>
                  <td>{item.c_30}</td>
                  <td>{item.c_10}</td>
                  <td>{item.c_correctores}</td>
                  <td>{item.c_seleccionados}</td>
                  <td style={{ backgroundColor: "#88ee84ff" }}>
                    {item.c_porcentaje_seleccionados}
                  </td>
                  <td>{item.s_requeridos}</td>
                  <td>{item.s_seleccionados}</td>
                  <td style={{ backgroundColor: "#88ee84ff" }}>
                    {item.s_porcentaje_seleccionados}
                  </td>
                  <td>{item.lista_espera}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <br />
      <hr />
      <div className="tab-general-filter-row">
        <div className="tab-general-filter">
          <span>Filtro por Centro: </span>
          <Select
            value={filters?.centro || null}
            onChange={(option) => handleFilter("centro", option)}
            options={selectorCentros}
            isSearchable
            noOptionsMessage={() => "Ningún centro"}
            placeholder="Seleccione un centro"
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
        {filters?.centro && (
          <div className="tab-general-filter">
            <span>Filtro por Módulo: </span>
            <Select
              value={filters?.modulo || null}
              onChange={(option) => handleFilter("modulo", option)}
              options={SelectorItems.modulos}
              isSearchable
              noOptionsMessage={() => "Ningún módulo"}
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
        )}
      </div>
      {tableData.filtrado && (
        <div style={{ maxWidth: "100%", overflowX: "scroll" }}>
          <table className="roboto-regular">
            <thead>
              <tr>
                <th colSpan={3} style={{ backgroundColor: "#5197d1ff" }}>
                  {tableData.filtrado?.centro || "Centro"}
                </th>
                <th rowSpan={2} style={{ backgroundColor: "#5197d1ff" }}>
                  Postulantes Totales
                </th>
                <th rowSpan={2} style={{ backgroundColor: "#5197d1ff" }}>
                  Seleccionables
                </th>
                <th colSpan={4} style={{ backgroundColor: "#5197d1ff" }}>
                  Correctores
                </th>
                <th colSpan={2} style={{ backgroundColor: "#5197d1ff" }}>
                  Supervisdores
                </th>
                <th rowSpan={2} style={{ backgroundColor: "#f5f831ff" }}>
                  Lista de Espera
                </th>
                <th rowSpan={2}>Nombre EdS</th>
              </tr>
              <tr>
                <th style={{ backgroundColor: "var(--blue-10)" }}>Módulo</th>
                <th style={{ backgroundColor: "var(--blue-10)" }}>
                  Especialidad
                </th>
                <th style={{ backgroundColor: "var(--blue-10)" }}>
                  No. Correcciones
                </th>
                <th style={{ backgroundColor: "var(--blue-10)" }}>
                  Correctores +30%
                </th>
                <th style={{ backgroundColor: "var(--blue-10)" }}>
                  Correctores +10%
                </th>
                <th style={{ backgroundColor: "var(--blue-10)" }}>
                  Correctores
                </th>
                <th style={{ backgroundColor: "var(--blue-10)" }}>
                  Seleccionados
                </th>
                <th style={{ backgroundColor: "var(--blue-10)" }}>
                  Requeridos
                </th>
                <th style={{ backgroundColor: "var(--blue-10)" }}>
                  Seleccionados
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      )}
    </TabContent>
  );
}

export default TabCuotas;
