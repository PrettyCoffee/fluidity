import { ToggleOption } from "../../../components/ToggleOption"
import { ClockSettings as ClockSettingsType } from "../../../data/data"
import {
  StyledSettingsContent,
  SettingElement,
  SettingsLabel,
} from "../SettingsWindow"

interface props {
  clockSettings: ClockSettingsType
  setClockSettings: (clockSettings: ClockSettingsType) => void
}

export const ClockSettings = ({ clockSettings, setClockSettings }: props) => (
  <StyledSettingsContent>
    <SettingsLabel>Clock</SettingsLabel>

    <SettingElement>
      <ToggleOption
        label="Disable greeting"
        checked={!clockSettings.showGreeting}
        onChange={disabled =>
          setClockSettings({ ...clockSettings, showGreeting: !disabled })
        }
      />
    </SettingElement>

    <SettingElement>
      <ToggleOption
        label="Disable time"
        checked={!clockSettings.showTime}
        onChange={disabled =>
          setClockSettings({ ...clockSettings, showTime: !disabled })
        }
      />
    </SettingElement>

    <SettingElement>
      <ToggleOption
        label="Disable date"
        checked={!clockSettings.showDate}
        onChange={disabled =>
          setClockSettings({ ...clockSettings, showDate: !disabled })
        }
      />
    </SettingElement>
  </StyledSettingsContent>
)
