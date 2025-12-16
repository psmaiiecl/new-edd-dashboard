import Select from "react-select";
import { useTab } from "./hooks/useTab";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import { useVirtualizer } from "@tanstack/react-virtual";
import "react-virtualized/styles.css";
import { useCustomDownload } from "../../../../../../hooks/useCustomDownload";
import { useMemo, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { SELECT_STYLES } from "../../../../../../constants/CONST";
import { BASE_API_URL_2025 } from "../../../../data/BASE_API_URL";
import { Button } from "../../../../../../components/Button";

export function TabTercerasCorrecciones({selectors}) {
  const customDownload = useCustomDownload();
  const indicadorIndex = useMemo(
    () => Array.from({ length: 12 }, (_, i) => i + 1),
    []
  );

  const { selectedFilter, handleFilter, correccionTable, cleanFilters } =
    useTab();

  const data = useMemo(() => correccionTable || [], [correccionTable]);

  const columns = useMemo(() => {
    const baseCols = [
      {
        id: "cc",
        header: "CC",
        accessorKey: "cc",
        size: 50,
      },
      {
        id: "modulo",
        header: "M",
        accessorKey: "modulo",
        size: 35,
      },
      {
        id: "corrector",
        header: "Corrector",
        accessorKey: "corrector",
        size: 300,
      },
      {
        id: "rut",
        header: "RUT",
        accessorKey: "rut",
        size: 100,
      },
      {
        id: "tipo_de",
        header: "Tipo de Portafolio",
        accessorKey: "tipo_de",
        size: 100,
      },
      {
        id: "especialidad",
        header: "Especialidad",
        accessorKey: "especialidad",
        size: 75,
      },
    ];

    const indicadorCols = indicadorIndex.map((i) => ({
      id: `ind_${i}`,
      header: `% I${i}`,
      accessorKey: `ind_${i}`,
      size: 50,
    }));

    return [
      ...baseCols,
      ...indicadorCols,
      {
        id: "promedio",
        header: "Promedio",
        accessorKey: "promedio",
        size: 50,
        cell: ({ getValue }) => {
          const value = getValue() ?? 0;
          return (
            <div
              style={{
                textAlign: "center",
                backgroundColor: getBackgroundColor(value),
              }}
            >
              {value}
            </div>
          );
        },
      },
    ];
  }, [indicadorIndex]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
          <span>Seleccione grupo de trabajo: </span>
          <Select
            value={selectedFilter?.grupo_trabajo || ""}
            onChange={(option) => handleFilter("grupo_trabajo", option)}
            options={selectors?.grupo_trabajo || []}
            isSearchable
            noOptionsMessage={() => "Ningún grupo de trabajo"}
            placeholder="Seleccione un grupo de trabajo"
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
          <span>Seleccione tipo de portafolio: </span>
          <Select
            value={selectedFilter?.tipo_portafolio || ""}
            onChange={(option) => handleFilter("tipo_portafolio", option)}
            options={selectors?.tipo_portafolio || []}
            isSearchable
            noOptionsMessage={() => "Ningún tipo de portafolio"}
            placeholder="Seleccione un tipo de portafolio"
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
                  `/2025-cpf-calibracion-terceras?tipo_portafolio=${
                    selectedFilter.tipo_portafolio?.value ?? ""
                  }&grupo_trabajo=${
                    selectedFilter.grupo_trabajo?.value ?? ""
                  }&excel=1`,
                options: { method: "GET" },
                filename: `CALIBRACION_TERCERAS.xlsx`,
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
                        style={{
                          position: "sticky",
                          top: 0,

                          background: "rgb(81, 151, 209)",
                          zIndex: 1,
                          minWidth: header.getSize(),
                          maxWidth: header.getSize(),

                          borderBottom: "2px solid #ddd",
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
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

const getBackgroundColor = (number) => {
  const value = parseFloat(number);
  if (isNaN(value)) return "#ffffff";

  if (value >= 10.0) return "#e65b5bff";
  return "#fff";
};
