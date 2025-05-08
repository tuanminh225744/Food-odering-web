import React from 'react'
import HeaderSearch from './headerSearch/headerSearch'
import Navbar from './navbar/navbar'
import './header.css'
function Header() {
    return (
        <>
            <header className='header'>
                <div className='grid'>
                    <Navbar />
                    <HeaderSearch />
                </div>
            </header>
        </>
    )
}

export default Header