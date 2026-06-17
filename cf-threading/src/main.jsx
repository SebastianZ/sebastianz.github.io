import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import '../node_modules/reveal.js/dist/reveal.css'
import '../node_modules/reveal.js/dist/theme/moon.css'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
