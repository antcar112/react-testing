import { useEffect, useState, ChangeEvent } from 'react'
import { getUser, User } from './get-user'
import CustomInput from './CustomInput'

import './App.css'

const App = () => {
  const [text, setText] = useState('')
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser()
      setUser(user)
    }
    fetchUser()
  }, [])

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setText(target.value)
  }

  return (
    <div className='app'>
      {user && <p>Username: {user.name}</p>}
      <CustomInput value={text} onChange={handleChange}>
        Input:
      </CustomInput>
      <p>You typed: {text || '...'}</p>
    </div>
  )
}

export default App
