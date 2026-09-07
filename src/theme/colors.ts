export const colors = {
  // Base surfaces
  background: "#F6F4EF",
  surface: "#FBFAF7",
  surfaceSubtle: "#EFEEE9",

  // Brand
  primary: "#657568",
  primarySoft: "#E3E8E2",

  // Borders
  border: "#DDDAD2",
  borderStrong: "#CBC7BD",

  // Text
  textPrimary: "#292824",
  textSecondary: "#6F6B63",
  textTertiary: "#98938A",
  textInverse: "#FBFAF7",

  // Semantic
  success: "#687C68",
  successSoft: "#E5EBE4",

  warning: "#9A8560",
  warningSoft: "#F0EADF",

  danger: "#9A6863",
  dangerSoft: "#F1E4E2",

  // Utility
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",

  // Overlay
  overlay: "rgba(41, 40, 36, 0.08)",
  overlayStrong: "rgba(41, 40, 36, 0.16)",
} as const;

export type Color = keyof typeof colors;
