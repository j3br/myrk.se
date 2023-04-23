import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetTypography,
  presetWebFonts,
} from "unocss";

export default defineConfig({
  theme: {
    colors: {
      red: {
        "50": "#fef2f3",
        "100": "#fde3e4",
        "200": "#fccccf",
        "300": "#f9a8ad",
        "400": "#f4757c",
        "500": "#e83741",
        "600": "#d72b35",
        "700": "#b42129",
        "800": "#951f26",
        "900": "#7c2025",
      },
    },
  },
  presets: [
    presetIcons({
      extraProperties: {
        display: "inline-block",
        height: "1.2em",
        width: "1.2em",
        "vertical-align": "text-bottom",
      },
    }),
    presetAttributify(),
    presetUno(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: "Inter:400,600,800",
        mono: "DM Mono",
      },
    }),
  ],
});
