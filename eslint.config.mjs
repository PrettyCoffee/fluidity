import prettyCozy from "@pretty-cozy/eslint-config"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig(
  prettyCozy.baseTs,
  prettyCozy.react,
  globalIgnores(["dist", "node_modules"]),

  {
    rules: {
      "@pretty-cozy/file-name-case": "off",
      "@pretty-cozy/directory-name-case": "off",
      "@typescript-eslint/consistent-type-imports": "off",
    },
  },

  prettyCozy.prettier
)
