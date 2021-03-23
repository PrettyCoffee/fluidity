import React, { useState } from 'react';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styled from '@emotion/styled';
import { SettingsWindow } from "./SettingsWindow/SettingsWindow";

const SettingsPopupToggle = styled.button`
	position: fixed;
	top: 20px;
	right:20px;
	font-size: 20px;

	color: var(--default-color);
    background-color:transparent;
    border:none;
	opacity: 0.3;

	cursor: pointer;
	transition: .3s;

    :hover{
        opacity: .5;
        color: var(--accent-color2);
        animation:box-flicker 0.01s ease 0s infinite alternate;
    }
    :focus{
        outline: none;
    }
`;

const PopupCover = styled.div`
    position: fixed;
	left:0px;
    width:100%;
    height:100%;
    background-color: var(--bg-color);
    opacity: 0.7;
`;

const SettingsWrapper = styled.div`
    position: absolute;
	top:0px;
    left:0px;
    right:0px;
    bottom:0px;
    padding:100px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

export const Settings = () => {
    const [showSettings, setShowSettings] = useState(false)

    const hidePopup = () => setShowSettings(false);

    return (
        <>
            <SettingsPopupToggle onClick={() => setShowSettings(true)}>
                <FontAwesomeIcon icon={faSlidersH} />
            </SettingsPopupToggle>
            {showSettings && (
                <SettingsWrapper>
                    <PopupCover onClick={() => {/*hidePopup()*/ }} />
                    <SettingsWindow hidePopup={hidePopup} />
                </SettingsWrapper>
            )}
        </>
    )
}