import Select from "react-select";
import { useTab } from "./hooks/useTab";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import {
  AutoSizer,
  Table,
  Column,
  defaultTableHeaderRenderer as defHeadRender,
  defaultTableCellRenderer as defCellRenderer,
  defaultTableCellDataGetter as defCellDataGetter,
} from "react-virtualized";
import "react-virtualized/styles.css";

export function TabTercerasCorrecciones() {
  const indicadorIndex = Array.from({ length: 12 }, (_, i) => i + 1);

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
        <div className="tab-general-filter">
          <span>Seleccione tipo de portafolio: </span>
          <Select
            value={""}
            // onChange={(option) => handleFilter("agrupacion", option)}
            options={[]}
            isSearchable
            noOptionsMessage={() => "Ningun tipo de portafolio"}
            placeholder="Seleccione un tipo de portafolio"
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
        {correccionTable.length > 0 && (
          <div
            style={{
              height: "475px",
              width: "100%",
              overflowX: "auto",
              overflowY: "hidden",
            }}
          >
            <AutoSizer>
              {() => (
                <Table
                  gridStyle={{ outline: "none" }}
                  width={1500}
                  height={450}
                  headerHeight={25}
                  rowHeight={25}
                  rowCount={correccionTable.length}
                  rowGetter={({ index }) => {
                    return correccionTable[index];
                  }}
                >
                  <Column
                    label="Corrector"
                    width={300}
                    dataKey="corrector"
                    headerRenderer={defHeadRender}
                    cellDataGetter={defCellDataGetter}
                    cellRenderer={defCellRenderer}
                    minWidth={300}
                    maxWidth={300}
                  />
                  <Column
                    label="RUT"
                    width={100}
                    dataKey="rut"
                    headerRenderer={defHeadRender}
                    cellDataGetter={defCellDataGetter}
                    cellRenderer={defCellRenderer}
                    minWidth={100}
                    maxWidth={100}
                  />
                  <Column
                    label="Centro de Correccion"
                    width={65}
                    dataKey="centroCc"
                    headerRenderer={defHeadRender}
                    cellDataGetter={defCellDataGetter}
                    cellRenderer={defCellRenderer}
                    minWidth={65}
                    maxWidth={65}
                  />
                  <Column
                    label="Grupo de Trabajo"
                    width={70}
                    dataKey="grupoTrabajo"
                    headerRenderer={defHeadRender}
                    cellDataGetter={defCellDataGetter}
                    cellRenderer={defCellRenderer}
                    minWidth={70}
                    maxWidth={70}
                  />
                  <Column
                    label="Módulo"
                    width={50}
                    dataKey="modulo"
                    headerRenderer={defHeadRender}
                    cellDataGetter={defCellDataGetter}
                    cellRenderer={defCellRenderer}
                    minWidth={50}
                    maxWidth={50}
                  />
                  <Column
                    label="Especialidad"
                    width={80}
                    dataKey="especialidad"
                    headerRenderer={defHeadRender}
                    cellDataGetter={defCellDataGetter}
                    cellRenderer={defCellRenderer}
                    minWidth={80}
                    maxWidth={80}
                  />
                  <Column
                    label="Tipo de Correccion"
                    width={150}
                    maxWidth={150}
                    minWidth={150}
                    dataKey="tipoCorreccion"
                    headerRenderer={defHeadRender}
                    cellDataGetter={defCellDataGetter}
                    cellRenderer={defCellRenderer}
                  />
                  {indicadorIndex.map((i) => {
                    return (
                      <Column
                        label={`I${i}`}
                        width={50}
                        maxWidth={50}
                        minWidth={50}
                        dataKey={`ind_${i}`}
                        headerRenderer={defHeadRender}
                        cellDataGetter={defCellDataGetter}
                        cellRenderer={defCellRenderer}
                      />
                    );
                  })}
                  <Column
                    label="AVG"
                    width={50}
                    maxWidth={50}
                    minWidth={50}
                    dataKey="promedio"
                    headerRenderer={defHeadRender}
                    cellDataGetter={defCellDataGetter}
                    cellRenderer={defCellRenderer}
                  />
                </Table>
              )}
            </AutoSizer>
          </div>
        )}
      </div>
    </TabContent>
  );
}
