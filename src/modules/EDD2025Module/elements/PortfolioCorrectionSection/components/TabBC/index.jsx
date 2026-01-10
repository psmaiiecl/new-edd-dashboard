import { useMemo, useRef, useState } from "react";
import Select from "react-select";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import { useTab } from "./hooks/useTab";
import { SELECT_STYLES } from "../../../../../../constants/CONST";
import { Button } from "../../../../../../components/Button";
import { useCustomDownload } from "../../../../../../hooks/useCustomDownload";
import { BASE_API_URL_2025 } from "../../../../data/BASE_API_URL";
import { grupos, modulos } from "../../data/selectorLists";

export function TabBC({ selectors }) {
  const customDownload = useCustomDownload();

  const indicadorIndex = useMemo(
    () => Array.from({ length: 12 }, (_, i) => i + 1),
    []
  );

  const { selectedFilter, handleFilter, correccionTable, cleanFilters } =
    useTab();

  const [sorting, setSorting] = useState([]);

  const data = useMemo(() => correccionTable || [], [correccionTable]);

  const columns = useMemo(() => {
    const baseCols = [
      {
        id: "rut",
        header: "RUT",
        accessorKey: "rut",
        size: 80,
      },
      {
        id: "corrector",
        header: "Corrector",
        accessorKey: "corrector",
        size: 300,
      },
      {
        id: "grupo",
        header: "Rúbrica",
        accessorKey: "grupo",
        size: 100,
      },
      {
        id: "rol",
        header: "Rol",
        accessorKey: "rol",
        size: 100,
      },
      {
        id: "modulo",
        header: "Módulo",
        accessorKey: "modulo",
        size: 50,
      },
      {
        id: "especialidad",
        header: "Especialidad",
        accessorKey: "especialidad",
        size: 100,
      },
      {
        id: "conteo",
        header: "Conteo Dobles",
        accessorKey: "conteo",
        size: 100,
      },
    ];

    const indicadorCols = indicadorIndex.flatMap((i) => [
      {
        id: `c${i}`,
        header: `C${i}`,
        accessorKey: `c${i}`,
        size: 45,
        cell: ({ getValue }) => {
          const value = getValue();
          return <div style={{ textAlign: "center" }}>{value ?? ""}</div>;
        },
      },
      {
        id: `ind_${i}`,
        header: `% I${i}`,
        accessorKey: `ind_${i}`,
        size: 60,
        cell: ({ getValue }) => {
          const value = getValue();
          if (value == null) return "";

          return (
            <div
              style={{
                textAlign: "center",
                // backgroundColor: getBackgroundColor(value),
              }}
            >
              {value}%
            </div>
          );
        },
      },
    ]);

    return [...baseCols, ...indicadorCols];
  }, [indicadorIndex]);

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

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 32.5,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - virtualRows[virtualRows.length - 1].end
      : 0;

  return (
    <TabContent>
      <div className="tab-general-filter-row">
        <div className="tab-general-filter">
          <span>Seleccione grupo: </span>
          <Select
            value={selectedFilter?.grupo || ""}
            onChange={(option) => handleFilter("grupo", option)}
            options={grupos}
            isSearchable
            noOptionsMessage={() => "Ningún grupo"}
            placeholder="Seleccione un grupo"
            styles={SELECT_STYLES}
          />
        </div>
        <div className="tab-general-filter">
          <span>Seleccione especialidad: </span>
          <Select
            value={selectedFilter?.especialidad || ""}
            onChange={(option) => handleFilter("especialidad", option)}
            options={selectors?.especialidad || []}
            isSearchable
            noOptionsMessage={() => "Ninguna especialidad"}
            placeholder="Seleccione una especialidad"
            styles={SELECT_STYLES}
          />
        </div>
        <div className="tab-general-filter">
          <span>Seleccione módulo: </span>
          <Select
            value={selectedFilter?.modulo || ""}
            onChange={(option) => handleFilter("modulo", option)}
            options={modulos}
            isSearchable
            noOptionsMessage={() => "Ningún módulo"}
            placeholder="Seleccione un módulo"
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
          <Button text={"Limpiar Filtros"} action={cleanFilters} />
          <Button
            text={"Excel"}
            action={() => {
              customDownload({
                route:
                  BASE_API_URL_2025 +
                  `/2025-cpf-monitoreo-bc?tipo_portafolio=${
                    selectedFilter.tipo_portafolio?.value ?? ""
                  }&grupo_trabajo=${
                    selectedFilter.grupo_trabajo?.value ?? ""
                  }&periodo=${selectedFilter.periodo?.value ?? ""}&excel=1`,
                options: { method: "GET" },
                filename: `MONITOREO_BC.xlsx`,
              });
            }}
          />
        </div>
      </div>

      <div className="normal-container">
        {data.length > 0 && (
          <div
            ref={parentRef}
            style={{
              height: 475,
              width: "100%",
              overflowX: "auto",
              overflowY: "auto",
            }}
          >
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
                          minWidth: header.getSize(),
                          maxWidth: header.getSize(),

                          borderBottom: "2px solid #ddd",
                          cursor: header.column.getCanSort()
                            ? "pointer"
                            : "default",
                          userSelect: "none",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          {{
                            asc: "▴",
                            desc: "▾",
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {paddingTop > 0 && (
                  <tr>
                    <td style={{ height: paddingTop }} />
                  </tr>
                )}

                {virtualRows.map((virtualRow) => {
                  const row = table.getRowModel().rows[virtualRow.index];
                  return (
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
                  );
                })}

                {paddingBottom > 0 && (
                  <tr>
                    <td style={{ height: paddingBottom }} />
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </TabContent>
  );
}