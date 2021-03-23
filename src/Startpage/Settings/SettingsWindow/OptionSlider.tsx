import React, { useEffect, useState } from 'react';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';

import * as Settings from "../settingsHandler";
import { IconButton } from "./IconButton";

const SliderWrapper = styled.div`
    height: 20px;
    width: 400px;
    display: flex;
    flex-direction: row;
    align-items: space-between;
    justify-content: space-between;
    padding:5px 0;
`;

type props = {
    values: { label: string, value: string }[],
    onChange: (value: string) => void,
    currentValue: string,
}

export const OptionSlider = ({ values, onChange, currentValue }: props) => {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        values.forEach((val, i) => {
            currentValue === val.value && i !== index && setIndex(i)
        })
    }, []);

    const handleChange = (newIndex: number) => {
        setIndex(newIndex);
        onChange(values[newIndex].value)
    }

    return (
        <SliderWrapper>
            <IconButton
                disabled={index <= 0}
                onClick={() => { handleChange(index - 1) }}
                icon={faAngleLeft}
            />

            {values[index].label}

            <IconButton
                disabled={index >= values.length - 1}
                onClick={() => handleChange(index + 1)}
                icon={faAngleRight}
            />
        </SliderWrapper>
    )
}