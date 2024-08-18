import { Login, Home } from './pages'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import LandingPage from './pages/LandingPage'
import Bot from './pages/bot'
const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path="/register" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bot" element={<Bot/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
