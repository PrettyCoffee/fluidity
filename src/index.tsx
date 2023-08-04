import React, { StrictMode } from "react"

import { createRoot } from "react-dom/client"

import App from "./App"
import "./base/index.css"

const root = document.getElementById("root")

if (!root) throw new Error("Missing root node")

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)
