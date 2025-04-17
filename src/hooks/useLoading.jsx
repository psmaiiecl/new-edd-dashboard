import { useState } from "react";

export function useLoading() {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    setLoading((prev) => !prev);
  };
  return { loading, toggleLoading };
}
