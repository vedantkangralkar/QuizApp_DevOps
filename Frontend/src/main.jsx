import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // The main entry point, rendering App within StrictMode
  <StrictMode>
    <App />
  </StrictMode>,
)
