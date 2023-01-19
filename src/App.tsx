import React from "react"

import "./base/variables.css"

import * as Settings from "./Startpage/Settings/settingsHandler"
import { Startpage } from "./Startpage/Startpage"

const App = () => {
  //Apply colors
  const root = document.documentElement
  const colors = Settings.Design.getWithFallback().colors
  Object.keys(colors).forEach(key => {
    root.style.setProperty(key, colors[key])
  })

  return <Startpage />
}

export default App
