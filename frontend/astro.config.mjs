// @ts-check
import { defineConfig, envField } from "astro/config";

import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",

  env: {
    schema: {
      API_TOURNAMENTS_GET: envField.string({
        context: "server",
        access: "public",
      }),
      API_MATCHES_GET: envField.string({
        context: "server",
        access: "public",
      }),
    },
  },

  integrations: [react({})],
  adapter: vercel(),
});