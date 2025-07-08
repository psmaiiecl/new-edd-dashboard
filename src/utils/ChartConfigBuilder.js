import {
  BAR_CONFIG,
  COLUMN_CONFIG,
  DOT_CONFIG,
  MULTIPLE_BAR_CONFIG,
  PIE_CONFIG,
  STACK_BAR_CONFIG,
} from "../constants/CHART_CONFIGS";

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

export function initDotChartConfig(title, override = {}) {
  return {
    ...DOT_CONFIG,
    title: {
      ...DOT_CONFIG.title,
      text: title,
    },
    ...override,
  };
}

export function initBarChartConfig(subtitle, height, override = {}) {
  return {
    ...BAR_CONFIG,
    chart: {
      ...BAR_CONFIG.chart,
      height: height || BAR_CONFIG.chart.height,
    },
    subtitle: {
      ...BAR_CONFIG.subtitle,
      text: subtitle,
    },
    ...override,
  };
}

export function initColumnChartConfig(title, type, override = {}) {
  let baseConfig = COLUMN_CONFIG;
  switch (type) {
    case "STACK":
      baseConfig = STACK_BAR_CONFIG;
      break;
    case "MULTIPLE":
      baseConfig = MULTIPLE_BAR_CONFIG;
      break;
    default:
      break;
  }
  return {
    ...baseConfig,
    title: {
      ...baseConfig?.title,
      text: title,
    },
    ...override,
  };
}

export function BarConfigBuilder(subtitle, height, override = {}) {
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
  };
}
