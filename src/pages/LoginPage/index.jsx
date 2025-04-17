import "./index.css";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useLogin } from "./hooks/useLogin";
import { AuthContext } from "../../context/AuthContext";
import { LoadingContext } from "../../context/LoadingContext";
import { NotificationContext } from "../../context/NotificationContext";
import { LoginHeader } from "./components/LoginHeader";
import { LoginFooter } from "./components/LoginFooter";
import { Button } from "../../components/Button";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { notificate } = useContext(NotificationContext);
  const { queueLoading, dequeueLoading } = useContext(LoadingContext);
  const { user, password, handleUser, handlePassword, fieldsEmpty } =
    useLogin();
  return (
    <div className="login-layout">
      <div className="login-background"></div>
      <LoginHeader />
      <div className="login-body">
        <div className="login-welcome">
          <h1 className="roboto-bold">¡Bienvenido(a)!</h1>
          <p className="roboto-regular">
            El Sistema de Evaluación del Desempeño Profesional Docente (o
            Evaluación Docente) es una evaluación obligatoria para los y las
            docentes, educadoras y educadores de aula que se desempeñan en
            establecimientos municipales a lo largo del país. Su objetivo es
            fortalecer la profesión docente y contribuir a mejorar la calidad de
            la educación.
          </p>
          <p className="roboto-regular">
            Entre los años 2003 y 2024 se han realizado más de 245.000
            evaluaciones correspondientes a Enseñanza Básica, Educación Media
            (incluyendo a docentes de especialidades Técnico Profesional),
            Educación Parvularia, Educación Especial y Educación de Adultos.
          </p>
        </div>

        <div className="login-container">
          <h2 className="roboto-regular">
            Ingresa tu <strong>Usuario</strong>
          </h2>
          <hr />
          <form className="login-form roboto-regular">
            <div className="login-field">
              <span className="login-field__label roboto-bold">Usuario:</span>
              <input
                className="login-field__input"
                type="text"
                id="user"
                placeholder="usuario123"
                autoComplete="username"
                onChange={(e) => handleUser(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter" || e.keyCode === 13) {
                    if (!fieldsEmpty())
                      login(
                        user,
                        password,
                        navigate,
                        notificate,
                        queueLoading,
                        dequeueLoading
                      );
                  }
                }}
              />
            </div>
            <div className="login-field">
              <span className="login-field__label roboto-bold">
                Contraseña:
              </span>
              <input
                className="login-field__input"
                type="password"
                id="password"
                placeholder="••••••••"
                autoComplete="current-password"
                onChange={(e) => handlePassword(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter" || e.keyCode === 13) {
                    if (!fieldsEmpty())
                      login(
                        user,
                        password,
                        navigate,
                        notificate,
                        queueLoading,
                        dequeueLoading
                      );
                  }
                }}
              />
            </div>
            <div className="login-actions">
              <Button
                text={"Iniciar sesión"}
                disabled={fieldsEmpty()}
                action={() =>
                  login(
                    user,
                    password,
                    navigate,
                    notificate,
                    queueLoading,
                    dequeueLoading
                  )
                }
              />
            </div>
          </form>
        </div>
      </div>
      <LoginFooter />
    </div>
  );
}
