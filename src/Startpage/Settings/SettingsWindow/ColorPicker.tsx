import React, { useState } from 'react';
import styled from '@emotion/styled';
import { MaterialPicker, ColorResult } from "react-color";

import { colors } from "../../../data/data";


const ColorPickerContainer = styled.div`
    height: 200px;
    display: flex;
    > div {
        padding: 0 10px;
        width: 180px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

const ColorOption = styled.div<{ active: boolean }>`
    width: 100%;
    padding: 5px 0;
    cursor: pointer;
    opacity: ${({ active }) => !active && "0.7"};
    color: ${({ active }) => active && "var(--accent-color)"};
    :hover {
        color: var(--accent-color2);
        animation:text-flicker 0.01s ease 0s infinite alternate;
    }
`;

const StyledMaterialPicker = styled.div`
    > div * {
        background-color: var(--bg-color)!important;
        color: var(--default-color)!important;
        box-shadow: none;
    }
    > div{
        border: 2px solid var(--default-color);
    }
`;
type props = {
    newColors: string,
    setNewColors: (value: string) => void
}

export const ColorPicker = ({ newColors, setNewColors }: props) => {
    const [currentColor, setCurrentColor] = useState(Object.keys(colors)[0]);

    /* I hate this fucking function, go fucking kill yourself */
    const theFUCKINGcolors = JSON.parse(newColors);

    const handleChange = (result: ColorResult) => {
        let tmp = { ...theFUCKINGcolors };
        tmp[currentColor] = result.hex;
        setNewColors(JSON.stringify(tmp));
    }

    return (
        <ColorPickerContainer>
            <div>
                {Object.keys(colors).map((key) =>
                    <ColorOption key={key} active={key === currentColor} onClick={() => setCurrentColor(key)}>{key}</ColorOption>
                )}
            </div>
            <StyledMaterialPicker>
                <MaterialPicker color={theFUCKINGcolors[currentColor]} onChange={(c) => c && handleChange(c)} />
            </StyledMaterialPicker>
        </ColorPickerContainer>
    )
}
