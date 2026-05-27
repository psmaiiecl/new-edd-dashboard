import "./index.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useModules from "../../hooks/useModules";
import { ModuleCard } from "../../../../components/ModuleCard";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { canSeeModule } from "./helpers/moduleConfig";

export function Menu() {
  const { getTipoUsuario } = useContext(AuthContext);
  const tipoUsuario = getTipoUsuario();
  const { modulesState } = useModules(tipoUsuario);

  return (
    <>
      <div className="module-menu">
        {modulesState
          .filter((m) => canSeeModule(tipoUsuario, m.key))
          .map((m) => (
            <ModuleCard
              key={m.key}
              title={m.title}
              action={m.action}
              loading={m.loading}
              locked={m.locked}
            >
              {!m.locked &&
                (m.render ? (
                  m.render()
                ) : (
                  <HighchartsReact options={m.chart} highcharts={Highcharts} />
                ))}
            </ModuleCard>
          ))}
      </div>
    </>
  );
}
