import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mocked } from 'ts-jest/utils'
import { getUser } from './get-user'
import App from './App'

jest.mock('./get-user')
const mockGetUser = mocked(getUser, true)

describe('App', () => {
  beforeEach(async () => {
    render(<App />)
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled())
  })
  test('should render', () => {
    screen.debug()
  })

  test('should display the children that are being passed to CustomInput', () => {
    screen.getByText(/Input/)
  })

  test('should select the input element by its role', () => {
    screen.getAllByRole('textbox')
    expect(screen.getAllByRole('textbox')[0]).toBeInTheDocument()
    expect(screen.getAllByRole('textbox').length).toEqual(1)
  })

  test('should select a label element by its text', () => {
    screen.getByLabelText('Input:')
  })

  test('should select input element by placeholder text', () => {
    screen.getByPlaceholderText('Enter text')
  })

  test('should select the input element by its role using queryBy', () => {
    const result = screen.queryByRole('textbox')
    expect(result).toBeInTheDocument()
  })

  test('should not find the role whatever in our component', () => {
    const result = screen.queryByRole('whatever')
    expect(result).toBeNull()
  })
})

describe('when the component fetches the user successfully', () => {
  beforeEach(() => {
    mockGetUser.mockClear()
  })

  test('should call getUser once', async () => {
    render(<App />)
    await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1))
  })

  test('should render the username passed', async () => {
    const name = 'John'
    // mockGetUser.mockImplementationOnce(() => Promise.resolve({ id: '1', name }))
    // Same as above, but cleaner
    mockGetUser.mockResolvedValueOnce({ id: '1', name })
    render(<App />)
    expect(screen.queryByText(`Username: ${name}`)).toBeNull()
    expect(await screen.findByText(`Username: ${name}`)).toBeInTheDocument()
  })
})

describe('When the user enters some text in the input element', () => {
  test('should display the text on the screen', async () => {
    render(<App />)
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled())

    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'Tony')

    expect(screen.getByText(/You typed: Tony/)).toBeInTheDocument()
    screen.debug()
  })
})
