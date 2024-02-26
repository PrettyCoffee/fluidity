import React, { useState } from "react"

import styled from "@emotion/styled"

import { LinkContainer } from "./LinkContainer/LinkContainer"
import { Searchbar } from "./Searchbar/Searchbar"
import { Settings } from "./Settings/Settings"
import { Design as DesignSettings } from "./Settings/settingsHandler"
import { images } from "../data/data"

const Wrapper = styled.div`
  max-width: 1920px;
  height: 100%;
  margin: auto;
`

const StyledStartpage = styled.div`
  padding: 100px 100px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: calc(100% - 100px);
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 100px;
    padding-left: 0;
    padding-right: 0;
    box-sizing: border-box;
    gap: 20px;
  }
`

const Image = styled.img`
  height: 400px;
  width: 400px;
  border: 2px solid var(--default-color);
  padding: 10px;
  object-fit: cover;
  animation: circling-shadow 4s ease 0s infinite normal;
  @media (max-width: 500px) {
    height: 100px;
    width: 100px;
  }
`

export const Startpage = () => {
  const [img, setImg] = useState(DesignSettings.getWithFallback().image)

  return (
    <Wrapper>
      <StyledStartpage>
        <Image src={img} onError={() => setImg(images[0].value)} />
        <Searchbar />
        <LinkContainer />
      </StyledStartpage>
      <Settings />
    </Wrapper>
  )
}
