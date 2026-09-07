import { Platform } from "react-native";

export const shadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  subtle: {
    shadowColor: "#292824",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: Platform.OS === "ios" ? 0.04 : 0,
    shadowRadius: 4,
    elevation: Platform.OS === "android" ? 1 : 0,
  },

  soft: {
    shadowColor: "#292824",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: Platform.OS === "ios" ? 0.06 : 0,
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 2 : 0,
  },
} as const;
