
import './App.css'
import Login from './components/Login.jsx'
import {Route,Routes} from 'react-router-dom'
import Wabcamp from './components/Wabcamp.jsx'
import Footer from './components/Footer.jsx'
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/wabcamp' element={<Wabcamp />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
