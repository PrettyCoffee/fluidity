import React, { useState } from 'react';
import { faPaintRoller } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styled from '@emotion/styled';
import { SettingsWindow } from "./SettingsWindow/SettingsWindow";

const SettingsPopupToggle = styled.button`
	position: fixed;
	top: 20px;
	right:-45px;

	padding: 10px 15px 10px 30px;
	font-size: 20px;
    border: none;
	border-radius: var(--border-radius);
	background-color: var(--default-color);
	color: var(--bg-color);
	opacity: 0.3;

	cursor: pointer;
	transition: .3s;

    :hover{
        opacity: 1;
        right:-5px;
        padding: 10px 30px 10px 15px;
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
                <FontAwesomeIcon icon={faPaintRoller} />
            </SettingsPopupToggle>
            {showSettings && (
                <SettingsWrapper>
                    <PopupCover onClick={() => hidePopup()} />
                    <SettingsWindow hidePopup={hidePopup} />
                </SettingsWrapper>
            )}
        </>
    )
}