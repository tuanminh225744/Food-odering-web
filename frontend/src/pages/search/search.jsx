import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/header/header';
import Footer from '../../components/layout/footer/footer';
import './search.css';

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { searchResults = [], searchTerm = '' } = location.state || {};

    // Lọc kết quả bao gồm cả kết quả một phần
    const filteredResults = searchResults.filter(product => {
        const searchLower = searchTerm.toLowerCase();
        const productName = product.name.toLowerCase();
        const productDesc = (product.description || '').toLowerCase();

        // Kiểm tra từng từ trong chuỗi tìm kiếm
        const searchWords = searchLower.split(' ');
        return searchWords.some(word =>
            productName.includes(word) || productDesc.includes(word)
        );
    });

    return (
        <>
            <Header />
            <div className="app__container">
                <div className="grid">
                    <div className="search-results">
                        <h2>Kết quả tìm kiếm cho "{searchTerm}"</h2>
                        <div className="grid__row">
                            {filteredResults.map((product) => (
                                <div
                                    className="grid__column-2-4"
                                    key={product.id}
                                    onClick={() => navigate('/product', { state: { product } })}
                                >
                                    <div className="home-product-item">
                                        <div
                                            className="home-product-item__img"
                                            style={{ backgroundImage: `url(${product.imageUrl})` }}
                                        ></div>
                                        <h4 className="home-product-item__name">
                                            {product.name}
                                        </h4>
                                        <div className="home-product-item__price">
                                            <span className="home-product-item__price-current">
                                                {product.price.toLocaleString()}₫
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {filteredResults.length === 0 && (
                            <div className="no-results">
                                Không tìm thấy sản phẩm phù hợp
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Search;
