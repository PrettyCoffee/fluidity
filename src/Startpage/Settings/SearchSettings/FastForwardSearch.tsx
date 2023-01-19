import React, { useState } from "react"

import styled from "@emotion/styled"
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons"

import { IconButton } from "../../../components/IconButton"
import { OptionTextInput } from "../../../components/OptionTextInput"
import { FastForwards } from "../../../data/data"

const FastForwardWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  @media screen and (max-width: 1300px) {
    flex-direction: column;
  }
`
const FastForwardTable = styled.table`
  width: 50%;
  padding: 0 20px;
  @media screen and (max-width: 1300px) {
    width: 100%;
  }
`
const StyledFastForwardItem = styled.tr`
  > td {
    padding: 10px 0;
    overflow: hidden;
    white-space: nowrap;
  }
  > :first-of-type {
    max-width: 100px;
  }
  > :nth-of-type(3) {
    max-width: 300px;
  }
  > :last-of-type {
    width: 50px;
  }
`
const AddItemButton = styled(IconButton)`
  font-size: 1rem;
  display: inline;
`
const AddItemTextField = styled(OptionTextInput)`
  width: calc(100% - 50px);
`

interface FastForwardItemProps {
  value: string
  url: string
  deleteThis: () => void
}

export const FastForwardItem = ({
  value,
  url,
  deleteThis,
}: FastForwardItemProps) => {
  return (
    <StyledFastForwardItem>
      <td title={value}>{`"${value}"`}</td>
      <td>&nbsp;:&nbsp;</td>
      <td title={url}>{`"${url}"`}</td>
      <td>
        {" "}
        <IconButton icon={faTrash} onClick={() => deleteThis()} />
      </td>
    </StyledFastForwardItem>
  )
}

interface FastForwardAddItemProps {
  add: (value: string, url: string) => void
}

export const FastForwardAddItem = ({ add }: FastForwardAddItemProps) => {
  const [value, setValue] = useState<string>("")
  const [url, setUrl] = useState<string>("")

  return (
    <StyledFastForwardItem>
      <td>
        <AddItemTextField
          value={value}
          onChange={newValue => setValue(newValue)}
          placeholder={"search string"}
        />
      </td>
      <td>&nbsp;:&nbsp;</td>
      <td>
        <AddItemTextField
          value={url}
          onChange={newUrl => setUrl(newUrl)}
          placeholder={"destination"}
        />
      </td>
      <td>
        <AddItemButton
          disabled={!value || !url}
          onClick={() => value && url && add(value, url)}
          icon={faPlus}
        />
      </td>
    </StyledFastForwardItem>
  )
}

interface FastForwardSearchProps {
  links: FastForwards
  onChange: (links: FastForwards) => void
}

export const FastForwardSearch = ({
  links,
  onChange,
}: FastForwardSearchProps) => {
  const deleteValue = (value: string) => {
    const copy = { ...links }
    delete copy[value]
    onChange({ ...copy })
  }
  const addValue = (value: string, url: string) => {
    const copy = { ...links }
    copy[value] = url
    onChange({ ...copy })
  }

  const table = Object.keys(links)
    .sort()
    .map(value => (
      <FastForwardItem
        key={value}
        value={value}
        url={links[value]}
        deleteThis={() => deleteValue(value)}
      />
    ))
  const tableLeft = [...table].splice(0, table.length / 2 + (table.length % 2))
  const tableRight = [...table].splice(table.length / 2 + (table.length % 2))

  return (
    <div>
      <FastForwardWrapper>
        <FastForwardTable>
          <tbody>{tableLeft}</tbody>
        </FastForwardTable>
        <FastForwardTable>
          <tbody>{tableRight}</tbody>
        </FastForwardTable>
      </FastForwardWrapper>
      <FastForwardTable>
        <tbody>{<FastForwardAddItem add={addValue} />}</tbody>
      </FastForwardTable>
    </div>
  )
}
