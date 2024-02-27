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
    server: {
      proxy: {
        '/search':
            { target: 'https://ac.duckduckgo.com/ac/?q=',
              changeOrigin: true,
              secure: false,
            },
      }
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
