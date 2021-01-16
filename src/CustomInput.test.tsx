import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CustomInput from './CustomInput'

describe('CustomInput', () => {
  test('should call the onChange callback handler - fireEvent', () => {
    const onChange = jest.fn()
    render(
      <CustomInput value='' onChange={onChange}>
        Input:
      </CustomInput>
    )
    const input = screen.getByRole('textbox')
    // Note the difference between this and userEvent test below
    fireEvent.change(input, { target: { value: 'David' } })
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  test('should call the onChange callback handler - userEvent', async () => {
    const onChange = jest.fn()
    render(
      <CustomInput value='' onChange={onChange}>
        Input:
      </CustomInput>
    )
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'David')
    expect(onChange).toHaveBeenCalledTimes(5)
  })
})
