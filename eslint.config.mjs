import prettyCozy from "@pretty-cozy/eslint-config"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig(
  prettyCozy.baseTs,
  prettyCozy.react,
  globalIgnores(["dist", "node_modules"]),

  {
    rules: {
      "checkFile/filename-naming-convention": "off",
      "checkFile/folder-naming-convention": "off",
    },
  },

  prettyCozy.prettier
)
