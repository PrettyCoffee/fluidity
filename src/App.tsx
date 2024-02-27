import React from "react"

import "./base/variables.css"

import { Provider } from "react-redux"

import * as Settings from "./Startpage/Settings/settingsHandler"
import { Startpage } from "./Startpage/Startpage"
import { store } from "./store/root.store"

const App = () => {
  //Apply colors
  const root = document.documentElement
  const colors = Settings.Design.getWithFallback().colors
  Object.keys(colors).forEach(key => {
    root.style.setProperty(key, colors[key])
  })

  return (
    <Provider store={store}>
      <Startpage />
    </Provider>
  )
}

export default App
