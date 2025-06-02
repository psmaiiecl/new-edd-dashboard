import { useEffect, useState } from "react";
import {
  CAMBIO_LIST,
  CONVOCATORIA_LIST,
  ESTADO_LIST,
  SUSPENSION_LIST,
} from "../../../data/FilterList";
import {
  buildAvanceDiario,
  buildEvolucion,
} from "../../../utils/generalTabUtils";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";
import { renameObjectKey } from "../../../../../../../utils/RenameObjectKey";

export function useTabGeneral() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState({
    convocatoria: CONVOCATORIA_LIST[0],
    estado: ESTADO_LIST[0],
    nivel: CAMBIO_LIST[0],
    suspension: SUSPENSION_LIST[0],
  });
  const [docentesChart, setDocentesChart] = useState(null);
  const [solicitudesCambioChart, setSolicitudesCambioChart] = useState(null);
  const [solicitudesSuspensionChart, setSolicitudesSuspensionChart] =
    useState(null);
  const [estadoChart, setEstadoChart] = useState(null);
  const [causalesChart, setCausalesChart] = useState(null);
  const [avanceDocentePointChart, setAvanceDocentePointChart] = useState();
  const [evolucionCambioPointChart, setEvolucionCambioPointChart] =
    useState(null);
  const [evolucionSolicitudesChart, setEvolucionSolicitudesChart] =
    useState(null);

  const handleFilter = (key, option) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [key]: option,
    }));
  };

  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-validacion-general",
      formData: selectedFilter,
      shouldCache: true,
    }).then((data) => {
      setDocentesChart(mapPieData(data.validacion, mappers.docentes));
      setSolicitudesCambioChart(
        mapPieData(data.solicitudes_cambio_nivel, mappers.solicitudes)
      );
      setSolicitudesSuspensionChart(
        mapPieData(data.solicitudes_suspension, mappers.solicitudes)
      );
      setEvolucionSolicitudesChart(
        buildEvolucion(
          renameObjectKey(
            data.avance_diario_sol_susp_exim,
            "atendidos",
            "validado"
          )
        )
      );
      setEvolucionCambioPointChart(
        buildEvolucion(data.avance_diario_sol_cambio_nivel)
      );
      let replicate = null;
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const formattedDate = `${day}-${month}`;
      Object.keys(data.avance_diario).map((key) => {
        data.avance_diario[key] = replicate
          ? replicate
          : data.avance_diario[key];
        if (key === formattedDate) replicate = data.avance_diario[key];
      });
      setAvanceDocentePointChart(buildAvanceDiario(data.avance_diario));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  useEffect(() => {
    customFetch({
      route:
        BASE_API_URL_2025 + "/2025-validacion?endpoint=estado-participacion",
      shouldCache: true,
    }).then((data) => {
      setEstadoChart(
        mapPieData(data.participacion, mappers.estado_participacion)
      );
      setCausalesChart(mapPieData(data.causales, mappers.causales));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    selectedFilter,
    handleFilter,
    docentesChart,
    solicitudesCambioChart,
    solicitudesSuspensionChart,
    estadoChart,
    causalesChart,
    avanceDocentePointChart,
    evolucionCambioPointChart,
    evolucionSolicitudesChart,
  };
}
