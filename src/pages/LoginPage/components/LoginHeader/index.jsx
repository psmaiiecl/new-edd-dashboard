import "./index.css";
export function LoginHeader() {
  return (
    <nav className="login-header">
      <div className="login-logos">
        <a href="https://www.mineduc.cl/" target="_blank">
          <img src="icons/logo_mineduc.png" alt="MINISTERIO DE EDUCACION" />
        </a>
        <a href="https://www.docentemas.cl/" target="_blank">
          <img src="icons/logo.png" alt="Docente MÁS" />
        </a>
      </div>
      <div className="login-social">
        <div className="icon-button--transparent">
          <img src="icons/ico__facebook.svg" alt="FB" />
        </div>
        <div className="icon-button--transparent">
          <img src="icons/ico__flickr.svg" alt="FL" />
        </div>
        <div className="icon-button--transparent">
          <img src="icons/ico__instagram.svg" alt="INST" />
        </div>
        <div className="icon-button--transparent">
          <img src="icons/ico__twitter.svg" alt="TWIT" />
        </div>
        <div className="icon-button--transparent">
          <img src="icons/ico__youtube.svg" alt="YT" />
        </div>
      </div>
    </nav>
  );
}
