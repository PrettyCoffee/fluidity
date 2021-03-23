import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { faTimes, faTrash, faSave, faFire } from '@fortawesome/free-solid-svg-icons'

import * as Settings from "../settingsHandler";
import { links, themes, searchSettings as defaultSearchSettings } from "../../../data/data";
import { IconButton } from "./IconButton";

import { GeneralSettings } from "./GeneralSettings/GeneralSettings"
import { DesignSettings } from "./DesignSettings/DesignSettings"
import { Changelog } from "./Changelog/Changelog"

const StyledSettingsWindow = styled.div`
    background-color: var(--bg-color);
    position: relative;
    border: 2px solid var(--default-color);
    width: 100%;
    height: 100%;
    padding: 60px 30px 30px 30px;
    box-shadow: 10px 10px 0px var(--accent-color);
`;
const WindowContent = styled.div`
    width: 100%;
    height: calc(100% - 80px);
    display:flex;
`;

const WindowHeader = styled.div`
    ::before{
        content:"Settings";
        margin: 5px 20px 0 10px;
    }
    color: var(--bg-color);
    background-color: var(--default-color);
    width:100%;
    height: 32px;
    position:absolute;
    left:0;
    top:0;
    display:flex;
    justify-content: space-between;
`;

const WindowFooter = styled.div`
    display:flex;
    justify-content: space-between;
    position:absolute;
    left:30px;
    right:30px;
    bottom:30px;
`;

export const StyledSettingsContent = styled.div`
    background-color: var(--bg-color);
    width:400px;
    height:100%;
    margin-right:30px;
    padding-right:20px;
    overflow-y: auto;
`;

export const SettingElement = styled.div`
    background-color: var(--bg-color);
    position: relative;
    padding: 10px 0px;
    z-index: 10;
    display:flex;
    justify-content: space-between;
`;

const CloseButton = styled(IconButton)`
    z-index:15;
    height:30px;
    opacity: 1;
    padding:0;
`;

export const SettingsButton = styled(IconButton)`
    background-color: var(--default-color);
    color: var(--bg-color);
    font-size: 1rem;
    padding: 10px 20px;
    :enabled:hover{
        animation: circling-shadow-small 2s ease 0s infinite normal;
    }
`;

const Tabbar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const TabOption = styled.button<{ active: boolean }>`
    font-size: 1rem;
    font-weight: 500;
    transition: .3s;
    height: 100%;
    min-width: 200px;
    display: flex;
    justify-content: center;
    align-items:center;
    background-color: transparent;
    outline: none;
    border: none;
    cursor: ${({ active }) => active ? "default" : "pointer"};
    ${({ active }) => active && "text-shadow: var(--text-shadow-downwards)"};
    :hover {
        text-shadow: var(--text-shadow-downwards);
    }
`;

type props = {
    hidePopup: () => void;
}

const TabOptions = [
    "General",
    "Appearance",
    "Changelog",
]

export const SettingsWindow = ({ hidePopup }: props) => {
    const [design, setDesign] = useState(themes[0]);
    const [currentTab, setCurrentTab] = useState(TabOptions[0]);
    const [linkGroups, setLinkGroups] = useState(links);
    const [searchSettings, setSearchSettings] = useState(defaultSearchSettings);

    useEffect(() => {
        try {
            const lsSearchSettings = Settings.Search.get();
            if (lsSearchSettings)
                setSearchSettings(lsSearchSettings);
        } catch { console.error("Your currently applied search settings appear to be corrupted.") }

        try {
            const lsDesign = Settings.Design.get();
            if (lsDesign)
                setDesign(lsDesign);
        } catch { console.error("Your currently applied design appears to be corrupted.") }

        try {
            const lsLinkGroups = Settings.Links.get();
            if (lsLinkGroups)
                setLinkGroups(lsLinkGroups);
        } catch { console.error("Your currently applied links appear to be corrupted.") }
    }, []);

    const applyValues = () => {
        Settings.Design.set(design);
        Settings.Search.set(searchSettings);
        Settings.Links.set(linkGroups);
        window.location.reload(false);
    };

    return (
        <StyledSettingsWindow>
            <WindowHeader>
                <Tabbar>
                    {TabOptions.map((option) =>
                        <TabOption key={option} active={option === currentTab} onClick={() => setCurrentTab(option)}>{option}</TabOption>
                    )}
                </Tabbar>
                <CloseButton
                    inverted={true}
                    onClick={() => hidePopup()}
                    icon={faTimes}
                />
            </WindowHeader>

            <WindowContent>
                {currentTab === "General" &&
                    <GeneralSettings
                        searchSettings={searchSettings}
                        setSearchSettings={setSearchSettings}
                        linkGroups={linkGroups}
                        setLinkGroups={setLinkGroups}
                    />}

                {currentTab === "Appearance" &&
                    <DesignSettings
                        design={design}
                        setDesign={setDesign}
                    />}

                {currentTab === "Changelog" && <Changelog />}
            </WindowContent>

            {currentTab !== "Changelog" &&
                <WindowFooter>
                    <SettingsButton
                        onClick={() => applyValues()}
                        text={"Apply Changes"}
                        icon={faSave}
                    />
                    <SettingsButton
                        onClick={() => {
                            window.location.reload(false);
                        }}
                        text={"Discard Changes"}
                        icon={faFire}
                    />
                    <SettingsButton
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload(false);
                        }}
                        text={"Delete All Settings"}
                        icon={faTrash}
                    />
                </WindowFooter>
            }
        </StyledSettingsWindow >
    )
}