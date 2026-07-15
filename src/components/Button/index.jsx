import "./index.css";

export function Button({ text, action, disabled, variant = "primary" }) {
  return (
    <div
      onClick={() => {
        if (!disabled) action();
      }}
      title={text}
      className={
        "button " +
        (disabled === true
          ? "disabled-button "
          : `enabled-button enabled-button--${variant} `)
      }
    >
      <span className="roboto-regular">{text}</span>
    </div>
  );
}
