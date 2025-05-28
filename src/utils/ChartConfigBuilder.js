import { BAR_CONFIG, DOT_CONFIG, PIE_CONFIG } from "../constants/CHART_CONFIGS";

export function initPieChartConfig(subtitle, override = {}) {
  return {
    ...PIE_CONFIG,
    subtitle: {
      ...PIE_CONFIG.subtitle,
      text: subtitle,
    },
    ...override,
  };
}

export function DotConfigBuilder(title, override = {}) {
  return {
    ...DOT_CONFIG,
    title:{
      ...DOT_CONFIG.title,
      text: title,
    },
    ...override,
  };

};

export function BarConfigBuilder(subtitle, height, override = {}){
  return {
    ...BAR_CONFIG,
    chart: {
      ...BAR_CONFIG.chart,
      height: height || BAR_CONFIG.chart.height,
    },
    subtitle: {
      ...PIE_CONFIG.subtitle,
      text: subtitle,
    },
    ...override,
  }
}
