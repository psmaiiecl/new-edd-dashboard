import Select from "react-select";

export default function FiltrosPortfolioSection({ filtros = {}, onFiltroChange }) {
  const DEPENDENCY_LIST = [
    { value: "", label: "Todas" },
    { value: "3", label: "AD" },
    { value: "10", label: "CAD" },
    { value: "4", label: "INTEGRA" },
    { value: "5", label: "JUNJI" },
    { value: "7", label: "Municipal Corporación" },
    { value: "6", label: "DAEM" },
    { value: "9", label: "Párvulo" },
    { value: "1", label: "PS" },
    { value: "8", label: "SLE" },
    { value: "2", label: "VTF" }
  ]
  const REGION_LIST = [
    { value: "", label: "Todas" },
    { value: "15", label: "Arica y Parinacota" },
    { value: "1", label: "Tarapacá" },
    { value: "2", label: "Antofagasta" },
    { value: "3", label: "Atacama" },
    { value: "4", label: "Coquimbo" },
    { value: "5", label: "Valparaíso" },
    { value: "13", label: "RM" },
    { value: "6", label: "O'Higgins" },
    { value: "7", label: "Maule" },
    { value: "16", label: "Ñuble" },
    { value: "8", label: "Bío-Bío" },
    { value: "9", label: "La Araucanía" },
    { value: "14", label: "Los Ríos" },
    { value: "10", label: "Los Lagos" },
    { value: "11", label: "Aysén" },
    { value: "12", label: "Magallanes" }
  ];
  return (
    <div className="tab-general-filter-row">


      <div className="tab-general-filter">
        <span>Dependencia: </span>
        <Select
          value={DEPENDENCY_LIST.find(option => option.value === filtros.dependencia)}
          onChange={(option) => onFiltroChange("dependencia", option ? option.value : "")}
          options={DEPENDENCY_LIST}
          isSearchable
          noOptionsMessage={() => "Ninguna dependencia"}
          placeholder="Seleccione una dependencia"
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
        <span>Region: </span>
        <Select
          value={filtros.region ? REGION_LIST.find(option => option.value === filtros.region) : ""}
          onChange={(option) => onFiltroChange("region", option ? option.value : "")}
          options={REGION_LIST}
          isSearchable
          noOptionsMessage={() => "Ninguna region"}
          placeholder="Seleccione una region"
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

    //HTML MODIFICADO PARA USARSE CON LA LIBRERIA
    //TODO: ELIMINAR LUEGO
    /* <div className="filtros-content-portafolio">
      <div className="general-tab">
        Dependencia
        <select value={filtros.dependencia || ""} onChange={(e) => onFiltroChange("dependencia", e.target.value)}>

          <option value="">Todas</option>
          <option value="3">AD</option>
          <option value="10">CAD</option>
          <option value="4">INTEGRA</option>
          <option value="5">JUNJI</option>
          <option value="7">Municipal Corporación</option>
          <option value="6">DAEM</option>
          <option value="9">Párvulo</option>
          <option value="1">PS</option>
          <option value="8">SLE</option>
          <option value="2">VTF</option>
        </select>
      </div>
      <div className="filtros-content filtro">
        Región
        <select value={filtros.region || ""} onChange={(e) => onFiltroChange("region", e.target.value)}>
          <option value="">Todas</option>
          <option value="15">Arica y Parinacota</option>
          <option value="1">Tarapacá</option>
          <option value="2">Antofagasta</option>
          <option value="3">Atacama</option>
          <option value="4">Coquimbo</option>
          <option value="5">Valparaíso</option>
          <option value="13">RM</option>
          <option value="6">O'Higgins</option>
          <option value="7">Maule</option>
          <option value="16">Ñuble</option>
          <option value="8">Bío-Bío</option>
          <option value="9">La Araucanía</option>
          <option value="14">Los Ríos</option>
          <option value="10">Los Lagos</option>
          <option value="11">Aysén</option>
          <option value="12">Magallanes</option>
        </select>
      </div>
    </div> */
  );
}


