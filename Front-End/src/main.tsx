import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './static/main.css'
import { BrowserRouter } from "react-router-dom"
import AuthProvider from './contexts/UserProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)