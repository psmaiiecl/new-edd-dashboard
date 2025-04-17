import "./index.css";

export function Button({ text, action, disabled }) {
  return (
    <div
      onClick={() => {
        if (!disabled) action();
      }}
      title={text}
      className={
        "button " + (disabled === true ? "disabled-button " : "enabled-button")
      }
    >
      <span className="roboto-regular">{text}</span>
    </div>
  );
}
