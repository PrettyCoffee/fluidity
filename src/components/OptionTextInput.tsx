import React from "react"

import styled from "@emotion/styled"

const StyledInput = styled.input`
  border: 2px solid var(--default-color);
  width: calc(100% - 40px);
  height: 36px;
  padding: 0 20px;
  background-color: var(--bg-color);
  color: var(--default-color);
  outline: none;
  opacity: 0.5;
  :enabled:hover,
  :focus {
    opacity: 1;
  }
`

type props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  value: string
  onChange: (value: string) => void
  className?: string
}

export const OptionTextInput = ({ onChange, ...props }: props) => {
  return (
    <StyledInput
      type={"text"}
      onChange={e => onChange(e.currentTarget.value)}
      {...props}
    />
  )
}
