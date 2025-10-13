/**
 * 색상 토큰 상수
 * Figma Foundation 기반으로 생성됨
 */

export const colors = {
  // Blue
  blue: {
    5: "#F0F7FF",
    10: "#DBEEFF",
    20: "#BDDBFF",
    30: "#93BEFF",
    40: "#6DA5FA",
    50: "#497CFF",
    60: "#3A5CF3",
    70: "#274AE1",
    80: "#1530A6",
    90: "#0B2184",
  },

  // Gray
  gray: {
    white: "#FFFFFF",
    5: "#F2F2F2",
    10: "#E4E4E4",
    20: "#D4D3D3",
    30: "#C7C7C7",
    40: "#ABABAB",
    50: "#919191",
    60: "#777777",
    70: "#5F5F5F",
    80: "#333333",
    90: "#1C1C1C",
    black: "#000000",
  },

  // Red
  red: {
    5: "#FDD7DC",
    10: "#F797A4",
    20: "#F4677A",
    30: "#F03851",
    40: "#E4112E",
    50: "#B40E24",
    60: "#850A1B",
  },

  // Green
  green: {
    5: "#D3F3E0",
    10: "#92E6B9",
    20: "#15D66F",
    30: "#12B75F",
    40: "#109C51",
    50: "#0E723C",
    60: "#084424",
  },

  // Yellow
  yellow: {
    5: "#FFE499",
    10: "#FFD666",
    20: "#FFC933",
    30: "#FFB300",
    40: "#EBA500",
    50: "#D69600",
    60: "#B27D00",
  },

  // Cool Gray
  coolGray: {
    1: "#F8F8FA",
    5: "#F6F6F9",
    10: "#EDEEF2",
    20: "#DDDFE5",
    30: "#D2D4DD",
    40: "#C7C9D5",
    50: "#BBBECD",
    60: "#B0B3C4",
  },

  // Gradients
  gradient: {
    primary: "linear-gradient(135deg, #6DA5FA 0%, #92EAF5 100%)",
    skeleton:
      "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 48.5%, rgba(255, 255, 255, 0) 100%)",
  },

  // 시맨틱 컬러 (용도별)
  semantic: {
    // System colors
    primary: "#6DA5FA",
    primaryDark: "#3A5CF3",

    // Status colors
    success: "#12B75F",
    error: "#F03851",
    warning: "#FFB300",

    // Text colors
    textPrimary: "#000000",
    textSecondary: "#777777",
    textTertiary: "#ABABAB",
    textInverse: "#FFFFFF",

    // Background colors
    bgPrimary: "#FFFFFF",
    bgSecondary: "#F2F2F2",
    bgTertiary: "#E4E4E4",

    // Border colors
    border: "#E4E4E4",
    borderDark: "#D4D3D3",
  },
} as const;

export type Colors = typeof colors;
export type ColorKey = keyof Colors;

// 다크모드 색상 (향후 확장용)
export const darkColors = {
  // 다크모드에서는 Gray 스케일을 반전
  gray: {
    white: "#000000",
    5: "#1C1C1C",
    10: "#333333",
    20: "#5F5F5F",
    30: "#777777",
    40: "#919191",
    50: "#ABABAB",
    60: "#C7C7C7",
    70: "#D4D3D3",
    80: "#E4E4E4",
    90: "#F2F2F2",
    black: "#FFFFFF",
  },

  semantic: {
    textPrimary: "#FFFFFF",
    textSecondary: "#C7C7C7",
    textTertiary: "#919191",
    textInverse: "#000000",

    bgPrimary: "#000000",
    bgSecondary: "#1C1C1C",
    bgTertiary: "#333333",

    border: "#333333",
    borderDark: "#5F5F5F",
  },
} as const;
