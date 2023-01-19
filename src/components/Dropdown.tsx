import React, { useState } from "react"

import styled from "@emotion/styled"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

import { IconButton } from "./IconButton"

const DropdownWrapper = styled.div`
  position: relative;
  height: 40px;
`

const DropdownButton = styled(IconButton)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 40px;
  width: calc(100% + 4px);
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: space-between;
  padding: 10px 20px;
  border: 2px solid var(--default-color);
  background-color: var(--bg-color);

  :enabled:hover,
  :focus,
  :hover {
    animation: none;
    opacity: 1;
  }
  font-size: initial;
  z-index: 10;
`

const DropdownPopup = styled.div<{ height: number; items: number }>`
  height: ${({ height }) => `${height}px`};
  position: absolute;
  left: 4px;
  top: 40px;
  width: calc(100% - 3px);
  background-color: var(--bg-color);
  overflow: hidden;
  z-index: 9;
  animation: box-flicker 0.01s ease 0s infinite alternate;
  transition: ${({ items }) => `${items * 0.1}s`};
  > div {
    padding-top: 5px;
    display: flex;
    flex-direction: column;
  }
`

const DropdownItem = styled(IconButton)`
  margin: 0;
  padding: 10px 20px;
  justify-content: flex-start;
  font-size: initial;
  :enabled:hover {
    animation: none;
    opacity: 1;
    background-color: var(--default-color);
    color: var(--bg-color);
  }
`

interface props {
  items: { label: string; value: string }[]
  onChange: (value: string) => void
  value: string
}

export const Dropdown = ({ items, onChange, value }: props) => {
  const [popupHeight, setPopupHeight] = useState(0)
  const [hasBlur, setHasBlur] = useState(false)
  const getCurrentLabel = () => {
    const current = items.filter(item => item.value === value)
    if (current.length > 0) return current[0].label
    else return value
  }

  const handleChange = (value: string) => {
    onChange(value)
    setHasBlur(false)
  }

  return (
    <DropdownWrapper>
      <DropdownButton
        text={getCurrentLabel()}
        icon={faAngleDown}
        onClick={() => setHasBlur(!hasBlur)}
      ></DropdownButton>
      <DropdownPopup height={hasBlur ? popupHeight : 0} items={items.length}>
        <div
          onBlur={() => setHasBlur(false)}
          ref={elem => setPopupHeight(elem?.clientHeight || 0)}
        >
          {items.map(item => (
            <DropdownItem
              onClick={() => handleChange(item.value)}
              key={item.value}
              text={item.label}
            />
          ))}
        </div>
      </DropdownPopup>
    </DropdownWrapper>
  )
}
