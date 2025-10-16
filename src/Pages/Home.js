import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import Intro from '../Components/Intro'
import Footer from '../Components/Footer'
import MostPopular from '../Components/MostPopular'
import SimpleEmp from '../Components/SimpleEmp'
import Categories from '../Components/Categories'
import Tranding from '../Components/Tranding'
import AboutUs from '../Components/AboutUs'
import Experience from '../Components/Experience'
import Jwellary from '../Components/Jwellary'
import Ocassion from '../Components/Ocassion'
import VirtualStyling from '../Components/VirtualStyling'
import Preloader from '../Components/Preloader' // ye component aapko pehle banana hoga

function Home() {

 

  return (
    <div className='overflow-x-hidden'> 
        <Header />
        <Intro /> 
        <MostPopular />
        <SimpleEmp />
        <Categories />
        <Ocassion />
        <Tranding />
        <VirtualStyling />
        <Jwellary />
        <AboutUs />
        <Experience />
        <Footer />
    </div>
  )
}

export default Home
