import React, { useState } from "react";
import styled from "@emotion/styled";
import * as Settings from "../settingsHandler";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from "./IconButton";

const StyledOptionTextInput = styled.div`
    background-color: var(--bg-color);
    border: 2px solid var(--default-color);
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0 10px 20px;
    width:376px;
`;

const StyledInput = styled.input`
    background-color: var(--bg-color);
    color: var(--default-color);
    border: none;
    height:100%;
    outline:none;
    width: calc(100% - 82px);
`;

type props = {
    settingsKey: string,
    onChange: (value: string) => void,
}

export const OptionTextInput = ({ settingsKey, onChange }: props) => {
    const [value, setValue] = useState(Settings.getValue(settingsKey) || "");

    return <StyledOptionTextInput>
        <StyledInput
            type={"text"}
            onKeyUp={e => e.which === 13
                ? onChange(value)
                : setValue(e.currentTarget.value)
            }
            placeholder={"Picture URL"}
            defaultValue={value}
        />
        <IconButton icon={faCheck} onClick={(e) => onChange(value)} />
    </StyledOptionTextInput>
}