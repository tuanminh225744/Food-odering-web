import React from 'react'

import Footer from '../../components/layout/footer/footer'
import Header from '../../components/layout/header/header'
import AdminSection from './adminSection/adminSection'

function Admin() {
    return (
        <>
            <Header />

            <AdminSection />

            <Footer />
        </>
    )
}

export default Admin