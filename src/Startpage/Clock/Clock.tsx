import { useEffect, useState } from "react"

import styled from "@emotion/styled"

import * as Settings from "../Settings/settingsHandler"

const Greeting = styled.div`
  font-size: 14px;
  letter-spacing: 1px;
  color: var(--accent-color);
`

const Time = styled.div`
  font-size: 32px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
`

const DateLabel = styled.div`
  font-size: 13px;
  letter-spacing: 0.5px;
  opacity: 0.7;
`

const ClockContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 24px;
  display: flex;
  flex-direction: column;
  line-height: 1.15;
  color: var(--default-color);
  opacity: 0.5;
  transition: 0.3s;
  user-select: none;

  :hover {
    opacity: 1;

    .clock-time {
      animation: text-flicker 0.01s ease 0s infinite alternate;
    }
  }
`

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

const pad = (value: number) => String(value).padStart(2, "0")

// Boundaries are subjective — tweak to taste.
const greetingFor = (hour: number) => {
  if (hour < 5) return "Good night"
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  if (hour < 21) return "Good evening"
  return "Good night"
}

export const Clock = () => {
  const [now, setNow] = useState(() => new Date())
  const [settings] = useState(() => Settings.Clock.getWithFallback())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <ClockContainer>
      {settings.showGreeting && (
        <Greeting>{greetingFor(now.getHours())}</Greeting>
      )}
      {settings.showTime && (
        <Time className="clock-time">
          {pad(now.getHours())}:{pad(now.getMinutes())}
        </Time>
      )}
      {settings.showDate && (
        <DateLabel>
          {days[now.getDay()]}, {now.getDate()} {months[now.getMonth()]}
        </DateLabel>
      )}
    </ClockContainer>
  )
}
