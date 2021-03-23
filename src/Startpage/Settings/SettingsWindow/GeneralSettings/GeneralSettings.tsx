import React from 'react';

import { SettingElement, StyledSettingsContent } from "../SettingsWindow"
import { OptionSlider } from "../OptionSlider"
import { searchEngines, linkGroup, Search } from "../../../../data/data";
import { OptionTextArea } from "./OptionTextArea";
import * as Settings from "../../settingsHandler";

type props = {
    searchSettings: Search;
    setSearchSettings: (value: Search) => void;
    linkGroups: linkGroup[];
    setLinkGroups: (value: linkGroup[]) => void;
}

export const GeneralSettings = ({ searchSettings, setSearchSettings, linkGroups, setLinkGroups }: props) => {
    let currentEngine = Settings.Search.get()?.engine || searchEngines[0].value;

    return (
        <>
            <StyledSettingsContent>
                <SettingElement>
                    <OptionSlider
                        currentValue={currentEngine}
                        values={searchEngines}
                        onChange={(engine) => setSearchSettings({ ...searchSettings, engine: engine })}
                    />
                </SettingElement>
            </StyledSettingsContent>
            <OptionTextArea onChange={setLinkGroups} initialValue={linkGroups} />
        </ >
    )
}