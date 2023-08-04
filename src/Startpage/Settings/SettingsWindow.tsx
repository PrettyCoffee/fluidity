import React, { useState } from "react"

import styled from "@emotion/styled"
import {
  faTimes,
  faTrash,
  faSave,
  faFire,
} from "@fortawesome/free-solid-svg-icons"

import { Changelog } from "./Changelog/Changelog"
import { DesignSettings } from "./DesignSettings/DesignSettings"
import { LinkSettings } from "./LinkSettings/LinkSettings"
import { SearchSettings } from "./SearchSettings/SearchSettings"
import * as Settings from "./settingsHandler"
import { IconButton } from "../../components/IconButton"

const StyledSettingsWindow = styled.div`
  background-color: var(--bg-color);
  position: absolute;

  top: var(--settings-window-gap);
  right: var(--settings-window-gap);
  bottom: var(--settings-window-gap);
  left: var(--settings-window-gap);

  border: 2px solid var(--default-color);
  padding: 60px 30px 30px 30px;
  box-shadow: 10px 10px 0px var(--accent-color);
`
const WindowContent = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
`

const WindowHeader = styled.div`
  ::before {
    content: "Settings";
    margin: 5px 20px 0 10px;
  }
  color: var(--bg-color);
  background-color: var(--default-color);
  width: 100%;
  height: 32px;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
`

const WindowFooter = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 30px;
  right: 30px;
  bottom: 30px;
`

export const StyledSettingsContent = styled.div`
  background-color: var(--bg-color);
  width: 400px;
  height: 100%;
  margin-right: 30px;
  padding-right: 20px;
  overflow-y: auto;
`
export const SettingsLabel = styled.p`
  font-size: 1rem;
  padding: 10px 0;
`

export const SettingElement = styled.div`
  background-color: var(--bg-color);
  position: relative;
  padding: 10px 0px;
  + {
    margin-top: 15px;
  }
`

const CloseButton = styled(IconButton)`
  z-index: 15;
  height: 30px;
  opacity: 1;
  padding: 0;
`

export const SettingsButton = styled(IconButton)`
  background-color: var(--default-color);
  color: var(--bg-color);
  font-size: 1rem;
  padding: 10px 20px;
  :enabled:hover {
    animation: circling-shadow-small 2s ease 0s infinite normal;
  }
`

const Tabbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const TabOption = styled.button<{ active: boolean }>`
  font-size: 1rem;
  font-weight: 500;
  transition: 0.3s;
  height: 100%;
  min-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: ${({ active }) => (active ? "default" : "pointer")};
  ${({ active }) => active && "text-shadow: var(--text-shadow-downwards)"};
  :hover {
    text-shadow: var(--text-shadow-downwards);
  }
`

const TabOptions = ["Links", "Appearance", "Searchbar", "Changelog"]

interface props {
  hidePopup: () => void
}

export const SettingsWindow = ({ hidePopup }: props) => {
  const [currentTab, setCurrentTab] = useState(TabOptions[0])
  const [design, setDesign] = useState(Settings.Design.getWithFallback())
  const [themes, setThemes] = useState(Settings.Themes.getWithFallback())
  const [linkGroups, setLinkGroups] = useState(Settings.Links.getWithFallback())
  const [searchSettings, setSearchSettings] = useState(
    Settings.Search.getWithFallback()
  )

  const applyValues = () => {
    Settings.Design.set(design)
    Settings.Themes.set(themes)
    Settings.Search.set(searchSettings)
    Settings.Links.set(linkGroups)
    window.location.reload()
  }

  return (
    <StyledSettingsWindow>
      <WindowHeader>
        <Tabbar>
          {TabOptions.map(option => (
            <TabOption
              key={option}
              active={option === currentTab}
              onClick={() => setCurrentTab(option)}
            >
              {option}
            </TabOption>
          ))}
        </Tabbar>
        <CloseButton inverted onClick={() => hidePopup()} icon={faTimes} />
      </WindowHeader>

      <WindowContent>
        {currentTab === "Links" && (
          <LinkSettings linkGroups={linkGroups} setLinkGroups={setLinkGroups} />
        )}

        {currentTab === "Appearance" && (
          <DesignSettings
            design={design}
            setDesign={setDesign}
            themes={themes}
            setThemes={setThemes}
          />
        )}

        {currentTab === "Searchbar" && (
          <SearchSettings
            searchSettings={searchSettings}
            setSearchSettings={setSearchSettings}
          />
        )}

        {currentTab === "Changelog" && <Changelog />}
      </WindowContent>

      <WindowFooter>
        <SettingsButton
          onClick={() => applyValues()}
          text={"Apply Changes"}
          icon={faSave}
        />
        <SettingsButton
          onClick={() => {
            window.location.reload()
          }}
          text={"Discard Changes"}
          icon={faFire}
        />
        <SettingsButton
          onClick={() => {
            localStorage.clear()
            window.location.reload()
          }}
          text={"Delete All Settings"}
          icon={faTrash}
        />
      </WindowFooter>
    </StyledSettingsWindow>
  )
}
