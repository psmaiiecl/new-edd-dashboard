import "./style.css";

/**
 * Componente TABS que requiere de una función de activación, es decir,
 * la acción a realizarse cuando se seleccione un tab, requiere del tab activo (proveniente de un estado)
 * un arreglo de tabs y una lista de children, donde son componentes extra que se introducen en el tab
 * preferentemente son botones, para este propósito por lo usual son botones de descarga.
 * La estructura de los tabs debe ser: [{index: ..., label: ...}]
 * @param {*} allParams
 */
export function CustomTabs({ setActiveFn, currentActive, tabArray, children }) {
  return (
    <div className="tab-container">
      <div className="tabs">
        {tabArray.map((tab) => (!(tab?.exclude === true) &&
          <TabItem
            key={tab.index}
            isActive={tab.index === currentActive}
            text={tab.label}
            setAsActive={() => setActiveFn(tab.index)}
          />
        ))}
      </div>
      <div className="tab__addOns">{children}</div>
    </div>
  );
}

function TabItem({ isActive, text, setAsActive }) {
  return (
    <div
      className={`${isActive === true && "active"} tabs__tab`}
      onClick={setAsActive}
    >
      <span>{text}</span>
    </div>
  );
}
