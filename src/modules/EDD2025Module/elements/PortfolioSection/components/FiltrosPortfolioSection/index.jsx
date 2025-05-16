// src/modules/EDD2025Module/elements/FiltrosPortfolioSection.jsx
import React from "react";
import "./index.css"; // Opcional si necesitas estilos extra

function FiltrosPortfolioSection({ onChange }) {
  return (
    <div className="filtros-content-portafolio" id="filtros-content-portafolio">
      <div className="filtros-content filtro">
        Estado de avance del portafolio
        <select
          className="custom-select"
          name="estado"
          onChange={(e) => onChange("estado", e.target.value)}
        >
          <option value="">Todos</option>
          <option value="completado">Completado</option>
          <option value="iniciado">Iniciado</option>
          <option value="no_iniciado">No Iniciado</option>
        </select>
      </div>

      <div className="filtros-content filtro">
        Dependencia
        <select
          className="custom-select"
          name="dependencia"
          onChange={(e) => onChange("dependencia", e.target.value)}
        >
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
        <select
          className="custom-select"
          name="region"
          onChange={(e) => onChange("region", e.target.value)}
        >
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
      <div className="filtros-content filtro">
        Convocatoria
        <select
          className="custom-select"
          name="convocatoria"
          onChange={(e) => onChange("convocatoria", e.target.value)}
        >
          <option value="">Todos</option>
          <option value="1">Participación Obligatoria</option>
          <option value="2">Participación Voluntaria</option>
        </select>
      </div>
    </div>
  );
}
export default FiltrosPortfolioSection;
