import React from "react"

import styled from "@emotion/styled"

import { FastForwardSearch } from "./FastForwardSearch"
import { OptionSlider } from "../../../components/OptionSlider"
import { OptionTextInput } from "../../../components/OptionTextInput"
import { searchEngines, Search } from "../../../data/data"
import { queryToken } from "../../Searchbar/Searchbar"
import { SettingElement, SettingsLabel } from "../SettingsWindow"

interface props {
  searchSettings: Search
  setSearchSettings: (value: Search) => void
}
export const SearchSettingsContent = styled.div`
  width: 100%;
  overflow-y: auto;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  padding-right: 40px;
  gap: 12px;
`

const TextInput = styled(OptionTextInput)`
  width: 100%;
  height: 40px;
  padding-top: 0;
  padding-bottom: 0;
`

export const SearchSettings = ({
  searchSettings,
  setSearchSettings,
}: props) => {
  const setEngine = (engine: string) => {
    setSearchSettings({ ...searchSettings, engine: engine })
  }

  return (
    <SearchSettingsContent>
      <SettingsLabel>Searchbar</SettingsLabel>
      <SettingElement>
        <Flex>
          <OptionSlider
            currentValue={searchSettings.engine}
            values={searchEngines}
            onChange={setEngine}
          />
          <TextInput
            value={searchSettings.engine}
            onChange={setEngine}
            placeholder={`Engine url (${queryToken} for query placement)`}
          />
        </Flex>
      </SettingElement>
      <br />
      <SettingsLabel>Fast Forward Search</SettingsLabel>
      <FastForwardSearch
        links={searchSettings.fastForward}
        onChange={fastForward =>
          setSearchSettings({ ...searchSettings, fastForward: fastForward })
        }
      />
    </SearchSettingsContent>
  )
}
