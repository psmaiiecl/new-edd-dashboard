import "./index.css";
import { useNavigate } from "react-router";
import BackIcon from "../../assets/icons/back.svg";

export function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="go-back-button" onClick={() => navigate(-1)}>
      <img src={BackIcon} />
    </div>
  );
}
