import React from "react";

export default function FiltrosPortfolioSection({ filtros = {}, onFiltroChange }) {
  return (
    <div className="filtros-content-portafolio">
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
    </div>
  );
}


