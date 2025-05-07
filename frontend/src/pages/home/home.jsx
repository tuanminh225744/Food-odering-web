import './home.css';
import React from 'react';
import Navbar from '../../components/layout/navbar/navbar';
import HeaderSearch from '../../components/layout/headerSearch/headerSearch';
import ProductSection from './productSection/productSection';
import Footer from '../../components/layout/footer/footer';

const Home = () => {
    return (
        <>
            <header className='header'>
                <div className='grid'>
                    <Navbar />
                    <HeaderSearch />
                </div>
            </header>

            <div className="app__container">
                <div className="grid">
                    <ProductSection />
                </div>

            </div>

            <Footer />

        </>
    );
}

export default Home;