import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import Pokemon from './Pokemon'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('When the user enters a valid pokemon name', () => {
  test('should show the pokemon abilities', async () => {
    const abilities = [
      { ability: { name: 'Test ability one', url: 'www.pokemon.com/ability1' } },
      { ability: { name: 'Test ability two', url: 'www.pokemon.com/ability2' } },
    ]
    mockedAxios.get.mockResolvedValueOnce({ data: { abilities } })
    render(<Pokemon />)
    await userEvent.type(screen.getByRole('textbox'), 'charizard')
    await userEvent.click(screen.getByText('Fetch Pokemon abilities'))
    const returnedAbilities = await screen.findAllByRole('listitem')
    expect(returnedAbilities).toHaveLength(2)
  })
})

describe('When the user enters an invalid pokemon name', () => {
  test('should show an error message on the screen', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error())
    render(<Pokemon />)
    await userEvent.type(screen.getByRole('textbox'), 'invalid pokemon name')
    await userEvent.click(screen.getByText('Fetch Pokemon abilities'))
    const errorMessage = await screen.findByText(/Something went wrong/)
    expect(errorMessage).toBeInTheDocument()
  })
})
