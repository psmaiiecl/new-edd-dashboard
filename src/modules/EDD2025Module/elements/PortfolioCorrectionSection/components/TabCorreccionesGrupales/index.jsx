import { TabContent } from "../../../../../../components/Layout/TabContent";
import Select from "react-select";
import { useTab } from "./hooks/useTab";

export function TabCorreccionesGrupales() {
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
        <table>
          <thead>
            <tr>
              <th>Corrector</th>
              <th>Tipo de Portafolio</th>
              <th>Rol</th>
              <th>Count</th>
              {indicadorIndex.map((i) => {
                return <th>% Ind {i}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {correccionTable.map((row) => {
              return (
                <tr>
                  <td>{row?.corrector}</td>
                  <td>{row?.tipo_de}</td>
                  <td>{row?.rol}</td>
                  <td>{row?.co}</td>
                  {indicadorIndex.map((i) => {
                    return (
                      <td
                        style={{
                          backgroundColor: getBackgroundColor(
                            row[`ind_${i}`] || 0
                          ),
                        }}
                      >
                        {row[`ind_${i}`] || 0}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TabContent>
  );
}

const getBackgroundColor = (number) => {
  const value = parseFloat(number);
  if (isNaN(value)) return "#ffffff";

  if (value < 11.1) return "#fff";
  if (value <= 22.0) return "#fff1cd";
  if (value <= 43.0) return "#f3cccb";
  return "#db3b0f";
};
