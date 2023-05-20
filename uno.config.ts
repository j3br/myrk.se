import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetTypography,
  presetWebFonts,
} from "unocss";
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  theme: {
    colors: {
      'gray': {
        '50': '#f7f7f7',
        '100': '#e3e3e3',
        '200': '#c8c8c8',
        '300': '#a4a4a4',
        '400': '#818181',
        '500': '#666666',
        '600': '#515151',
        '700': '#444444',
        '800': '#383838',
        '900': '#313131',
        '950': '#1a1a1a',
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
  transformers: [
    transformerDirectives(),
  ]
});
