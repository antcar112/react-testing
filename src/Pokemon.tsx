import axios from 'axios'
import { useState, ChangeEvent, FunctionComponent, MouseEvent } from 'react'
import CustomInput from './CustomInput'

import './App.css'

const POKEMON_API_URL = 'https://pokeapi.co/api/v2'

interface Ability {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

const Pokemon: FunctionComponent = () => {
  const [pokemonName, setPokemonName] = useState('')
  const [pokemonAbilities, setPokemonAbilities] = useState<Ability[]>([])
  const [error, setError] = useState(null)

  const handleFetch = async (event: MouseEvent): Promise<void> => {
    try {
      const {
        data: { abilities },
      } = await axios.get<{ abilities: Ability[] }>(`${POKEMON_API_URL}/pokemon/${pokemonName}`)
      setPokemonAbilities(abilities)
    } catch (err) {
      setPokemonAbilities([])
      setError(err)
    }
  }

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setPokemonName(target.value)
  }

  return (
    <div className='app'>
      <CustomInput value={pokemonName} onChange={handleChange}>
        Pokemon name:
      </CustomInput>
      <button
        type='button'
        onClick={handleFetch}
        disabled={!pokemonName}
        style={{ marginTop: '1em' }}
      >
        Fetch Pokemon abilities
      </button>
      {error && <p>Something went wrong... 😵</p>}
      <ul>
        {pokemonAbilities.map(({ ability }) => (
          <li key={ability.name}>
            <a href={ability.url}>{ability.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pokemon
