import './App.css'
import Home from './components/home/Home'
import Products from './components/products/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/NavBar'
import About from './components/About'
import Contact from './components/Contact'
import { Toaster } from 'react-hot-toast'
import React from 'react'
import Cart from './components/cart/Cart'
import Login from './components/auth/Login'
import PrivateRoute from './components/PrivateRoute'
import Register from './components/auth/Register'
import Checkout from './components/checkout/Checkout'
import PaymentConfirmation from './components/checkout/PaymentConfirmation'

function App() {

  return (
    <React.Fragment>
      <Toaster position='top-center' />
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/cart' element={<Cart />}></Route>

          <Route path='/' element={<PrivateRoute />}>
            <Route path='/checkout' element={ <Checkout />}/>
            <Route path='/order-confirm' element={ <PaymentConfirmation />}/>
          </Route>
          
          <Route path='/' element={<PrivateRoute publicPage />}>
            <Route path='/login' element={ <Login />}/>
            <Route path='/register' element={ <Register />}/>
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App
