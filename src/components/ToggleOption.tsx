import styled from "@emotion/styled"

const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  width: max-content;
  color: var(--default-color);
  cursor: pointer;
  user-select: none;
  transition: 0.3s;

  :hover {
    animation: circling-shadow-small 2s ease 0s infinite normal;
  }
`

const ToggleCheckbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: var(--accent-color);
  cursor: pointer;
`

type props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export const ToggleOption = ({ label, checked, onChange }: props) => (
  <ToggleLabel>
    <ToggleCheckbox
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
    />
    {label}
  </ToggleLabel>
)
