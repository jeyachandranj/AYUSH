import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from "./services/AuthContext";
import { BrowserRouter } from 'react-router-dom'
// src/main.jsx or src/index.jsx
import 'bootstrap/dist/css/bootstrap.min.css';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>   
    </BrowserRouter>
  </StrictMode>,
)