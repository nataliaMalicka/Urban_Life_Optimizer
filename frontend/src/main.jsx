import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './Global.css'
import PageRoutes from './PageRoutes.jsx'
import InputPage from './InputPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InputPage />
  </StrictMode>,
)