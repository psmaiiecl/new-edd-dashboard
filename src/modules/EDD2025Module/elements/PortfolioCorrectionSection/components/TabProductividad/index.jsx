import { TabContent } from "../../../../../../components/Layout/TabContent";
import Select from "react-select";
import { useTab } from "./hooks/useTab";
import { useCustomDownload } from "../../../../../../hooks/useCustomDownload";
import { BASE_API_URL_2025 } from "../../../../data/BASE_API_URL";
import { Button } from "../../../../../../components/Button";
import { SELECT_STYLES } from "../../../../../../constants/CONST";
import { modulos } from "../../data/selectorLists";
import { useMemo } from "react";

export function TabProductividad() {
  const customDownload = useCustomDownload();
  const { selectedFilter, handleFilter, tableData, filterItems, clearFilters } =
    useTab();
  const dateOptions = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const options = [];
    const endDay = today.getDate();

    for (let day = 2; day <= endDay; day++) {
      const d = new Date(year, month, day);
      const value = d.toISOString().slice(0, 10);

      options.push({
        value,
        label: d.toLocaleDateString("es-CL"),
      });
    }

    return options;
  }, []);
  return (
    <TabContent>
      <div className="tab-general-filter-row">
        <div className="tab-general-filter">
          <span>Seleccione módulo: </span>
          <Select
            value={selectedFilter.modulo}
            onChange={(option) => handleFilter("modulo", option)}
            options={modulos}
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
            options={dateOptions}
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
                <th style={{ backgroundColor: "#5197d1ff" }}>Módulo</th>
                <th style={{ backgroundColor: "#5197d1ff" }}>Especialidad</th>
                <th style={{ backgroundColor: "#5197d1ff" }}>Total Crr</th>
                <th style={{ backgroundColor: "#5197d1ff" }}>
                  Total Corregido
                </th>
                <th style={{ backgroundColor: "#5197d1ff" }}>
                  Corregido Semanal
                </th>
                <th style={{ backgroundColor: "#5197d1ff" }}>% avance</th>
                <th style={{ backgroundColor: "#5197d1ff" }}>Tasa Avance</th>
                <th style={{ backgroundColor: "#5197d1ff" }}>Fecha Estimada</th>
                <th style={{ backgroundColor: "#5197d1ff" }}>Alerta</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((row, index) => {
                return (
                  <tr key={row?.especialidad + row?.modulo || index + "prod"}>
                    <td>{row?.modulo}</td>
                    <td>{row?.especialidad}</td>
                    <td>{row?.total_correcciones_esperadas}</td>
                    <td>{row?.correcciones_realizadas_total}</td>
                    <td>{row?.correcciones_realizadas_7_dias}</td>
                    <td
                      style={{
                        backgroundColor: getBackgroundColor(
                          row?.porcentaje_avance
                        ),
                      }}
                    >
                      {row?.porcentaje_avance}%
                    </td>
                    <td>{row?.tasa_diaria} crr/dia</td>
                    <td>{row?.fecha_estimada_termino ?? "-"}</td>
                    <td
                      style={{
                        backgroundColor:
                          row?.alerta === "Alerta"
                            ? "#f08181ff"
                            : row?.alerta === "Fuera de Plazo"
                            ? "#f3b562"
                            : row?.alerta === "En Curso"
                            ? "#fff3a0"
                            : row?.alerta === "Terminado"
                            ? "#9bf59b"
                            : "transparent",
                      }}
                    >
                      {row?.alerta ?? "Sin estado"}
                    </td>
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

const getBackgroundColor = (percent) => {
  const value = parseFloat(percent);
  if (isNaN(value)) return "#ffffff";

  if (value < 25.0) return "#ff4d4d";
  if (value < 50.0) return "#ffa64d";
  if (value < 75.0) return "#ffff66";
  return "#66cc66";
};
