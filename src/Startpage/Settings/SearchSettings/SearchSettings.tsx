import React from 'react';
import styled from "@emotion/styled";

import { SettingElement, SettingsLabel } from "../SettingsWindow"
import { OptionSlider } from "../../../components/OptionSlider"
import { searchEngines, Search } from "../../../data/data";
import { FastForwardSearch } from "./FastForwardSearch"

type props = {
    searchSettings: Search;
    setSearchSettings: (value: Search) => void;
}
export const SearchSettingsContent = styled.div`
    width: 100%;
    overflow-y: auto;
`;

export const SearchSettings = ({ searchSettings, setSearchSettings }: props) => {
    return (
        <SearchSettingsContent>
            <SettingsLabel>Searchbar</SettingsLabel>
            <SettingElement>
                <OptionSlider
                    currentValue={searchSettings.engine}
                    values={searchEngines}
                    onChange={(engine) => setSearchSettings({ ...searchSettings, engine: engine })}
                />
            </SettingElement>
            <br />
            <SettingsLabel>Fast Forward Search</SettingsLabel>
            <FastForwardSearch
                links={searchSettings.fastForward}
                onChange={(fastForward) => setSearchSettings({ ...searchSettings, fastForward: fastForward })}
            />
        </SearchSettingsContent>
    )
}