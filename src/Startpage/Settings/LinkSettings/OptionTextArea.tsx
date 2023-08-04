import React, { useState } from "react"

import styled from "@emotion/styled"

import { linkGroup } from "../../../data/data"
import * as Settings from "../settingsHandler"

const StyledOptionTextArea = styled.div<{ error?: string }>`
  position: relative;
  border: 2px solid var(--default-color);
  display: flex;
  padding: 10px 0 10px 20px;
  height: calc(100% - 40px);
  ${({ error }) =>
    error &&
    `
        ::after{
            content: "${error}";
            color: var(--accent-color);
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 0.8rem;
        }
    `}
`

const StyledTextArea = styled.textarea`
  background-color: var(--bg-color);
  color: var(--default-color);
  border: none;
  height: 100%;
  width: 100%;
  outline: none;
  resize: none;
`

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
      ],
    },
  ],
  null,
  2
)

interface props {
  initialValue: linkGroup[]
  onChange: (value: linkGroup[]) => void
}

const getLinksAsString = (): string => {
  // try to do usual parse
  try {
    const parseLinks = localStorage.getItem("link-groups")
    if (parseLinks)
      return JSON.stringify(Settings.Links.parse(parseLinks), null, 2)
    // eslint-disable-next-line no-empty
  } catch {}

  // try to parse broken json
  const links = Settings.Links.getRaw()
  if (links) {
    return links
      .replaceAll(":[{", ":[\n      {\n")
      .replaceAll('[{"', '[\n  {\n"')
      .replaceAll("}]}]", "}]\n  }\n]")
      .replaceAll("]},{", "\n  },\n  {\n")
      .replaceAll("},{", "\n      },\n      {\n")
      .replaceAll('"}]', '"\n      }\n    ]')
      .replaceAll('"title":', '    "title":')
      .replaceAll('"links":', '\n    "links":')
      .replaceAll('"label":', '        "label":')
      .replaceAll('"value":', '\n        "value":')
  }

  //Last possible option
  return JSON.stringify(Settings.Links.getWithFallback(), null, 2)
}

export const OptionTextArea = ({ onChange }: props) => {
  const [error, setError] = useState<string | undefined>(undefined)
  const [value, setValue] = useState(getLinksAsString())

  const tryOnChangeEvent = (linkGroups: string) => {
    setValue(linkGroups)
    try {
      const parsedData = Settings.Links.parse(linkGroups)
      setError(undefined)
      onChange(parsedData)
    } catch {
      setError(
        "Your links are not parseable. Probably you have a Syntax Error?"
      )
    }
  }

  return (
    <StyledOptionTextArea error={error}>
      <StyledTextArea
        onChange={e => tryOnChangeEvent(e.currentTarget.value)}
        placeholder={placeholder}
        value={value}
      />
    </StyledOptionTextArea>
  )
}
