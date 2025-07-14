import Home  from './pages/Home'
import {Routes, Route} from 'react-router-dom'
import About from "./pages/About"
import Writeups from "./pages/Writeups"
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Upload from './pages/Upload'
import Description from './pages/Description'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/writeups" element={<Writeups />} />
        <Route path="/about" element={<About />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/description" element={<Description />} />

      </Routes> 
    </>
  )
}

export default App 
