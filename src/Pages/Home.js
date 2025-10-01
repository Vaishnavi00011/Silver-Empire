import React from 'react'
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

function Home() {
  return (
    <div className=''> 
        <Header></Header>
         <Intro></Intro> 
        <MostPopular></MostPopular>
        <SimpleEmp></SimpleEmp>
        <Categories></Categories>
        <Ocassion></Ocassion>
        <Tranding></Tranding>
        <VirtualStyling></VirtualStyling>
         <Jwellary></Jwellary>
         <AboutUs></AboutUs>
        <Experience></Experience>
        <Footer></Footer>
    </div>
  )
}

export default Home