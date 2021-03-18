import React, { useState } from 'react';
import styled from '@emotion/styled';
import { faTimes, faSyncAlt, faTrash } from '@fortawesome/free-solid-svg-icons'

import * as Settings from "../settingsHandler";
import { OptionSlider } from "./OptionSlider";
import { OptionTextInput } from "./OptionTextInput";
import { OptionTextArea } from "./OptionTextArea";
import { searchEngines, images, links, colors } from "../../../data/data";
import { IconButton } from "./IconButton";
import { ColorPicker } from './ColorPicker';

const StyledSettingsWindow = styled.div`
    background-color: var(--bg-color);
    position: relative;
    border: 2px solid var(--default-color);
    width: 100%;
    height: 100%;
    padding: 60px 30px 30px 30px;
    box-shadow: 10px 10px 0px var(--accent-color);
    animation-fill-mode: both;
    display:flex;

    ::before{
        content:"Settings";
        color: var(--bg-color);
        padding: 5px 0 0 10px;
        background-color: var(--default-color);
        width:calc(100% - 10px);
        height: 25px;
        position:absolute;
        z-index:10;
        left:0;
        top:0;
    }
`;

const StyledSettingsContent = styled.div`
    background-color: var(--bg-color);
    width:400px;
    height:100%;
    margin-right:30px;
    padding-right:20px;
    overflow-y: auto;
`;

const SettingElement = styled.div`
    background-color: var(--bg-color);
    position: relative;
    padding: 10px 0px;
    z-index: 10;
    display:flex;
    justify-content: space-between;
`;

const CloseButton = styled(IconButton)`
    position: absolute;
    right:0px;
    top:0px;
    z-index:15;
    height:30px;
    opacity: 1;
    padding:0;
`;

const SettingsButton = styled(IconButton)`
    background-color: var(--default-color);
    color: var(--bg-color);
    font-size: 1rem;
    padding: 10px 20px;
    :enabled:hover{
        animation: circling-shadow-small 2s ease 0s infinite normal;
    }
`;

const ImagePreview = styled.img`
    margin: 10px 80px; 
    height:200px;
    width:200px;
    border: 1px solid var(--default-color);
    padding: 5px;
    object-fit:cover;

    animation:circling-shadow-small 4s ease 0s infinite normal;
`;

type props = {
    hidePopup: () => void;
}

export const SettingsWindow = ({ hidePopup }: props) => {
    const [newColors, setNewColors] = useState(Settings.getValue("colors") || JSON.stringify(colors));
    const [linkGroups, setLinkGroups] = useState(Settings.getValue("link-groups") || JSON.stringify(links, null, 4));
    const [image, setImage] = useState(Settings.getValue("image") || images[0].value);
    const [searchEngine, setSearchEngine] = useState(Settings.getValue("search-engine") || searchEngines[0].value);

    const setStorageValue = (settingsKey: string, value: any) => {
        Settings.setValue(settingsKey, value);
    }
    const applyValues = () => {
        setStorageValue("image", image);
        setStorageValue("search-engine", searchEngine);
        setStorageValue("colors", newColors);
        setStorageValue("link-groups", linkGroups);
        window.location.reload(false)
    };

    return (
        <StyledSettingsWindow>
            <CloseButton
                inverted={true}
                onClick={() => hidePopup()}
                icon={faTimes}
            />
            <StyledSettingsContent>
                <SettingElement>
                    <OptionSlider settingsKey={"search-engine"} values={searchEngines} onChange={setSearchEngine} />
                </SettingElement>
                <SettingElement>
                    <OptionSlider settingsKey={"image"} values={images} onChange={setImage} />
                </SettingElement>
                <SettingElement>
                    <OptionTextInput settingsKey={"image"} onChange={setImage} />
                </SettingElement>
                <SettingElement>
                    <ImagePreview src={image} />
                </SettingElement>
                <SettingElement>
                    <ColorPicker newColors={newColors} setNewColors={setNewColors} />
                </SettingElement>
                <SettingElement>
                    <SettingsButton
                        onClick={() => applyValues()}
                        text={"Apply"}
                        icon={faSyncAlt}
                    />
                    <SettingsButton
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload(false);
                        }}
                        text={"Reset"}
                        icon={faTrash}
                    />
                </SettingElement>
            </StyledSettingsContent>
            <OptionTextArea settingsKey={"link-groups"} onChange={setLinkGroups} initialValue={linkGroups} />
        </StyledSettingsWindow >
    )
}