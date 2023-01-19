import React, { useEffect, useState } from "react"

import styled from "@emotion/styled"
import { faPlus, faMinus, faSave } from "@fortawesome/free-solid-svg-icons"

import { ColorPicker } from "../../../components/ColorPicker"
import { Dropdown } from "../../../components/Dropdown"
import { OptionSlider } from "../../../components/OptionSlider"
import { OptionTextInput } from "../../../components/OptionTextInput"
import { Theme, colorsType, images } from "../../../data/data"
import {
  StyledSettingsContent,
  SettingElement,
  SettingsButton,
  SettingsLabel,
} from "../SettingsWindow"

const DesignPreview = styled.div<{ name: string; colors: colorsType }>`
  ${({ colors }) => {
    return (
      Object.keys(colors)
        .map((key: string) => key + `:` + colors[key])
        .toString()
        .replaceAll(",", ";") + ";"
    )
  }}

  background-color: var(--bg-color);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 2px solid var(--accent-color);
  width: calc(100% - 400px);
  height: 100%;
  position: relative;
  ::before {
    content: "${({ name }) => name}";
    color: var(--accent-color);
    position: absolute;
    top: 10px;
    left: 15px;
    font-size: 0.8rem;
  }
  ::after {
    content: "Design Preview";
    color: var(--accent-color);
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 0.8rem;
  }
  @media screen and (max-width: 1400px) {
    > img {
      width: 200px;
      height: 200px;
    }
    > div > div {
      width: 50px;
      height: 200px;
      > h2 {
        font-size: 1rem;
      }
      > .wave {
        width: 50px;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    > img {
      width: 150px;
      height: 150px;
    }
    > div > div {
      width: 1rem;
      margin-left: 0.5rem;
      height: 150px;
      > h2 {
        font-size: 0.8rem;
      }
      > .wave {
        display: none;
      }
    }
  }
`
const ImagePreview = styled.img`
  margin: 10px;
  height: 300px;
  width: 300px;
  border: 1px solid var(--default-color);
  padding: 5px;
  object-fit: cover;

  animation: circling-shadow-small 4s ease 0s infinite normal;
`
const StyledAccordionPreview = styled.div<{ colorVar: string }>`
  border: 4px solid ${({ colorVar }) => `var(${colorVar})`};
  height: 300px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  ::before {
    content: "";
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 100%;
    background-color: ${({ colorVar }) => `var(${colorVar})`};
  }

  > .wave {
    width: 80px;
    height: 50px;
    position: absolute;
    top: 0px;
    overflow: hidden;
    ::before {
      content: "";
      width: 180px;
      height: 185px;
      position: absolute;
      top: -25%;
      left: 50%;
      margin-left: -90px;
      margin-top: -140px;
      border-radius: 37%;
      background: var(--bg-color);
      animation: wave 12s infinite cubic-bezier(0.71, 0.33, 0.33, 0.68);
    }
    @keyframes wave {
      from {
        transform: rotate(0deg);
      }
      from {
        transform: rotate(360deg);
      }
    }
  }
`
const SectionDivider = styled.div`
  width: calc(100% - 80px);
  padding: 20px 40px;
  position: relative;
  :before {
    content: "";
    width: calc(100% - 80px);
    position: absolute;
  }
`
const AccordionPreviewTitle = styled.h2`
  transform: rotate(90deg);
  min-width: max-content;
  color: var(--bg-color);
  transition: 0.5s;
  letter-spacing: 5px;
`
const AccordionPreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  > * {
    margin-left: 30px;
  }
