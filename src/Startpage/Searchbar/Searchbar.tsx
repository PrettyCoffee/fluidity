import React from "react"

import styled from "@emotion/styled"

import duckduckgo from "../../data/pictures/duckduckgo.svg"
import ecosia from "../../data/pictures/ecosia.svg"
import google from "../../data/pictures/google.svg"
import qwant from "../../data/pictures/qwant.svg"
import * as Settings from "../Settings/settingsHandler"

export const queryToken = "{{query}}"

const StyledSearchbarContainer = styled.div`
  position: absolute;
  left: calc(100px - 2.9rem - 10px);
  right: 100px;
  bottom: 40px;
  height: min-content;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`
const StyledSearchbar = styled.input`
  width: 100%;
  font-size: 30pt;

  background-color: rgba(0, 0, 0, 0);
  color: var(--default-color);
  transition: 0.3s;
  border: none;
  border-bottom: 2px solid var(--default-color);
  opacity: 0.3;

  ::placeholder {
    color: var(--default-color);
  }

  :hover,
  :focus {
    opacity: 1;
    outline: none;
  }
`

const SearchIcon = styled.div<{ src: string }>`
  height: 2.9rem;
  width: 3.1rem;
  margin: auto 10px auto 0;

  background: var(--default-color);

  mask-size: cover;
  mask-image: url(${({ src }) => src});
`

export const Searchbar = () => {
  const searchSettings = Settings.Search.getWithFallback()
  const engine: string = searchSettings.engine || "duckduckgo.com/"

  let searchSymbol = undefined
  if (engine.includes("duckduckgo")) searchSymbol = duckduckgo
  else if (engine.includes("google")) searchSymbol = google
  else if (engine.includes("qwant")) searchSymbol = qwant
  else if (engine.includes("ecosia")) searchSymbol = ecosia

  const redirectToSearch = (query: string) => {
    if (searchSettings.fastForward[query])
      window.location.href = searchSettings.fastForward[query]
    else {
      // for compatibility with old engine urls before fluidity 0.5.0
      if (!engine.includes(queryToken))
        window.location.href = "https://" + engine + "?q=" + query
      else window.location.href = engine.replace(queryToken, query)
    }
  }

  return (
    <StyledSearchbarContainer>
      {searchSymbol && <SearchIcon src={searchSymbol} />}
      <StyledSearchbar
        placeholder="Always stay clean!"
        type="input"
        onKeyUp={e => e.which === 13 && redirectToSearch(e.currentTarget.value)}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
    </StyledSearchbarContainer>
  )
}
