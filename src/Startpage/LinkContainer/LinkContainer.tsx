import React, { MouseEvent, useState } from "react"

import styled from "@emotion/styled"

import { AccordionContainer, AccordionGroup } from "./Accordion/Accordion"
import * as Settings from "../Settings/settingsHandler"

const LinkItem = styled.a`
  width: fit-content;
  white-space: nowrap;
  position: relative;
  padding: 10px 0 10px 30px;
  font-size: 1rem;

  ::before {
    position: absolute;
    left: 0px;
    bottom: 5px;
    z-index: 0;
    content: "";
    height: 5px;
    width: 100%;
    background-color: var(--accent-color);
    transition: 0.5s;
    opacity: 0.7;
  }

  :hover,
  :focus {
    color: var(--accent-color2);
    animation: text-flicker 0.01s ease 0s infinite alternate;
    outline: none;
  }
`

export const LinkContainer = () => {
  const [active, setActive] = useState(0)
  const linkGroups = Settings.Links.getWithFallback()

  const middleMouseHandler = (event: MouseEvent, groupIndex: number) => {
    setActive(groupIndex)
    if (event.button === 1) {
      linkGroups[groupIndex].links.forEach(link => {
        window.open(link.value, "_blank")
      })
    }
  }

  return (
    <AccordionContainer>
      {linkGroups.map((group, groupIndex) => (
        <AccordionGroup
          key={group.title}
          active={active === groupIndex}
          title={group.title}
          onClick={() => setActive(groupIndex)}
          onMouseDown={e => middleMouseHandler(e, groupIndex)}
        >
          {group.links.map(link => (
            <LinkItem
              tabIndex={active !== groupIndex ? -1 : undefined}
              key={link.label}
              href={link.value}
            >
              {link.label}
            </LinkItem>
          ))}
        </AccordionGroup>
      ))}
    </AccordionContainer>
  )
}
