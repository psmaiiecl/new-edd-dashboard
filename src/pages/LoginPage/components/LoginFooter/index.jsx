import "./index.css";

export function LoginFooter() {
  return (
    <footer className="login-footer roboto-regular">
      <div className="login-footer__divider--blue"></div>
      <div className="login-footer__divider--red"></div>
      <p>
        Ministerio de Educación - Teléfono <a href="">+56 2 24066000</a>
      </p>
      <p>
        <a
          href="http://www.mineduc.cl/politicas-de-privacidad/"
          target="_blank"
        >
          Políticas de Privacidad
        </a>{" "}
        |{" "}
        <a href="http://www.gob.cl/visualizadores/" target="_blank">
          Visualizadores &amp; Plug-ins
        </a>{" "}
        |{" "}
        <a
          href="https://creativecommons.org/licenses/by/2.0/cl/"
          target="_blank"
        >
          CC
        </a>
      </p>
    </footer>
  );
}
