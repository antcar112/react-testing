import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Pokemon from './Pokemon'

ReactDOM.render(
  <StrictMode>
    <Pokemon />
    <App />
  </StrictMode>,
  document.getElementById('root')
)
