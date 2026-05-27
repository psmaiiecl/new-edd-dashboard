import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../hooks/useCustomFetch";
import { BASE_API_URL_2026 } from "../../../../constants/BASE_API_URL";
import { Button } from "../../../../components/Button";

export default function BusquedaPersona2026() {
  const customFetch = useCustomFetch();
  const [input, setInput] = useState();
  const [perfiles, setPerfiles] = useState([]);
  const fetchPerfiles = async()=>{
    const data = await customFetch({
      route:
        BASE_API_URL_2026 + "/integraciones/busqueda/persona?rut=" + input,
      method: "GET",
    })
    setPerfiles(data);
  }

  return (
    <>
      <div>busqueda</div>
      <input type="text" onChange={(e) => setInput(e.target.value)} />
      <div style={{width: '100px', height: '100px'}}>
        <Button text={"Buscar"}
        action={fetchPerfiles}/>
      </div>
      {perfiles.map((p) => {
        return (
          <div style={{backgroundColor: '#ec928a', marginBottom: "10px"}}>
            {Object.keys(p).map((key) => {
              return (
                <div>
                  <span>{key}</span>
                  <span>{p[key]}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
