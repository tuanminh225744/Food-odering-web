import React from 'react'

import Footer from '../../components/layout/footer/footer'
import Navbar from '../../components/layout/header/navbar/navbar'
import AdminSection from './adminSection/adminSection'
import './admin.css'

function Admin() {
    return (
        <>
            <header className='header headerNavbar'>
                <div className='grid'>
                    <Navbar />
                </div>
            </header>

            <AdminSection />

            <Footer />
        </>
    )
}

export default Admin