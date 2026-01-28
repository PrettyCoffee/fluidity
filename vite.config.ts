/* eslint-disable import/no-extraneous-dependencies */
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig(() => {
  return {
    base: "./",
    plugins: [react()],
  }
})
