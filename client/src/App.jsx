import { Home, StatusCheck } from './pages'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Bot from './pages/bot'
import Login from "./components/Login/login"
import { AlertProvider } from './contexts/AlertContext'

const App = () => {
  return (
    <AlertProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path="/register" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bot" element={<Bot/>}/>
          <Route path="/status-check/:id" element={<StatusCheck />} />
        </Routes>
      </Router>
    </AlertProvider>
  )
}

export default App
