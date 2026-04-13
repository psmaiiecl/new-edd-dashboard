import "./index.css";
import { useNavigate } from "react-router";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useModules from "../../hooks/useModules";
import { ModuleCard } from "../../../../components/ModuleCard";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { canSeeModule } from "./helpers/moduleConfig";

export function Menu() {
  const navigate = useNavigate();
  const { getTipoUsuario } = useContext(AuthContext);
  const tipoUsuario = getTipoUsuario();
  const { cardCharts, loadingStatus } = useModules(tipoUsuario);

  const modules = [
    {
      key: "representantes_legales",
      title: "Representantes Legales",
      action: () => navigate("representantes-legales"),
      chartKey: "representantes_legales",
      locked: true
    },
    {
      key: "inscripcion",
      title: "Inscripción",
      action: () => navigate("inscripcion"),
      chartKey: "inscripcion",
      locked: true
    },
    {
      key: "validacion",
      title: "Validación",
      action: () => navigate("validacion"),
      chartKey: "validacion",
      locked: true
    },
    {
      key: "resultados",
      title: "Entrega de Resultados",
      action: () => navigate("resultados"),
      chartKey: "resultados",
      locked: true
    },
    {
      key: "portafolio",
      title: "Portafolio",
      action: () => navigate("portafolio"),
      chartKey: "portafolio",
      locked: true
    },
    {
      key: "agendamiento",
      title: "Agendamiento de Grabaciones",
      action: () => navigate("agendamiento-grabaciones"),
      chartKey: "agendamiento",
      locked: true
    },
    {
      key: "grabaciones",
      title: "Grabaciones",
      action: () => navigate("grabaciones"),
      chartKey: "grabaciones",
      locked: true
    },
    {
      key: "recuperacion",
      title: "Recuperación de SD's",
      action: () =>
        window.open(
          "https://analytics.zoho.com/open-view/2835166000007221945/7fbffad3f812038aa551fb6cea9cde8a",
          "_blank"
        ),
      chartKey: "recuperacion",
      locked: true
    },
    {
      key: "procesamiento",
      title: "Procesamiento de Grabaciones",
      action: () => navigate("procesamiento"),
      chartKey: "procesamiento",
      locked: true
    },
    {
      key: "correccion_postulaciones",
      title: "Corrección Postulaciones",
      action: () => navigate("correccion-postulaciones"),
      chartKey: "correccion_postulaciones",
      locked: true
    },
    {
      key: "correccion_portafolios",
      title: "Corrección Portafolios",
      action: () => navigate("correccion-portafolios"),
      chartKey: "correccion_portafolios",
      locked: true
    },
    {
      key: "ayuda",
      title: "Mesa de Ayuda - Tickets",
      action: () =>
        window.open(
          "https://analytics.zoho.com/open-view/2835166000003030282",
          "_blank"
        ),
      chartKey: "ayuda",
      locked: true
    },
  ];

  return (
    <>
      {/* <div className="module-menu__title roboto-light">
        <span>Seleccione el módulo al que desea ingresar</span>
        <hr />
      </div> */}

      <div className="module-menu">
        {modules
          .filter((m) => canSeeModule(tipoUsuario, m.key))
          .map((m) => (
            <ModuleCard
              key={m.key}
              title={m.title}
              action={m.action}
              loading={loadingStatus[m.key]}
              locked={m.locked}
            >
              <HighchartsReact
                options={cardCharts[m.chartKey]}
                highcharts={Highcharts}
              />
            </ModuleCard>
          ))}
      </div>
    </>
  );
}
