import { BASE_CHART_CONFIG, PIE_CONFIG } from "../constants/CHART_CONFIGS";

export function PieConfigBuilder(subtitle, options = {}) {
  return {
    ...BASE_CHART_CONFIG,
    ...PIE_CONFIG,
    subtitle: {
      ...PIE_CONFIG.subtitle,
      text: subtitle,
    },
    ...options,
  };
}
