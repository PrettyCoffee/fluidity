import React, {
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react"

import styled from "@emotion/styled"

const StyledAccordionContainer = styled.div`
  margin-left: 100px;
  display: flex;
  width: calc(100% - 400px - 100px);
`

export const AccordionContainer = ({ children }: PropsWithChildren) => (
  <StyledAccordionContainer>{children}</StyledAccordionContainer>
)

const StyledAccordionGroup = styled.div`
  height: 400px;
  display: flex;
  padding: 0 10px;
  flex-direction: row;
  border-right: 3px solid var(--default-color);
  :first-of-type {
    border-left: 3px solid var(--default-color);
  }
`

const AccordionContent = styled.div<{ width: number }>`
  height: 100%;
  width: ${({ width }) => `${width}px`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  transition: 0.3s;
`

const AccordionTitleWrapper = styled.button<{ active: boolean }>`
  padding: 0;
  background-color: var(--bg-color);
  border: 4px solid var(--accent-color);
  height: 100%;
  width: 90px;
  cursor: ${({ active }) => (active ? "default" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  position: relative;
  ::before {
    content: "";
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: ${({ active }) => (active ? "390px" : "0")};
    background-color: var(--accent-color);
    transition: ${({ active }) => (active ? "1s" : ".5s")};
  }
  :hover,
  :focus {
    outline: none;
    ${({ active }) =>
      !active &&
      `
            ::before {
                height: 50%;
            }
            > .wave {
                top: 180px;
                ::before{
                    animation: wave 12s infinite cubic-bezier(0.71, 0.33, 0.33, 0.68);
                    top: -25%;
                    left: 50%;
                }
            }
        `}
  }

  > .wave {
    /* Waves Source: https://codepen.io/mburakerman/pen/eRZZEv */
    width: 82px;
    height: 50px;
    position: absolute;
    top: ${({ active }) => (active ? "0px" : "350px")};
    overflow: hidden;
    transition: ${({ active }) => (active ? "1s" : ".5s")};
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
      background-color: var(--bg-color);
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

  ${({ active }) =>
    !active &&
    `
        :hover{
            > * {
                color: var(--bg-color);
                text-shadow:
                    5px 0px 0 var(--accent-color),
                    4px 0px 0 var(--accent-color),
                    3px 0px 0 var(--accent-color),
                    2px 0px 0 var(--accent-color),
                    1px 0px 0 var(--accent-color),
                    -1px 0px 0 var(--accent-color),
                    0px 1px 0 var(--accent-color),
                    0px -1px 0 var(--accent-color);
            }
        }
    `};
`

const AccordionTitle = styled.h1<{ title: string; active: boolean }>`
  transform: rotate(90deg);
  min-width: max-content;
  color: ${({ active }) =>
    active ? "var(--bg-color)" : "var(--default-color)"};
  transition: 0.5s;
  letter-spacing: 5px;
`

type groupProps = PropsWithChildren<{
  active: boolean
  title: string
  onClick: () => void
  onMouseDown: (e: MouseEvent) => void
}>

export const AccordionGroup = ({
  active,
  title,
  children,
  onClick,
  onMouseDown,
}: groupProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(active ? 500 : 0)
  useEffect(() => {
    const parent = ref.current?.parentElement
    if (parent && active) {
      setContentWidth(parent.clientWidth - parent.children.length * 113 - 3)
    } else {
      setContentWidth(0)
    }
  }, [active])

  return (
    <StyledAccordionGroup ref={ref}>
      <AccordionTitleWrapper
        active={active}
        onMouseDown={onMouseDown}
        onClick={onClick}
        tabIndex={active ? -1 : undefined}
      >
        <div className={"wave"} />
        <AccordionTitle active={active} title={title}>
          {title}
        </AccordionTitle>
      </AccordionTitleWrapper>
      <AccordionContent width={contentWidth} aria-hidden={!active || undefined}>
        {children}
      </AccordionContent>
    </StyledAccordionGroup>
  )
}
