/* eslint-disable import/no-extraneous-dependencies */
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { checker } from "vite-plugin-checker"

export default defineConfig(() => {
  return {
    base: "./",
    build: {
      outDir: "build",
    },
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: "eslint ./src",
          dev: {
            logLevel: ["error"],
          },
        },
      }),
    ],
  }
})
