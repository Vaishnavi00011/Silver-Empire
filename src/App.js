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
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      </Routes>
    </HashRouter>
  )
}

export default App