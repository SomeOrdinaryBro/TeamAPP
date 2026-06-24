import React from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted variable fonts (no external CDN — faster, works offline once installed)
import '@fontsource-variable/hanken-grotesk'
import '@fontsource-variable/bricolage-grotesque'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
