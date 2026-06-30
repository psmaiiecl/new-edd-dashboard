import { useCustomFetch } from "./useCustomFetch";
import { BASE_API_URL_2026 } from "../constants/BASE_API_URL";

export function useQuickSightEmbed() {
  const customFetch = useCustomFetch();

  const openDashboard = async (dashboardId) => {
    const response = await customFetch({
      route: `${BASE_API_URL_2026}/integraciones/quicksight/embed-url?dashboard_id=${dashboardId}`,
      method: "GET",
    });
    if (response?.embed_url) {
      window.open(response.embed_url, "_blank");
    }
  };

  return { openDashboard };
}
