import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";

import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";

/**
 * App font family configuration.
 *
 * To switch or add fonts later:
 * 1. Install the matching @expo-google-fonts/* package.
 * 2. Add the font imports.
 * 3. Add the assets and faces entries below.
 */

const fontFamilyConfig = {
  inter: {
    family: "Inter",

    assets: {
      Inter_400Regular,
      Inter_500Medium,
      Inter_600SemiBold,
      Inter_700Bold,
      Inter_800ExtraBold,
    },

    faces: {
      regular: "Inter_400Regular",
      medium: "Inter_500Medium",
      semiBold: "Inter_600SemiBold",
      bold: "Inter_700Bold",
      extraBold: "Inter_800ExtraBold",
    },
  },

  manrope: {
    family: "Manrope",

    assets: {
      Manrope_400Regular,
      Manrope_500Medium,
      Manrope_600SemiBold,
      Manrope_700Bold,
      Manrope_800ExtraBold,
    },

    faces: {
      regular: "Manrope_400Regular",
      medium: "Manrope_500Medium",
      semiBold: "Manrope_600SemiBold",
      bold: "Manrope_700Bold",
      extraBold: "Manrope_800ExtraBold",
    },
  },
} as const;

export type FontFamily = keyof typeof fontFamilyConfig;
export type FontWeight = keyof typeof fontFamilyConfig.inter.faces;

/**
 * Font assets to pass into useFonts(...).
 */
export const appFontAssets = {
  ...fontFamilyConfig.inter.assets,
  ...fontFamilyConfig.manrope.assets,
};

/**
 * Semantic font-family tokens.
 *
 * Usage:
 * fontFamily: fonts.inter.bold
 * fontFamily: fonts.manrope.semiBold
 */
export const fonts = {
  inter: fontFamilyConfig.inter.faces,
  manrope: fontFamilyConfig.manrope.faces,
} as const;

/**
 * Resolve a font family + weight to a concrete fontFamily value.
 *
 * Examples:
 * font("inter", "regular")
 * font("manrope", "semiBold")
 * font("manrope", "bold")
 */
export function font(
  family: FontFamily = "inter",
  weight: FontWeight = "regular",
) {
  return fonts[family][weight];
}
