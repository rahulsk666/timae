import { appFontAssets } from "@/theme";
import { useFonts } from "expo-font";

export function useAppFonts() {
  return useFonts(appFontAssets);
}
