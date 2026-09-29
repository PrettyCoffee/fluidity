import styled from "@emotion/styled"

const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 5px 0;
  gap: 8px;
  width: max-content;
  color: var(--default-color);
  cursor: pointer;
  user-select: none;

  :hover {
    animation: text-flicker 0.01s ease 0s infinite alternate;
  }
`

const ToggleCheckbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: var(--accent-color);
  cursor: pointer;
`

interface Props {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export const ToggleOption = ({ label, checked, onChange }: Props) => (
  <ToggleLabel>
    <ToggleCheckbox
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
    />
    {label}
  </ToggleLabel>
)
