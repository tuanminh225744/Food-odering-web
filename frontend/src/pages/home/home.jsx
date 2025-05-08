import React from 'react';
import ProductSection from './productSection/productSection';
import Footer from '../../components/layout/footer/footer';
import Header from '../../components/layout/header/header';

const Home = () => {
    return (
        <>
            <Header />

            <ProductSection />

            <Footer />

        </>
    );
}

export default Home;