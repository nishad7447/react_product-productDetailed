import React from 'react'
import './Header.css'
import {  useNavigate } from 'react-router-dom';

export default function Header() {
    const nav=useNavigate()
    return (
        <header>
            <div className='container'>
                <h1 onClick={()=>{nav('/')}}>NavBar</h1>
                <div className="right-section">
             
            </div>
         </div>
        </header>
    )
}
