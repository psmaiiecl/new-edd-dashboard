export default function FiltroCentros({ centros = [], onChange }) {
  return (
    <div className="selector-centro">
      <label htmlFor="centro-select">Filtrar por Centro:</label>
      <select
        id="centro-select"
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Seleccione un centro</option>
        {centros.length > 0 &&
          centros.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
      </select>
    </div>
  );
}
