import { useState } from "react"

import styled from "@emotion/styled"

import { searchEngines } from "../../data/data"
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

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  cursor: pointer;

  :hover > span {
    opacity: 1;
  }
`

const SearchIcon = styled.div<{ src: string }>`
  height: 2.9rem;
  width: 3.1rem;
  margin: auto 10px auto 0;

  background: var(--default-color);

  mask-size: cover;
  mask-image: url("${({ src }) => src}");
`

const EngineLabel = styled.span`
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: var(--default-color);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
`

export const Searchbar = () => {
  const [searchSettings, setSearchSettings] = useState(
    Settings.Search.getWithFallback
  )

  const engine: string = searchSettings.engine || "duckduckgo.com/"
  const engineIndex = Math.max(
    0,
    searchEngines.findIndex(e => e.value === engine)
  )

  let searchSymbol = undefined
  if (engine.includes("duckduckgo")) searchSymbol = duckduckgo
  else if (engine.includes("google")) searchSymbol = google
  else if (engine.includes("qwant")) searchSymbol = qwant
  else if (engine.includes("ecosia")) searchSymbol = ecosia

  const cycleEngine = () => {
    const next = searchEngines[(engineIndex + 1) % searchEngines.length]
    if (!next) return
    const updated = { ...searchSettings, engine: next.value }
    setSearchSettings(updated)
    Settings.Search.set(updated)
  }

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
      <IconWrapper onClick={cycleEngine}>
        {searchSymbol && <SearchIcon src={searchSymbol} />}
        <EngineLabel>
          {searchEngines[engineIndex]?.label ?? "Custom"}
        </EngineLabel>
      </IconWrapper>
      <StyledSearchbar
        placeholder="Always stay clean!"
        type="input"
        onKeyUp={e =>
          e.key === "Enter" && redirectToSearch(e.currentTarget.value)
        }
        autoFocus
      />
    </StyledSearchbarContainer>
  )
}
