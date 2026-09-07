import { appFontAssets } from "@/theme/fonts";
import { useFonts } from "expo-font";

export function useAppFonts() {
  return useFonts(appFontAssets);
}
