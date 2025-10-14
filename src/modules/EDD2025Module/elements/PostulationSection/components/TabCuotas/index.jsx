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
                <th rowSpan={2} style={{ backgroundColor: "#5197d1ff" }}>
                  Preseleccionados
                </th>
                <th colSpan={5} style={{ backgroundColor: "#5197d1ff" }}>
                  Correctores
                </th>
                <th colSpan={3} style={{ backgroundColor: "#5197d1ff" }}>
                  Supervisores
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
                  <td>{item?.centro}</td>
                  <td>{item?.cantidad_postulaciones_total}</td>
                  <td>{item?.preseleccionados}</td>
                  <td>{item?.crr30}</td>
                  <td>{item?.crr10}</td>
                  <td>{item?.crr}</td>
                  <td>
                    {item?.cantidad_correctores_seleccionados}{" "}
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor:
                          item?.cantidad_correctores_seleccionados >= item?.crr
                            ? "green"
                            : "red",
                        marginLeft: "6px",
                      }}
                    />
                  </td>
                  <td
                    style={{
                      backgroundColor: getBackgroundColor(
                        item?.porcentaje_correctores
                      ),
                    }}
                  >
                    {item?.porcentaje_correctores}%
                  </td>
                  <td>{item?.srr}</td>
                  <td>
                    {item?.cantidad_supervisores_seleccionados}{" "}
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor:
                          item?.cantidad_supervisores_seleccionados >= item?.srr
                            ? "green"
                            : "red",
                        marginLeft: "6px",
                      }}
                    />
                  </td>
                  <td
                    style={{
                      backgroundColor: getBackgroundColor(
                        item?.porcentaje_supervisores
                      ),
                    }}
                  >
                    {item?.porcentaje_supervisores}%
                  </td>
                  <td>{item?.lista_espera}</td>
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
          <span className="roboto-light">
            {" "}
            *Seleccionable: postulante que aún no ha sido revisado/a, se
            mantiene en estado reclutado.
          </span>
          <table className="roboto-regular">
            <thead>
              <tr>
                <th colSpan={3} style={{ backgroundColor: "#5197d1ff" }}>
                  {"Centro: " + filters?.centro.label}
                </th>
                <th rowSpan={2} style={{ backgroundColor: "#5197d1ff" }}>
                  Postulantes Totales
                </th>
                <th rowSpan={2} style={{ backgroundColor: "#5197d1ff" }}>
                  Seleccionables
                </th>
                <th rowSpan={2} style={{ backgroundColor: "#5197d1ff" }}>
                  Preseleccionados
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
            <tbody>
              {tableData.filtrado.map((item, index) => (
                <tr key={index}>
                  <td>{item?.modulo}</td>
                  <td>{item?.especialidad}</td>
                  <td>{item?.cant_correcciones}</td>
                  <td>{item?.cantidad_postulaciones_total}</td>
                  <td>{item?.seleccionables}</td>
                  <td>{item?.preseleccionados}</td>
                  <td>{item?.crr30}</td>
                  <td>{item?.crr10}</td>
                  <td>{item?.crr}</td>
                  <td>{item?.cantidad_correctores_seleccionados}</td>
                  <td>{item?.srr}</td>
                  <td>{item?.cantidad_supervisores_seleccionados}</td>
                  <td>{item?.lista_espera}</td>
                  <td>{item?.eds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </TabContent>
  );
}

const getBackgroundColor = (percent) => {
  const value = parseFloat(percent);
  if (isNaN(value)) return "#ffffff";

  if (value < 25.0) return "#ff4d4d";
  if (value < 50.0) return "#ffa64d";
  if (value < 75.0) return "#ffff66";
  return "#66cc66";
};

export default TabCuotas;
