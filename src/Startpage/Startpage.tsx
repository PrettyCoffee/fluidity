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
  position: relative;
`

const StyledStartpage = styled.div`
  padding: 0px 100px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: calc(100% - 100px);
`

const Image = styled.img`
  height: 400px;
  width: 400px;
  border: 2px solid var(--default-color);
  padding: 10px;
  object-fit: cover;

  animation: circling-shadow 4s ease 0s infinite normal;
`

export const Startpage = () => {
  const [img, setImg] = useState(DesignSettings.getWithFallback().image)

  return (
    <Wrapper>
      <StyledStartpage>
        <div>
          <Image src={img} onError={() => setImg(images[0].value)} />
        </div>
        <LinkContainer />
      </StyledStartpage>
      <Searchbar />
      <Settings />
    </Wrapper>
  )
}
