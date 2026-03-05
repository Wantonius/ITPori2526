import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx'
import StateManager from './context/StateManager';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
  <StateManager>
    <App />
  </StateManager>
  </BrowserRouter>
  </StrictMode>,
)
