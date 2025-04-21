import "./index.css";
import MineducIcon from "../../../../assets/icons/logo_mineduc.png";
import DocenteMasIcon from "../../../../assets/icons/logo.png";
import FBIcon from "../../../../assets/icons/ico__facebook.svg";
import FlickrIcon from "../../../../assets/icons/ico__flickr.svg";
import InstagramIcon from "../../../../assets/icons/ico__instagram.svg";
import XIcon from "../../../../assets/icons/ico__twitter.svg";
import YoutubeIcon from "../../../../assets/icons/ico__youtube.svg";

export function LoginHeader() {
  return (
    <nav className="login-header">
      <div className="login-logos">
        <a href="https://www.mineduc.cl/" target="_blank">
          <img src={MineducIcon} alt="MINISTERIO DE EDUCACION" />
        </a>
        <a href="https://www.docentemas.cl/" target="_blank">
          <img src={DocenteMasIcon} alt="Docente MÁS" />
        </a>
      </div>
      <div className="login-social">
        <div className="icon-button--transparent">
          <img src={FBIcon} alt="FB" />
        </div>
        <div className="icon-button--transparent">
          <img src={FlickrIcon} alt="FL" />
        </div>
        <div className="icon-button--transparent">
          <img src={InstagramIcon} alt="INST" />
        </div>
        <div className="icon-button--transparent">
          <img src={XIcon} alt="TWIT" />
        </div>
        <div className="icon-button--transparent">
          <img src={YoutubeIcon} alt="YT" />
        </div>
      </div>
    </nav>
  );
}
