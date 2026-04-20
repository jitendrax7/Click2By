import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Wishlist from './pages/Wishlist'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { NotifyProvider } from './components/Notify'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  return (
    <NotifyProvider>
      <div className="min-h-screen bg-dark text-text-primary">
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path='/'            element={<Home />} />
            <Route path='/collection'  element={<Collection />} />
            <Route path='/Collection'  element={<Collection />} />
            <Route path='/about'       element={<About />} />
            <Route path='/About'       element={<About />} />
            <Route path='/contact'     element={<Contact />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart'        element={<Cart />} />
            <Route path='/login'       element={<Login />} />
            <Route path='/place-order' element={<PlaceOrder />} />
            <Route path='/orders'      element={<Orders />} />
            <Route path='/wishlist'    element={<Wishlist />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </NotifyProvider>
  )
}

export default App
