import React, { useEffect, useState } from "react"

import styled from "@emotion/styled"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

import duckduckgo from "../../data/pictures/duckduckgo.svg"
import ecosia from "../../data/pictures/ecosia.svg"
import google from "../../data/pictures/google.svg"
import qwant from "../../data/pictures/qwant.svg"
import { RootStore } from "../../store/root.store"
import * as Settings from "../Settings/settingsHandler"

export const queryToken = "{{query}}"

const StyledWrapper = styled.div`
  position: absolute;
  left: calc(100px - 2.9rem - 10px);
  right: 100px;
  bottom: 60px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 700px) {
    position: relative;
    left: 0;
    bottom: 0;
    right: 0;
  }
`

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
  width: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media (max-width: 700px) {
    gap: 5px;
    flex-direction: column;
  }

  > button {
    cursor: pointer;
    color: var(--default-color);
    background: none;
    border: none;
    outline: none;
    box-shadow: none;
    font-size: 30px;
    width: 19%;
    opacity: 0.5;
    text-align: center;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 700px) {
      font-size: 20px;
      width: 100%;
      justify-content: left;
    }
  }

  > button:hover {
    opacity: 1;
  }
`

interface SuggestedResult {
  phrase: string
}

const StyledSearchbarContainer = styled.div`
  height: min-content;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  @media (max-width: 700px) {
    align-items: center;
  }
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
  @media (max-width: 700px) {
    font-size: 20px;
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

  const [suggested, setSuggested] = useState<SuggestedResult[]>([])

  const dispatch = useDispatch()
  const search: string = useSelector((state: RootStore) => state.search).search

  const getAutocomplete = async (query: string) => {
    try {
      const { data } = await axios.get<SuggestedResult[]>(
        "/search" + query.replaceAll(" ", "%20"),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      if (data) {
        const parsed: SuggestedResult[] = []
        data.forEach((item: SuggestedResult) => {
          const parse = item.phrase.substr(item.phrase.indexOf(" ") + 1)
          parsed.push({ phrase: parse })
        })
        setSuggested(parsed.splice(0, 5))
      }
      console.log(data)
    } catch (e) {
      console.error(e)
    }
  }

  //timeout for suggest request
  useEffect(() => {
    if (search === "") return
    const delay = setTimeout(() => {
      getAutocomplete(search).catch(e => console.log(e))
    }, 250)
    return () => clearTimeout(delay)
  }, [search])

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

  const inputHandler = (str: string) => {
    dispatch({ type: "SEARCH_UPDATE", payload: { search: str } })
  }

  return (
    <StyledWrapper>
      <SearchWrapper>
        {suggested.map((item, index) => {
          const id = String(index)
          return (
            <button key={id} onClick={() => redirectToSearch(item.phrase)}>
              {item.phrase}
            </button>
          )
        })}
      </SearchWrapper>
      <StyledSearchbarContainer>
        {searchSymbol && <SearchIcon src={searchSymbol} />}
        <StyledSearchbar
          placeholder="Always stay clean!"
          type="input"
          onChange={e => inputHandler(e.currentTarget.value)}
          onKeyUp={e =>
            e.which === 13 && redirectToSearch(e.currentTarget.value)
          }
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
      </StyledSearchbarContainer>
    </StyledWrapper>
  )
}
