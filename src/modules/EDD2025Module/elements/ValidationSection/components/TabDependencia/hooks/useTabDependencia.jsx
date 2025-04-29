import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from '../../../../../../../context/AuthContext';
import { getValidacionCambioNivelVistaDependencia, getValidacionSolicitaSuspenderVistaDependencia, getValidacionVistaDependencia } from "../../../../../services/ValidationServices";

export function useTabDependencia(){
    const {getToken} = useContext(AuthContext)
    useEffect(()=>{
        getValidacionVistaDependencia(getToken())
        getValidacionCambioNivelVistaDependencia(getToken())
        getValidacionSolicitaSuspenderVistaDependencia(getToken())
    },[getToken])

}