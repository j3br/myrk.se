import path from "path";
import { fileURLToPath } from "url";

import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";
import { readingTimeRemarkPlugin } from "./src/utils/frontmatter.mjs";

import SITE from "./src/config/site/config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: SITE.site,
  base: SITE.base,
  trailingSlash: SITE.trailingSlash ? "always" : "never",

  output: "static",

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    shikiConfig: {
      theme: "vesper",
    },
  },

  integrations: [UnoCSS({ injectReset: true })],
  vite: {
    optimizeDeps: {
      exclude: ["limax"],
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },
});
