import React, { useEffect, useState } from "react";
import './productSection.css';
import axios from "axios";
import { useSelector } from "react-redux";

const categories = [
    { label: "Tất cả", type: "" },
    { label: "Đồ ăn", type: "do-an" },
    { label: "Đồ uống", type: "do-uong" },
    { label: "Đồ chay", type: "do-chay" },
    { label: "Bánh kem", type: "banh-kem" },
    { label: "Tráng miệng", type: "trang-mieng" },
    { label: "Món lẩu", type: "mon-lau" },
    { label: "Mỳ phở", type: "my-pho" },
    { label: "Cơm hộp", type: "com-hop" },
];

const priceSortOptions = [
    { label: "Mặc định", value: "" },
    { label: "Thấp đến cao", value: "asc" },
    { label: "Cao đến thấp", value: "desc" },
];

const PAGE_SIZE = 10;

const ProductSection = () => {
    const [products, setProducts] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [priceSort, setPriceSort] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = "http://localhost:5000/api/food";
                if (selectedType && priceSort) {
                    url = `http://localhost:5000/api/food/type/${selectedType}/price/${priceSort}`;
                } else if (selectedType) {
                    url = `http://localhost:5000/api/food/type/${selectedType}`;
                } else if (priceSort) {
                    url = `http://localhost:5000/api/food/price/${priceSort}`;
                }
                const response = await axios.get(url);
                setProducts(response.data);
            } catch (error) {
                setProducts([]);
            }
        };
        fetchProducts();
    }, [selectedType, priceSort]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedType, priceSort]);

    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

    const pagedProducts = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const user = useSelector((state) => state.auth.login.currentUser.others);

    return (
        <div className="app__container">
            <div className="grid">
                <div className="grid__row product-section">
                    <div className="grid__column-2 category">
                        <nav className="category">
                            <h3 className="category-heading">
                                <i className="category-heading-icon fa-solid fa-bars"></i>
                                Danh mục
                            </h3>
                            <ul className="category-list">
                                {categories.map((cat) => (
                                    <li
                                        key={cat.type}
                                        className={
                                            "category-item" +
                                            (selectedType === cat.type ? " category-item--active" : "")
                                        }
                                        onClick={() => setSelectedType(cat.type)}
                                    >
                                        <span className="category-item-link">{cat.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="grid__column-10 products">
                        <div className="home-filter">
                            <span className="home-filter__label">Sắp xếp theo giá</span>

                            <div className="select-input">
                                <span className="select-input__label">
                                    {priceSortOptions.find(opt => opt.value === priceSort)?.label || "Giá"}
                                </span>
                                <i className="select-input__icon fa-solid fa-angle-down"></i>
                                <ul className="select-input__list">
                                    {priceSortOptions.map(opt => (
                                        <li
                                            className="select-input__item"
                                            key={opt.value}
                                            onClick={() => setPriceSort(opt.value)}
                                        >
                                            <span className="select-input__link">{opt.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>


                        </div>

                        <div className="home-product">
                            <div className="grid__row">
                                {pagedProducts.map((product) => {
                                    const saleOff = product.saleOffPrecent || 0;
                                    const price = product.price || 0;
                                    const priceBeforeSale = saleOff > 0
                                        ? Math.round(price / (1 - saleOff / 100))
                                        : price;
                                    return (
                                        <div className="grid__column-2-4" key={product._id}>
                                            <a href={`/product/${product._id}`} className="home-product-item">
                                                <div
                                                    className="home-product-item__img"
                                                    style={{ backgroundImage: `url(${product.imageUrl})` }}
                                                ></div>
                                                <h4 className="home-product-item__name">
                                                    {product.name}
                                                </h4>
                                                <span className="home-product-item__price">
                                                    {saleOff > 0 && (
                                                        <span className="home-product-item__price-old">
                                                            {priceBeforeSale.toLocaleString()}₫
                                                        </span>
                                                    )}
                                                    <span className="home-product-item__price-current">
                                                        {price.toLocaleString()}₫
                                                    </span>
                                                </span>
                                                <div className="home-product-item__action">
                                                    <div className="home-product-item__rating">
                                                        <span className="home-product-item__star-rate">
                                                            {product.starRating || '0.0'}
                                                        </span>
                                                        <i className="home-product-item__star-gold fa-solid fa-star"></i>
                                                    </div>
                                                </div>
                                                {saleOff > 0 && (
                                                    <div className="home-product-item__sale-off">
                                                        <span className="home-product-item__sale-off-persent">
                                                            {saleOff}%
                                                        </span>
                                                        <span className="home-product-item__sale-off-label">GIẢM</span>
                                                    </div>
                                                )}
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <ul className="pagination home-product__pagination">
                            <li className={`pagination-item${currentPage === 1 ? " pagination-item--disabled" : ""}`}>
                                <button
                                    className="pagination-item__link"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <i className="pagination-item__icon fa-solid fa-angle-left"></i>
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, idx) => (
                                <li
                                    key={idx + 1}
                                    className={`pagination-item${currentPage === idx + 1 ? " pagination-item--active" : ""}`}
                                >
                                    <button
                                        className="pagination-item__link"
                                        onClick={() => setCurrentPage(idx + 1)}
                                    >
                                        {idx + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`pagination-item${currentPage === totalPages || totalPages === 0 ? " pagination-item--disabled" : ""}`}>
                                <button
                                    className="pagination-item__link"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                >
                                    <i className="pagination-item__icon fa-solid fa-angle-right"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductSection;