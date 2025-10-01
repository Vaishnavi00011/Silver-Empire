import React from 'react'
import Sidebar from '../Components/Sidebar'
import DHeader from '../Components/DHeader'
import DHome from '../Components/DHome'

function Dashboard() {
  return (
    <div className='flex flex-row'>
        <Sidebar></Sidebar>
        <div className='flex flex-col w-full'>
        <DHeader></DHeader>
        <DHome></DHome>
        </div>
    </div>
  )
}

export default Dashboard