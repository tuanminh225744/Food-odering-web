import React from 'react'
import Footer from '../../components/layout/footer/footer'
import ProductCart from './productCart/productCart';
import Header from '../../components/layout/header/header';


const Product = () => {
    return (
        <>
            <Header />

            <ProductCart />

            <Footer />
        </>
    );
};

export default Product;