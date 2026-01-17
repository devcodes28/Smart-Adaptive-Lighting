import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SystemProvider } from './context/SystemContext' // Added

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SystemProvider> {/* Wrap App in SystemProvider to fix blank screen */}
      <App />
    </SystemProvider>
  </React.StrictMode>
)