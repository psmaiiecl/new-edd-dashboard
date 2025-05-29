import "./index.css";
import { useNavigate } from "react-router";
import BackIcon from "../../assets/icons/back.svg";

export function BackButton() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    const path = location.pathname;
    const baseDashboardRegex = /^\/front\/dashboard\/(\d{4})$/;
    if (path.match(baseDashboardRegex)) {
      navigate("/");
    }
    if (path.startsWith("/front/dashboard/")) {
      const segments = path.split("/").filter(Boolean);
      const basePath = "/" + segments.slice(1, 3).join("/");
      navigate(basePath);
    }
    //navigate(-1);
  };
  return (
    <div className="go-back-button" onClick={() => handleGoBack()}>
      <img src={BackIcon} />
    </div>
  );
}
