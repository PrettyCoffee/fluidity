import React from 'react';
import styled from "@emotion/styled";

import { SettingsLabel } from "../SettingsWindow"
import { linkGroup } from "../../../data/data";
import { OptionTextArea } from "./OptionTextArea";

type props = {
    linkGroups: linkGroup[];
    setLinkGroups: (value: linkGroup[]) => void;
}
export const GeneralSettingsContent = styled.div`
    width: 100%;
`;

export const LinkSettings = ({ linkGroups, setLinkGroups }: props) => {

    return (
        <GeneralSettingsContent>
            <SettingsLabel>Links</SettingsLabel>
            <OptionTextArea onChange={setLinkGroups} initialValue={linkGroups} />
        </GeneralSettingsContent>
    )
}