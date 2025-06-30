import React from 'react'
import Footer from '../../components/layout/footer/footer'
import ProductCard from './productCart/productCard';
import Header from '../../components/layout/header/header';
import { useLocation, useParams } from 'react-router-dom';

const Product = () => {
    const location = useLocation();
    const { id } = useParams();
    const product = location.state?.product;
    // Nếu không có product từ location.state, có thể fetch bằng id ở đây nếu muốn
    console.log("Product id:", id);

    return (
        <>
            <Header />
            <ProductCard productID={id} />
            <Footer />
        </>
    );
};

export default Product;