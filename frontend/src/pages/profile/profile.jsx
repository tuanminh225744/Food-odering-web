import React from 'react'

import UserSection from './userSection/userSection'
import Footer from '../../components/layout/footer/footer'
import Header from '../../components/layout/header/header'

function Profile() {
    return (
        <>
            <Header />

            <UserSection />

            <Footer />
        </>
    )
}

export default Profile