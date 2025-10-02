import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Rings from './Pages/Rings'
import RingsProduct from './Pages/RingsProduct'
import Earing from './Pages/Earing'
import Bracelate from './Pages/Bracelate'
import Dailywear from './Pages/Dailywear'
import Collection from './Pages/Collection'
import Gift from './Pages/Gift'
import Dashboard from './Admin Panel/Dashboard'
import AddProduct from './Admin Panel/AddProduct'
import ProductList from './Admin Panel/ProductList'
import AddToCart from './Pages/AddToCart'
import Checkout from './Pages/Checkout'
import BuyNow from './Pages/BuyNow'
import WishList from './Pages/WishList'
import OurStore from './Pages/OurStore'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/rings' element={<Rings></Rings>}></Route>
        <Route path='/rings-product' element={<RingsProduct></RingsProduct>}></Route>
        <Route path='/earings' element={<Earing></Earing>}></Route>
        <Route path='/bracelate' element={<Bracelate></Bracelate>}></Route>
        <Route path='/daily-wear' element={<Dailywear></Dailywear>}></Route>
        <Route path='/collection' element={<Collection></Collection>}></Route>
        <Route path='/gift' element={<Gift></Gift>}></Route>
        <Route path='/add-cart' element={<AddToCart></AddToCart>}></Route>
        <Route path='/check-out' element={<Checkout></Checkout>}></Route>
        <Route path='/buy-now' element={<BuyNow></BuyNow>}></Route>
        <Route path='/wish-list' element={<WishList></WishList>}></Route>
        <Route path='/our-store' element={<OurStore></OurStore>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/add-product' element={<AddProduct></AddProduct>}></Route>
        <Route path='/product-list' element={<ProductList></ProductList>}></Route>
      </Routes>
    </HashRouter>
  )
}

export default App