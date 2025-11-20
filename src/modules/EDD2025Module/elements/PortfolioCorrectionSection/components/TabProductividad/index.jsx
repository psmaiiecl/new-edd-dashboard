import { TabContent } from "../../../../../../components/Layout/TabContent";
import Select from "react-select";
import { useTab } from "./hooks/useTab";
import { useCustomDownload } from "../../../../../../hooks/useCustomDownload";
import { BASE_API_URL_2025 } from "../../../../data/BASE_API_URL";
import { Button } from "../../../../../../components/Button";
import { SELECT_STYLES } from "../../../../../../constants/CONST";

export function TabProductividad() {
  const customDownload = useCustomDownload();
  const { selectedFilter, handleFilter, tableData, filterItems, clearFilters } =
    useTab();
  return (
    <TabContent>
      <div className="tab-general-filter-row">
        <div className="tab-general-filter">
          <span>Seleccione módulo: </span>
          <Select
            value={selectedFilter.modulo}
            onChange={(option) => handleFilter("modulo", option)}
            options={filterItems.modulo}
            isSearchable
            noOptionsMessage={() => "Ningun módulo"}
            placeholder="Seleccione un módulo"
            styles={SELECT_STYLES}
          />
        </div>
        <div className="tab-general-filter">
          <span>Seleccione fecha: </span>
          <Select
            value={selectedFilter.fecha}
            onChange={(option) => handleFilter("fecha", option)}
            options={filterItems.fecha}
            isSearchable
            noOptionsMessage={() => "Ninguna fecha"}
            placeholder="Seleccione una fecha"
            styles={SELECT_STYLES}
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
          <Button text={"Limpiar Filtros"} action={() => clearFilters()} />
          <Button
            text={"Excel"}
            action={() => {
              customDownload({
                route:
                  BASE_API_URL_2025 + "/2025-cpf-monitoreo-productividad-excel",
                options: { method: "GET" },
                filename: "correccion_portafolios_productividad.xlsx",
              });
            }}
          />
        </div>
      </div>
      <div className="normal-container">
        <div style={{ maxWidth: "100%", overflowX: "scroll", width: "100%" }}>
          <table className="roboto-regular">
            <thead>
              <tr>
                <th style={{ backgroundColor: "#5197d1ff" }}>Especialidad</th>
                <th style={{ backgroundColor: "#5197d1ff" }}>Módulo</th>
                <th style={{ backgroundColor: "#5197d1ff" }}>Total</th>
                <th style={{ backgroundColor: "#5197d1ff" }}>Total CdC</th>
                <th style={{ backgroundColor: "#5197d1ff" }}>Planificación</th>
                <th style={{ backgroundColor: "#5197d1ff" }}>Corregido</th>
                <th style={{ backgroundColor: "#5197d1ff" }}>% Planificado</th>
                <th style={{ backgroundColor: "#5197d1ff" }}>% del total</th>
                <th style={{ backgroundColor: "#5197d1ff" }}>
                  % del total CdC
                </th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((row, index) => {
                return (
                  <tr key={(row?.especialidad + row?.modulo + row?.fecha)||index+"prod"}>
                    <td>{row?.especialidad}</td>
                    <td>{row?.modulo}</td>
                    <td>{row?.total}</td>
                    <td>{row?.cdc}</td>
                    <td>{row?.planificacion}</td>
                    <td>{row?.corregido}</td>
                    <td>{row?.porcentaje_planificacion}%</td>
                    <td>{row?.porcentaje_total}%</td>
                    <td>{row?.porcentaje_total_cdc}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </TabContent>
  );
}
