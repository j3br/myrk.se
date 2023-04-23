import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import UnoCSS from "unocss/astro";

import SITE from "./src/config/site/config.mjs";

export default defineConfig({
  site: SITE.site,
  base: SITE.base,
  trailingSlash: SITE.trailingSlash ? "always" : "never",

  output: "static",

  integrations: [
    UnoCSS({ injectReset: true }),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
});
