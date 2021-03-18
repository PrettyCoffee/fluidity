import React from "react";
import styled from "@emotion/styled";

const StyledOptionTextArea = styled.div`
    background-color: var(--bg-color);
    border: 2px solid var(--default-color);
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0 10px 20px;
    width:calc(100% - 450px);
    height:calc(100% - 30px);
`;

const StyledTextArea = styled.textarea`
    background-color: var(--bg-color);
    color: var(--default-color);
    border: none;
    height: 100%;
    outline: none;
    width: 100%;
    resize: none;
`;

type props = {
    initialValue: string,
    settingsKey: string,
    onChange: (value: string) => void,
}

const placeholder = JSON.stringify(
    [
        {
            title: "Title",
            links: [
                {
                    label: "label",
                    value: "url",
                },
                {
                    label: "label",
                    value: "url",
                },
                {
                    label: "label",
                    value: "url",
                },
            ]
        },
    ], null, 4);

export const OptionTextArea = ({ initialValue, settingsKey, onChange }: props) => {

    return <StyledOptionTextArea>
        <StyledTextArea
            onKeyUp={e => onChange(e.currentTarget.value)}
            placeholder={placeholder}
            defaultValue={initialValue}
        />
    </StyledOptionTextArea>
}