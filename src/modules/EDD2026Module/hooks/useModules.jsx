import { useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useCustomFetch } from "../../../hooks/useCustomFetch";
import { canSeeModule } from "../elements/Menu/helpers/moduleConfig";
import { MODULE_CHART_SETUP } from "../../../constants/CONST";
import { BASE_API_URL_2026 } from "../../../constants/BASE_API_URL.JS";
import { buildRepresentantesLegalesModuleChart } from "../elements/Menu/utils/menuChartMappers";
import { useNavigate } from "react-router";
import { Search } from "lucide-react";

export default function useModules(userType) {
  const customFetch = useCustomFetch();
  const navigate = useNavigate();

  const modules = [
    {
      key: "resultados",
      title: "Entrega de Resultados",
      action: () => navigate("resultados"),
      locked: true,
    },
    {
      key: "representantes-legales",
      title: "Representantes Legales",
      action: () => navigate("representantes-legales"),
      dataKey: "representantes-legales",
      builder: buildRepresentantesLegalesModuleChart,
    },
    {
      key: "inscripcion",
      title: "Inscripción",
      action: () => navigate("inscripcion"),
      locked: true,
    },
    {
      key: "validacion",
      title: "Validación",
      action: () => navigate("validacion"),
      locked: true,
    },
    {
      key: "portafolio",
      title: "Portafolio",
      action: () => navigate("portafolio"),
      locked: true,
    },
    {
      key: "agendamiento",
      title: "Agendamiento de Grabaciones",
      action: () => navigate("agendamiento-grabaciones"),
      locked: true,
    },
    {
      key: "grabaciones",
      title: "Grabaciones",
      action: () => navigate("grabaciones"),
      locked: true,
    },
    {
      key: "recuperacion",
      title: "Recuperación de SD's",
      action: () =>
        window.open(
          "https://analytics.zoho.com/open-view/2835166000007221945/7fbffad3f812038aa551fb6cea9cde8a",
          "_blank",
        ),
      locked: true,
    },
    {
      key: "procesamiento",
      title: "Procesamiento de Grabaciones",
      action: () => navigate("procesamiento"),
      locked: true,
    },
    {
      key: "correccion_postulaciones",
      title: "Corrección Postulaciones",
      action: () => navigate("correccion-postulaciones"),
      locked: true,
    },
    {
      key: "correccion_portafolios",
      title: "Corrección Portafolios",
      action: () => navigate("correccion-portafolios"),
      locked: true,
    },
    {
      key: "ayuda",
      title: "Mesa de Ayuda - Tickets",
      action: () =>
        window.open(
          "https://analytics.zoho.com/open-view/2835166000003030282",
          "_blank",
        ),
      locked: true,
    },
    {
      key: "busqueda-perfiles",
      title: "Búsqueda de Perfiles",
      action: () => navigate("busqueda-perfiles"),
      render: () => (
        <div className="module-card__render">
          <Search size={100} strokeWidth={1.5} />
        </div>
      ),
    },
  ];

  const [modulesState, setModulesState] = useState(
    modules.map((m) => ({
      ...m,
      chart: { ...MODULE_CHART_SETUP },
      loading: false,
    })),
  );

  const shouldActuallyLoad = (module) => {
    return canSeeModule(userType, module.key) && !module.locked;
  };

  const fetchMenuData = async () => {
    try {
      const { data } = await customFetch({
        route: BASE_API_URL_2026 + "/menu/data",
        method: "GET",
        shouldCache: true,
        hasLoadPanel: false,
      });

      setModulesState((prev) =>
        prev.map((m) => {
          if (!shouldActuallyLoad(m)) return m;

          if (m.dataKey && m.builder && data[m.dataKey]) {
            return {
              ...m,
              chart: m.builder(data[m.dataKey]),
            };
          }

          return m;
        }),
      );
    } finally {
      setModulesState((prev) =>
        prev.map((m) => ({
          ...m,
          loading: false,
        })),
      );
    }
  };

  useEffect(() => {
    setModulesState((prev) =>
      prev.map((m) => ({
        ...m,
        loading: shouldActuallyLoad(m),
      })),
    );

    fetchMenuData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    modulesState,
  };
}
