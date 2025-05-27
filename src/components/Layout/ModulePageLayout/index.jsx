import "./style.css";
export function ModulePageLayout({ children }) {
  return (
    <section className="module-page-layout">
      <article className="module-page-content roboto-regular">
        {children}
      </article>
    </section>
  );
}
