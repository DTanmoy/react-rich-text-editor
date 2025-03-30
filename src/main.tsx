/**
 * React Rich Text Editor
 * Main Application Entry Point
 * @author Tanmoy Bhadra
 */
import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
