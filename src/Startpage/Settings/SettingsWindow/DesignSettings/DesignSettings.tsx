import React from 'react';
import styled from '@emotion/styled';

import { StyledSettingsContent, SettingElement, SettingsButton, SettingsLabel } from "../SettingsWindow"
import { OptionSlider } from "../OptionSlider"
import { OptionTextInput } from "../OptionTextInput";
import { ColorPicker } from "./ColorPicker"
import { Theme } from '../../../../data/data';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

import { images } from "../../../../data/data";

const DesignPreview = styled.div<{ color: string }>`
    background-color:${({ color }) => color};
    display: flex;
    justify-content: space-evenly;
    align-items:center;
    border: 2px solid var(--accent-color);
    width: calc(100% - 400px);
    height: 100%;
    position: relative;
    ::before{
        content: "Design Preview";
        color: var(--accent-color);
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 0.8rem;
    }
`;
const ImagePreview = styled.img`
    margin: 10px; 
    height: 300px;
    width: 300px;
    border: 1px solid var(--default-color);
    padding: 5px;
    object-fit:cover;

    animation:circling-shadow-small 4s ease 0s infinite normal;
`;
const StyledAccordionPreview = styled.div< { color: string }>`
    border: 4px solid ${({ color }) => color};
    height: 300px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    ::before {
        content: "";
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 100%;
        background-color: ${({ color }) => color};
    }

   > .wave {
        width: 80px;
        height: 50px;
        position: absolute;
        top: 0px;
        overflow: hidden;
        ::before{
            content:"";
            width: 180px;
            height: 185px;
            position: absolute;
            top: -25%;
            left: 50%;
            margin-left: -90px;
            margin-top: -140px;
            border-radius: 37%;
            background: var(--bg-color);
            animation: wave 12s infinite cubic-bezier(0.71, 0.33, 0.33, 0.68);
        }
        @keyframes wave {
            from { transform: rotate(0deg);}
            from { transform: rotate(360deg);}
        }
    }
`;
const AccordionPreviewTitle = styled.h2`
    transform: rotate(90deg);
    min-width: max-content;
    color: var(--bg-color);
    transition: .5s;
    letter-spacing: 5px;
`;
const AccordionPreviewContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    margin: 10px;
    > * {
        margin-left: 30px;
    }
`;


const AccordionPreview = ({ title, color }: { title: string, color: string }) => {
    return <StyledAccordionPreview color={color}>
        <div className={"wave"} />
        <AccordionPreviewTitle>
            {title}
        </AccordionPreviewTitle>
    </StyledAccordionPreview>
}

type props = {
    design: Theme;
    setDesign: (design: Theme) => void;
}

export const DesignSettings = ({ design, setDesign }: props) => {
    return (
        <>
            <StyledSettingsContent>
                <SettingsLabel>Theme</SettingsLabel>
                <SettingElement>
                    <OptionSlider
                        currentValue={""}
                        values={[{ label: "Upcoming Feature", value: "" }]}
                        onChange={() => { }}
                    />
                </SettingElement>
                <SettingElement>
                    <OptionSlider
                        currentValue={design.image}
                        values={images}
                        onChange={(image) => setDesign({ ...design, image: image })}
                    />
                </SettingElement>
                <SettingElement>
                    <OptionTextInput
                        currentValue={design.image}
                        onChange={(image) => setDesign({ ...design, image: image })}
                    />
                </SettingElement>
                <SettingElement>
                    <ColorPicker
                        colors={design.colors}
                        setColors={(colors) => setDesign({ ...design, colors: colors })}
                    />
                </SettingElement>
                <SettingElement>
                    <SettingsButton
                        onClick={() => { }}
                        text={"Add Theme"}
                        icon={faPlus}
                        disabled
                    />
                    <SettingsButton
                        onClick={() => { }}
                        text={"Remove Theme"}
                        icon={faMinus}
                        disabled
                    />
                </SettingElement>
            </StyledSettingsContent>

            <DesignPreview color={design.colors["--bg-color"]} >
                <ImagePreview src={design.image} />
                <AccordionPreviewContainer>
                    <AccordionPreview title={"Default"} color={design.colors["--default-color"]} />
                    <AccordionPreview title={"Accent"} color={design.colors["--accent-color"]} />
                    <AccordionPreview title={"Accent 2"} color={design.colors["--accent-color2"]} />
                </AccordionPreviewContainer>
            </DesignPreview>
        </>
    )
}