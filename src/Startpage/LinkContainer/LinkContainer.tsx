import React, { MouseEvent, useEffect, useState } from "react"

import styled from "@emotion/styled"
import { useSelector } from "react-redux"

import { AccordionContainer, AccordionGroup } from "./Accordion/Accordion"
import { RootStore } from "../../store/root.store"
import * as Settings from "../Settings/settingsHandler"

interface LinkItemPropsInterface {
  active?: boolean
}

const LinkItem = styled.a<LinkItemPropsInterface>`
  width: fit-content;
  white-space: nowrap;
  position: relative;
  padding: 10px 0 10px 30px;
  font-size: 1rem;

  @media (max-width: 700px) {
    width: 100%;
    text-align: left;
  }

  color: ${props => props.active && "#fff"};

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
  :visited {
    color: ${props => (props.active ? "#fff" : "inherit")};
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
  const [linkGroups, setLinkGroups] = useState(Settings.Links.getWithFallback())

  const middleMouseHandler = (event: MouseEvent, groupIndex: number) => {
    setActive(groupIndex)
    if (event.button === 1) {
      linkGroups[groupIndex].links.forEach(link => {
        window.open(link.value, "_blank")
      })
    }
  }
  const search = useSelector((state: RootStore) => state.search).search

  const selectSuggested = () => {
    const newData = [...linkGroups]
    newData.forEach((group, groupIndex) => {
      group.links.forEach(link => {
        if (search === "") link.active = false
        else {
          if (
            link.label.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          ) {
            link.active = true
            setActive(groupIndex)
          } else {
            link.active = false
          }
        }
      })
    })
    setLinkGroups(newData)
  }

  useEffect(() => {
    selectSuggested()
  }, [search])

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
              active={link.active}
            >
              {link.label}
            </LinkItem>
          ))}
        </AccordionGroup>
      ))}
    </AccordionContainer>
  )
}
