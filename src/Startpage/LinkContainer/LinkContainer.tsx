import React, { useState } from 'react';
import styled from "@emotion/styled";
import { AccordionContainer, AccordionGroup } from './Accordion/Accordion';
import * as Settings from "../Settings/settingsHandler";
import { linkGroup, links } from "../../data/data";

const LinkItem = styled.a`
    width: fit-content;
    white-space: nowrap;
    position:relative;
    padding: 10px 0 10px 30px;
    font-size:1rem;
    transition:.5s;

    ::before{
        position:absolute;
        left:0px;
        bottom:5px;
        z-index:0;
        content: "";
        height:5px;
        width:100%;
        background-color: var(--accent-color);
        transition:.5s;
        opacity:.7;
    }

    :hover {
        color: var(--accent-color2);
        animation:text-flicker 0.01s ease 0s infinite alternate;
    }

`;

export const LinkContainer = () => {
    const [active, setActive] = useState(0);
    let linkGroups: linkGroup[] = links;
    try {
        const lsLinks = Settings.Links.get();
        if (lsLinks)
            linkGroups = lsLinks;
    }
    catch { console.error("Links could not be loaded."); }

    console.log(linkGroups);

    return <AccordionContainer>
        {linkGroups.map((group, groupIndex) =>
            <AccordionGroup key={"AccordionGroup" + groupIndex} active={active === groupIndex} title={group.title} onClick={() => setActive(groupIndex)}>
                {group.links.map((link, linkIndex) =>
                    <LinkItem key={"LinkItem" + linkIndex} href={link.value}>{link.label}</LinkItem>
                )}
            </AccordionGroup>
        )}
    </AccordionContainer>
}