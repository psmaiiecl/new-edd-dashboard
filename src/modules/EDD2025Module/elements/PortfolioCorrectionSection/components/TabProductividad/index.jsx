import { TabContent } from "../../../../../../components/Layout/TabContent";
import Select from "react-select";
import { useTab } from "./hooks/useTab";
import { useCustomDownload } from "../../../../../../hooks/useCustomDownload";
import { BASE_API_URL_2025 } from "../../../../data/BASE_API_URL";
import { Button } from "../../../../../../components/Button";
import { SELECT_STYLES } from "../../../../../../constants/CONST";
import { modulos } from "../../data/selectorLists";
import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export function TabProductividad({selectors}) {
  const customDownload = useCustomDownload();
  const { selectedFilter, handleFilter, tableData, clearFilters } =
    useTab();

  const [sorting, setSorting] = useState([]);

  const data = useMemo(() => tableData || [], [tableData]);
  const columns = useMemo(() => {
    const baseCols = [
      {
        id: "modulo",
        header: "Módulo",
        accessorKey: "modulo",
        size: 40,
      },
      {
        id: "especialidad",
        header: "Especialidad",
        accessorKey: "especialidad",
        size: 80,
      },
      {
        id: "total_correcciones_esperadas",
        header: "Total Crr",
        accessorKey: "total_correcciones_esperadas",
        size: 50,
      },
      {
        id: "correcciones_realizadas_total",
        header: "Total Corregido",
        accessorKey: "correcciones_realizadas_total",
        size: 60,
      },
      {
        id: "correcciones_realizadas_7_dias",
        header: "Corregido Semanal",
        accessorKey: "correcciones_realizadas_7_dias",
        size: 60,
      },
      {
        id: "porcentaje_avance",
        header: "% Avance",
        accessorKey: "porcentaje_avance",
        size: 50,
        cell: ({ getValue }) => {
          const value = getValue() ?? 0;
          return (
            <div
              style={{
                backgroundColor: getBackgroundColor(value),padding: "4px 8px",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "12px",
                textAlign: "center",
                whiteSpace: "wrap",
              }}
            >
              {value}%
            </div>
          );
        },
      },
      {
        id: "tasa_diaria",
        header: "Tasa Avance",
        accessorKey: "tasa_diaria",
        size: 50,
        cell: ({ getValue }) => {
          const value = getValue() ?? 0;
          return value + ' crr/día'
        },
      },
      {
        id: "fecha_estimada_termino",
        header: "Fecha Estimada",
        accessorKey: "fecha_estimada_termino",
        size: 50,
      },
      {
        id: "alerta",
        header: "Alerta",
        accessorKey: "alerta",
        size: 50,
        cell: ({ getValue }) => {
          const value = getValue() ?? 0;
          return (
            <div
              style={{
                backgroundColor:
                  value === "Alerta"
                    ? "#f08181ff"
                    : value === "Fuera de Plazo"
                    ? "#f3b562"
                    : value === "En Curso"
                    ? "#fff3a0"
                    : value === "Terminado"
                    ? "#9bf59b"
                    : "transparent",
                padding: "4px 8px",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "12px",
                textAlign: "center",
                whiteSpace: "wrap",
              }}
            >
              {value}
            </div>
          );
        },
      },
    ];

    return baseCols;
  }, []);
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,

    columnResizeMode: "onChange",
  });
  return (
    <TabContent>
      <div className="tab-general-filter-row">
        <div className="tab-general-filter">
          <span>Seleccione grupo: </span>
          <Select
            value={selectedFilter.grupo}
            onChange={(option) => handleFilter("grupo", option)}
            options={selectors.grupo ?? []}
            isSearchable
            noOptionsMessage={() => "Ningún grupo"}
            placeholder="Seleccione un grupo"
            styles={SELECT_STYLES}
          />
        </div>

          <div className="tab-general-filter">
            <span>Seleccione agrupación: </span>
            <Select
              value={selectedFilter.agrupacion}
              onChange={(option) => handleFilter("agrupacion", option)}
              options={selectors.agrupacion}
              isSearchable
              noOptionsMessage={() => "Ninguna agrupación"}
              placeholder="Seleccione una agrupación"
              styles={SELECT_STYLES}
            />
          </div>

        <div className="tab-general-filter">
          <span>Seleccione especialidad: </span>
          <Select
            value={selectedFilter.especialidad}
            onChange={(option) => handleFilter("especialidad", option)}
            options={selectors.especialidad}
            isSearchable
            noOptionsMessage={() => "Ninguna especialidad"}
            placeholder="Seleccione una especialidad"
            styles={SELECT_STYLES}
          />
        </div>
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
        {data.length > 0 && (
          <table
            className="tab-table"
            style={{ width: 1200, borderCollapse: "collapse" }}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        position: "sticky",
                        top: 0,
                        background: "rgb(81, 151, 209)",
                        zIndex: 1,
                        maxWidth: header.getSize(),
                        borderBottom: "2px solid #ddd",
                        cursor: header.column.getCanSort()
                          ? "pointer"
                          : "default",
                        userSelect: "none",
                        whiteSpace: "normal",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 4,
                          boxSizing: "border-box",
                        }}
                      >
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: "▴",
                            desc: "▾",
                          }[header.column.getIsSorted()] ?? null}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{
                        minWidth: cell.column.getSize(),
                        maxWidth: cell.column.getSize(),
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </TabContent>
  );
}

const getBackgroundColor = (percent) => {
  const value = parseFloat(percent);
  if (isNaN(value)) return "#ffffff";

  if (value < 25.0) return "#f08181ff";
  if (value < 50.0) return "#f3b562";
  if (value < 75.0) return "#fff3a0";
  return "#9bf59b";
};
