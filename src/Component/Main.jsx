import React from 'react'
import './mainbar.css'
import SideBar from './sideBar'
import Navbar from './Navbar'
function Main(props) {
  return (
    <div className='main'>
        <SideBar/>
        <Navbar>
            {props.children}
        </Navbar>
    </div>
  )
}

export default Main