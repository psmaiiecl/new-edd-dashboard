import { TabContent } from "../../../../../../components/Layout/TabContent";
import Select from "react-select";
import { useTab } from "./hooks/useTab";
import { CustomColumnChart } from "../../../../../../components/CustomColumnChart";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { SELECT_STYLES } from "../../../../../../constants/CONST";
import { Button } from "../../../../../../components/Button";
import { useMemo } from "react";

export function TabModulo({ module, selectors }) {
  const { selectedFilter, handleFilter, data, cleanFilters } = useTab(
    module,
    selectors
  );

  const grupo = selectedFilter.grupo;
  const agrupaciones = grupo?.agrupaciones ?? [];
  const especialidades = grupo?.especialidades ?? [];
  const dateOptions = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); 

    const options = [];
    const endDay = today.getDate();

    for (let day = 3; day <= endDay; day++) {
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
          <span>Seleccione grupo: </span>
          <Select
            value={grupo}
            onChange={(option) => handleFilter("grupo", option)}
            options={selectors ?? []}
            isSearchable
            noOptionsMessage={() => "Ningún grupo"}
            placeholder="Seleccione un grupo"
            styles={SELECT_STYLES}
          />
        </div>

        {!!agrupaciones.length && agrupaciones?.length > 1 && (
          <div className="tab-general-filter">
            <span>Seleccione agrupación: </span>
            <Select
              value={selectedFilter.agrupacion}
              onChange={(option) => handleFilter("agrupacion", option)}
              options={agrupaciones}
              isSearchable
              noOptionsMessage={() => "Ninguna agrupación"}
              placeholder="Seleccione una agrupación"
              styles={SELECT_STYLES}
              isDisabled={!grupo}
            />
          </div>
        )}

        <div className="tab-general-filter">
          <span>Seleccione especialidad: </span>
          <Select
            value={selectedFilter.especialidad}
            onChange={(option) => handleFilter("especialidad", option)}
            options={especialidades}
            isSearchable
            noOptionsMessage={() => "Ninguna especialidad"}
            placeholder="Seleccione una especialidad"
            styles={SELECT_STYLES}
            isDisabled={!grupo}
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
            isDisabled={!grupo}
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
          <Button text={"Limpiar Filtros"} action={cleanFilters} />
        </div>
      </div>
      <div className="normal-container">
        <div className="pie-grid-2">
          <div style={{ maxWidth: "500px", margin: "auto" }}>
            <CustomColumnChart title={module} data={data.comparacion} />
          </div>
          <div style={{ maxWidth: "500px", margin: "auto" }}>
            <div className="column-chart-container">
              <HighchartsReact options={data.cohen} highcharts={Highcharts} />
            </div>
          </div>
        </div>
        <div className="pie-grid-2">
          <div style={{ width: "80%", margin: "auto" }}>
            {data.tabla_comparacion && (
              <table className="roboto-regular">
                <thead>
                  <tr>
                    {data.tabla_comparacion.columns.map((col) => (
                      <th
                        key={col.key}
                        style={{ backgroundColor: col?.color || "#e7e7e7ff" }}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.tabla_comparacion.rows.map((row, i) => (
                    <tr key={i}>
                      {data.tabla_comparacion.columns.map((col) => (
                        <td
                          key={col.key}
                          style={{
                            backgroundColor: row?.paint
                              ? "#f29292ff"
                              : "transparent",
                          }}
                        >
                          {row[col.key] !== undefined ? row[col.key] : "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div style={{ width: "80%", margin: "auto" }}>
            {data.tabla_cohen && (
              <table className="roboto-regular">
                <thead>
                  <tr>
                    {data.tabla_cohen.columns.map((col) => (
                      <th
                        key={col.key}
                        style={{ backgroundColor: col?.color || "#e7e7e7ff" }}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.tabla_cohen.rows.map((row, i) => (
                    <tr key={i}>
                      {data.tabla_cohen.columns.map((col) => (
                        <td
                          key={col.key}
                          style={{
                            backgroundColor: row?.paint
                              ? "#f29292ff"
                              : "transparent",
                          }}
                        >
                          {row[col.key] !== undefined ? row[col.key] : "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </TabContent>
  );
}
