import { ChangeEvent, FunctionComponent } from 'react'

interface CustomInputProps {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const CustomInput: FunctionComponent<CustomInputProps> = ({ children, onChange, value }) => (
  <div>
    <label htmlFor='search'>{children}</label>
    <input type='text' id='search' value={value} onChange={onChange} placeholder='Enter text' />
  </div>
)

export default CustomInput
