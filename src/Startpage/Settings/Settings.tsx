import React, { useState } from "react"

import styled from "@emotion/styled"
import { faSlidersH } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { SettingsWindow } from "./SettingsWindow"

const SettingsPopupToggle = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 20px;

  color: var(--default-color);
  background-color: transparent;
  border: none;
  opacity: 0.3;

  cursor: pointer;
  transition: 0.3s;

  :hover {
    opacity: 0.5;
    color: var(--accent-color2);
    animation: box-flicker 0.01s ease 0s infinite alternate;
  }
  :focus {
    outline: none;
  }
`

const PopupCover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--bg-color);
  opacity: 0.7;
`

export const Settings = () => {
  const [showSettings, setShowSettings] = useState(false)

  const hidePopup = () => setShowSettings(false)

  return (
    <>
      <SettingsPopupToggle onClick={() => setShowSettings(true)}>
        <FontAwesomeIcon icon={faSlidersH} />
      </SettingsPopupToggle>
      {showSettings && (
        <>
          <PopupCover />
          <SettingsWindow hidePopup={hidePopup} />
        </>
      )}
    </>
  )
}
