import { ToggleOption } from "../../../components/ToggleOption"
import { ClockSettings as ClockSettingsType } from "../../../data/data"
import { StyledSettingsContent, SettingsLabel } from "../SettingsWindow"

interface props {
  clockSettings: ClockSettingsType
  setClockSettings: (clockSettings: ClockSettingsType) => void
}

export const ClockSettings = ({ clockSettings, setClockSettings }: props) => (
  <StyledSettingsContent>
    <SettingsLabel>Clock</SettingsLabel>

    <ToggleOption
      label="Display greeting"
      checked={clockSettings.showGreeting}
      onChange={showGreeting =>
        setClockSettings({ ...clockSettings, showGreeting })
      }
    />
    <ToggleOption
      label="Display time"
      checked={clockSettings.showTime}
      onChange={showTime => setClockSettings({ ...clockSettings, showTime })}
    />
    <ToggleOption
      label="Display date"
      checked={clockSettings.showDate}
      onChange={showDate => setClockSettings({ ...clockSettings, showDate })}
    />
  </StyledSettingsContent>
)
