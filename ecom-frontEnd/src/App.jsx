import './App.css'
import Home from './components/home/Home'
import Products from './components/products/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/NavBar'
import About from './components/About'
import Contact from './components/Contact'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
      </Routes>
    </Router>
  )
}

export default App
