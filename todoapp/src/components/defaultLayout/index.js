import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header';

const DefaultLayout = () => {
  return (
    <div className='DefaultLayout' style={{display : 'flex'}}>
      <Header />
      <Outlet />
    </div>
  )
}

export default DefaultLayout;
