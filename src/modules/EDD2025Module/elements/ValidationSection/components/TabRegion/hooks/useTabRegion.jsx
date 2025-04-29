import { useContext, useEffect } from "react"
import { AuthContext } from "../../../../../../../context/AuthContext"
import { getValidacionCambioNivelVistaRegion, getValidacionSolicitaSuspenderVistaRegion, getValidacionVistaRegion } from "../../../../../services/ValidationServices"

export function useTabRegion(){
     const {getToken} = useContext(AuthContext)
        useEffect(()=>{
            getValidacionVistaRegion(getToken())
            getValidacionCambioNivelVistaRegion(getToken())
            getValidacionSolicitaSuspenderVistaRegion(getToken())
        },[getToken])
}