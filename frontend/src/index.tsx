import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import './index.css'
import { Global } from '@emotion/react'
import globalStyles from './styles/globalStyles'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <App />
  </React.StrictMode>,
)
