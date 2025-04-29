import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../../../../context/AuthContext";
import {
  getValidacionCambioNivelVistaConvocatoria,
  getValidacionSolicitaSuspenderVistaConvocatoria,
  getValidacionVistaConvocatoria,
} from "../../../../../services/ValidationServices";

export function useTabConvocatoria() {
  const { getToken } = useContext(AuthContext);
  useEffect(() => {
    getValidacionVistaConvocatoria(getToken());
    getValidacionCambioNivelVistaConvocatoria(getToken());
    getValidacionSolicitaSuspenderVistaConvocatoria(getToken());
  }, [getToken]);
}
