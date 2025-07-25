import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";

function useTabGeneral() {
  const customFetch = useCustomFetch();
  const [recuperacionGrabaciones, setRecuperacionGrabaciones] = useState(null);
  const [recuperacionSD, setRecuperacionSD] = useState(null);
  useEffect(() => {}, []);
  return {
    recuperacionGrabaciones,
    recuperacionSD,
  };
}

export default useTabGeneral;
