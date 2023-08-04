import React from "react"

import styled from "@emotion/styled"
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome"

const StyledIconButton = styled.button<{ inverted?: boolean }>`
  color: ${({ inverted }) =>
    inverted ? "var(--bg-color)" : "var(--default-color)"};
  background-color: transparent;
  min-width: 50px;
  font-size: 20px;
  border: none;
  opacity: 0.7;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  :enabled:hover {
    ${({ inverted }) =>
      inverted
        ? `filter: 
            drop-shadow(2px 2px 0 var(--accent-color))
            drop-shadow(-2px -2px 0 var(--accent-color))
            drop-shadow(-2px 2px 0 var(--accent-color))
            drop-shadow(2px -2px 0 var(--accent-color))`
        : "animation: box-flicker 0.01s ease 0s infinite alternate"};
  }
  :focus {
    outline: none;
  }
  :disabled {
    opacity: 0.2;
    cursor: default;
  }

  > span {
    padding-right: 10px;
  }
`
type props = Partial<Pick<FontAwesomeIconProps, "icon">> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text?: string
    inverted?: boolean
  }

export const IconButton = ({ icon, text, children, ...props }: props) => {
  return (
    <StyledIconButton {...props}>
      {children}
      {text && <span>{text}</span>}
      {icon && <FontAwesomeIcon icon={icon}></FontAwesomeIcon>}
    </StyledIconButton>
  )
}
