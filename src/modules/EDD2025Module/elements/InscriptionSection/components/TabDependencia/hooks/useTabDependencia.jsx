import { useEffect, useState } from "react";
import { mapDocentesDependencia } from "../../../utils/dependenciaTabUtils";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mappers } from "../../../utils/mapSpecs";

export function useTabDependencia() {
  const customFetch = useCustomFetch();
  const [docentesDependencia, setDocentesDependencia] = useState(null);
  const [sostenedoresDependencia, setSostenedoresDependencia] = useState(null);

  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-inscripcion-dependencia",
      shouldCache: true,
    }).then((data) => {
      setDocentesDependencia(
        mapDocentesDependencia({
          data: data.docentes,
          schema: mappers.docentes_dependencia.series,
        })
      );
      setSostenedoresDependencia(
        mapDocentesDependencia({
          data: data.sostenedores,
          schema: mappers.sostenedores_dependencia.series,
          invert: true,
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    docentesDependencia,
    sostenedoresDependencia,
  };
}

//130 LINEAS
