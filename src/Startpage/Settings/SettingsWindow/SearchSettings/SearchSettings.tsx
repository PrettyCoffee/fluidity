import React from 'react';
import styled from "@emotion/styled";

import { SettingElement, SettingsLabel } from "../SettingsWindow"
import { OptionSlider } from "../OptionSlider"
import { searchEngines, Search } from "../../../../data/data";
import * as Settings from "../../settingsHandler";

type props = {
    searchSettings: Search;
    setSearchSettings: (value: Search) => void;
}
export const SearchSettingsContent = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 40px;
`;

export const SearchSettings = ({ searchSettings, setSearchSettings }: props) => {
    let currentEngine = Settings.Search.get()?.engine || searchEngines[0].value;

    return (
        <SearchSettingsContent>
            <div>
                <SettingsLabel>Searchbar</SettingsLabel>
                <SettingElement>
                    <OptionSlider
                        currentValue={currentEngine}
                        values={searchEngines}
                        onChange={(engine) => setSearchSettings({ ...searchSettings, engine: engine })}
                    />
                </SettingElement>
                <br />
                <SettingsLabel>More settings comming soon</SettingsLabel>
            </div>
        </SearchSettingsContent>
    )
}