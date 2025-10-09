import { TabContent } from "../../../../../../components/Layout/TabContent";
import { useTab } from "./hooks/useTab";
import Select from "react-select";
import { getVal, safeVal, shouldHighlightDiff } from "../../utils/utils";
import { Fragment } from "react";

function Cell({ value }) {
  const v = value;
  return <td>{v === null || v === undefined ? "-" : v.toFixed(1)}</td>;
}

function FilaGrupo({ dataset, año, grupo, modulos, moduloIndices }) {
  return (
    <>
      <td>{grupo}</td>
      {modulos.map((m) =>
        moduloIndices[m.key].map((i) => (
          <Cell
            key={`${m.key}-${i}`}
            value={safeVal(getVal(dataset, año, grupo.toLowerCase(), m.key, i))}
          />
        ))
      )}
    </>
  );
}

function FilaCD({ valoresPorModulo, modulos, moduloIndices }) {
  return (
    <>
      <td>C+D</td>
      {modulos.map((m) =>
        moduloIndices[m.key].map((i) => (
          <Cell key={`${m.key}-${i}`} value={valoresPorModulo[m.key][i]} />
        ))
      )}
    </>
  );
}

function FilaDif({ difPorModulo, modulos, moduloIndices }) {
  return (
    <>
      <td>C+D</td>
      {modulos.map((m) =>
        moduloIndices[m.key].map((i) => {
          const v = difPorModulo[m.key][i];
          const hl = shouldHighlightDiff(v, 10);
          return (
            <td
              key={`${m.key}-${i}`}
              className={`border border-gray-300 px-2 py-1 ${
                hl ? "bg-yellow-100 font-semibold" : ""
              }`}
            >
              {v === null || v === undefined ? "-" : v.toFixed(1)}
            </td>
          );
        })
      )}
    </>
  );
}

export function TabDistribucionPuntaje() {
  const { selectedFilter, handleFilter, correccionTable } = useTab();

  return (
    <TabContent>
      <div className="tab-general-filter-row">
        <div className="tab-general-filter">
          <span>Seleccione grupo de trabajo: </span>
          <Select
            value={""}
            // onChange={(option) => handleFilter("agrupacion", option)}
            options={[]}
            isSearchable
            noOptionsMessage={() => "Ningun grupo de trabajo"}
            placeholder="Seleccione un grupo de trabajo"
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
          <span>Seleccione especialidad: </span>
          <Select
            value={""}
            // onChange={(option) => handleFilter("agrupacion", option)}
            options={[]}
            isSearchable
            noOptionsMessage={() => "Ningun especialidad"}
            placeholder="Seleccione un especialidad"
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
      </div>
      <div className="normal-container">
        {correccionTable && (
          <div style={{ maxWidth: "100%", overflowX: "scroll" }}>
            <table className="roboto-regular">
              <thead>
                <tr>
                  <th rowSpan={2}></th>
                  <th rowSpan={2}></th>

                  {correccionTable?.modulos.map((m) => (
                    <th
                      key={m.key}
                      style={{ backgroundColor: "#5197d1ff" }}
                      colSpan={correccionTable?.moduloIndices[m.key].length}
                    >
                      {m.title}
                      {m.note ? (
                        <div className="roboto-light">*{m.note}</div>
                      ) : null}
                    </th>
                  ))}
                </tr>
                <tr>
                  {correccionTable?.modulos.map((m) =>
                    correccionTable?.moduloIndices[m.key].map((i) => (
                      <th
                        key={`${m.key}-i-${i}`}
                        style={{ backgroundColor: "#5197d1ff" }}
                      >
                        <div className="font-medium">I{i}</div>
                        <div>(%)</div>
                      </th>
                    ))
                  )}
                </tr>
              </thead>

              <tbody>
                {/* 2023: I/B/C/D con rowSpan en la celda Año */}
                {["2023", "2024"].map((año) => (
                  <Fragment key={año}>
                    {/* Fila I (con rowSpan del año = 4) */}
                    <tr>
                      <td rowSpan={4} className="roboto-bold">
                        {año}
                      </td>
                      <FilaGrupo
                        dataset={correccionTable?.dataset}
                        año={año}
                        grupo="I"
                        modulos={correccionTable?.modulos}
                        moduloIndices={correccionTable?.moduloIndices}
                      />
                    </tr>

                    {/* Fila B */}
                    <tr>
                      <FilaGrupo
                        dataset={correccionTable?.dataset}
                        año={año}
                        grupo="B"
                        modulos={correccionTable?.modulos}
                        moduloIndices={correccionTable?.moduloIndices}
                      />
                    </tr>

                    {/* Fila C */}
                    <tr>
                      <FilaGrupo
                        dataset={correccionTable?.dataset}
                        año={año}
                        grupo="C"
                        modulos={correccionTable?.modulos}
                        moduloIndices={correccionTable?.moduloIndices}
                      />
                    </tr>

                    {/* Fila D */}
                    <tr>
                      <FilaGrupo
                        dataset={correccionTable?.dataset}
                        año={año}
                        grupo="D"
                        modulos={correccionTable?.modulos}
                        moduloIndices={correccionTable?.moduloIndices}
                      />
                    </tr>
                  </Fragment>
                ))}

                {/* 2023 C+D */}
                <tr>
                  <td>2023</td>
                  <FilaCD
                    añoLabel="2023"
                    valoresPorModulo={correccionTable?.cd["2023"]}
                    modulos={correccionTable?.modulos}
                    moduloIndices={correccionTable?.moduloIndices}
                  />
                </tr>

                {/* 2024 C+D */}
                <tr>
                  <td>2024</td>
                  <FilaCD
                    añoLabel="2024"
                    valoresPorModulo={correccionTable?.cd["2024"]}
                    modulos={correccionTable?.modulos}
                    moduloIndices={correccionTable?.moduloIndices}
                  />
                </tr>

                {/* Dif 24/23 (C+D) */}
                <tr>
                  <td>
                    Dif
                    <div className="text-[11px]">24/23</div>
                  </td>
                  <FilaDif
                    difPorModulo={correccionTable?.dif}
                    modulos={correccionTable?.modulos}
                    moduloIndices={correccionTable?.moduloIndices}
                  />
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </TabContent>
  );
}
