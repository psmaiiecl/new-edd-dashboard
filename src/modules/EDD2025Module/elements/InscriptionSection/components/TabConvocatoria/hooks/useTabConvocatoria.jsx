import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mapDocentesDependencia } from "../../../utils/dependenciaTabUtils";
import { mappers } from "../../../utils/mapSpecs";

export function useTabConvocatoria() {
  const customFetch = useCustomFetch();
  const [docentes, setDocentes] = useState(null);

  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-inscripcion-convocatoria",
      shouldCache: true
    }).then((data)=>{
      setDocentes(
        mapDocentesDependencia({
          data: data.docentes,
          schema: mappers.docentes_dependencia.series
        })
      )
    });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { docentes }
}