`

export const SettingButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const AccordionPreview = ({
  title,
  colorVar,
}: {
  title: string
  colorVar: string
}) => {
  return (
    <StyledAccordionPreview colorVar={colorVar}>
      <div className={"wave"} />
      <AccordionPreviewTitle>{title}</AccordionPreviewTitle>
    </StyledAccordionPreview>
  )
}

interface props {
  design: Theme
  setDesign: (design: Theme) => void
  themes: Theme[]
  setThemes: (Themes: Theme[]) => void
}

const themeEquals = (theme1: Theme, theme2: Theme) => {
  let isEqual = true
  if (theme1.name !== theme2.name) isEqual = false
  if (theme1.image !== theme2.image) isEqual = false
  Object.keys(theme1.colors).forEach(key => {
    if (theme1.colors[key] !== theme2.colors[key]) isEqual = false
  })
  return isEqual
}

export const DesignSettings = ({
  design,
  setDesign,
  themes,
  setThemes,
}: props) => {
  const [isNewDesign, setIsNewDesign] = useState(false)

  const setName = (name: string) => setDesign({ ...design, name: name })
  const setColors = (colors: colorsType) =>
    setDesign({ ...design, colors: colors })
  const setImage = (image: string) => setDesign({ ...design, image: image })

  // check if design does exist already
  useEffect(() => {
    const currTheme = themes.filter(theme => themeEquals(theme, design))
    if (currTheme.length > 0) {
      setIsNewDesign(false)
    } else if (!isNewDesign) {
      setIsNewDesign(true)
    }
  }, [design, themes])

  const themeChange = (themeName: string) => {
    const newTheme = themes.filter(theme => theme.name === themeName)
    if (newTheme.length > 0) {
      setDesign(newTheme[0])
    }
  }

  const addTheme = (newTheme: Theme) => {
    setThemes([
      ...themes.filter(theme => theme.name !== newTheme.name),
      newTheme,
    ])
  }

  const removeTheme = (themeName: string) => {
    setThemes(themes.filter(theme => theme.name !== themeName))
    if (themes.length > 0) themeChange(themes[0].name)
  }

  const themeExists = (themeName: string) => {
    return themes.filter(theme => theme.name === design.name).length > 0
  }

  return (
    <>
      <div>
        <StyledSettingsContent>
          <SettingsLabel>Theme</SettingsLabel>

          <SettingElement>
            {themes && (
              <Dropdown
                value={design.name}
                items={themes.map(theme => ({
                  label: theme.name,
                  value: theme.name,
                }))}
                onChange={themeChange}
              />
            )}
          </SettingElement>
          <SettingElement>
            <OptionTextInput
              value={design.name}
              onChange={setName}
              placeholder={"Theme name"}
            />
          </SettingElement>

          <SectionDivider />

          <SettingElement>
            <OptionTextInput
              value={design.image}
              onChange={setImage}
              placeholder={"Image URL"}
            />
            <OptionSlider
              currentValue={design.image}
              values={images}
              onChange={setImage}
            />
          </SettingElement>

          <SectionDivider />

          <SettingElement>
            <ColorPicker colors={design.colors} setColors={setColors} />
          </SettingElement>
          <SectionDivider />
          <SettingElement>
            <SettingButtonRow>
              <SettingsButton
                onClick={() => addTheme(design)}
                text={!themeExists(design.name) ? "Add Theme" : "Save Theme"}
                icon={!themeExists(design.name) ? faPlus : faSave}
                disabled={!isNewDesign ? true : undefined}
              />
              <SettingsButton
                onClick={() => removeTheme(design.name)}
                text={"Remove Theme"}
                icon={faMinus}
                disabled={!themeExists(design.name)}
              />
            </SettingButtonRow>
          </SettingElement>
        </StyledSettingsContent>
      </div>
      <DesignPreview name={design.name} colors={design.colors}>
        <ImagePreview src={design.image} />
        <AccordionPreviewContainer>
          <AccordionPreview title={"Default"} colorVar={"--default-color"} />
          <AccordionPreview title={"Accent"} colorVar={"--accent-color"} />
          <AccordionPreview title={"Accent 2"} colorVar={"--accent-color2"} />
        </AccordionPreviewContainer>
      </DesignPreview>
    </>
  )
}
