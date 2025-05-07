import React from "react";
import './productSection.css';

const ProductSection = () => {
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
                                <li className="category-item category-item--active">
                                    <a href="#" className="category-item-link">Áo</a>
                                </li>
                                <li className="category-item">
                                    <a href="#" className="category-item-link">Quần</a>
                                </li>
                                <li className="category-item">
                                    <a href="#" className="category-item-link">Đầm & Váy</a>
                                </li>
                                <li className="category-item">
                                    <a href="#" className="category-item-link">Đồ bộ</a>
                                </li>
                                <li className="category-item">
                                    <a href="#" className="category-item-link">Đồ ngủ & Đồ lót</a>
                                </li>
                                <li className="category-item">
                                    <a href="#" className="category-item-link">Giày dép</a>
                                </li>
                                <li className="category-item">
                                    <a href="#" className="category-item-link">Phụ kiện</a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="grid__column-10 products">
                        <div className="home-filter">
                            <span className="home-filter__label">Sắp xếp theo</span>
                            <button className="home-filter__btn btn">Phổ biến</button>
                            <button className="home-filter__btn btn btn-primary">Mới nhất</button>
                            <button className="home-filter__btn btn">Bán chạy</button>

                            <div className="select-input">
                                <span className="select-input__label">Giá</span>
                                <i className="select-input__icon fa-solid fa-angle-down"></i>
                                <ul className="select-input__list">
                                    <li className="select-input__item">
                                        <a href="" className="select-input__link">Giá: Thấp đến cao</a>
                                    </li>
                                    <li className="select-input__item">
                                        <a href="" className="select-input__link">Giá: Cao đến thấp</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="home-filter__page">
                                <span className="home-filter__page-num">
                                    <span className="home-filter__page-current">1</span>/14
                                </span>

                                <div className="home-filter__page-control">
                                    <a href="" className="home-filter__page-btn home-filter__page-btn--disabled">
                                        <i className="home-filter__page-icon fa-solid fa-angle-left"></i>
                                    </a>
                                    <a href="" className="home-filter__page-btn">
                                        <i className="home-filter__page-icon fa-solid fa-angle-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="home-product">
                            <div className="grid__row">
                                <div className="grid__column-2-4">
                                    <a href="" className="home-product-item">
                                        <div
                                            className="home-product-item__img"
                                            style={{
                                                backgroundImage:
                                                    'url(https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m5tylr8wm9x425_tn.webp)'
                                            }}
                                        ></div>
                                        <h4 className="home-product-item__name">
                                            Bộ Quần Áo, Bộ Nam, Áo In Chữ Paris Siêu Đẹp - Bộ Cộc Jor Đan Chất Liệu Poly Cá Sấu Thoáng Mát 2025
                                        </h4>
                                        <span className="home-product-item__price">
                                            <span className="home-product-item__price-old">150.000</span>
                                            <span className="home-product-item__price-current">75.000</span>
                                        </span>
                                        <div className="home-product-item__action">
                                            <span className="home-product-item__like home-product-item__like--liked">
                                                <i className="home-product-item__like-icon-empty fa-regular fa-heart"></i>
                                                <i className="home-product-item__like-icon-fill fa-solid fa-heart"></i>
                                            </span>
                                            <div className="home-product-item__rating">
                                                <i className="home-product-item__star-gold fa-solid fa-star"></i>
                                                <i className="home-product-item__star-gold fa-solid fa-star"></i>
                                                <i className="home-product-item__star-gold fa-solid fa-star"></i>
                                                <i className="home-product-item__star-gold fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                            </div>
                                            <span className="home-product-item__sold">88 đã bán</span>
                                        </div>
                                        <div className="home-product-item__origin">
                                            <span className="home-product-item__brand">BUZZ</span>
                                            <div className="home-product-item__origin-name">Hà Nội</div>
                                        </div>
                                        <div className="home-product-item__favourite">
                                            <i className="fa-solid fa-check"></i>
                                            Yêu thích
                                        </div>
                                        <div className="home-product-item__sale-off">
                                            <span className="home-product-item__sale-off-persent">50%</span>
                                            <span className="home-product-item__sale-off-label">GIẢM</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <ul className="pagination home-product__pagination">
                            <li className="pagination-item">
                                <a href="" className="pagination-item__link">
                                    <i className="pagination-item__icon fa-solid fa-angle-left"></i>
                                </a>
                            </li>
                            <li className="pagination-item pagination-item--active">
                                <a href="" className="pagination-item__link">1</a>
                            </li>
                            <li className="pagination-item">
                                <a href="" className="pagination-item__link">2</a>
                            </li>
                            <li className="pagination-item">
                                <a href="" className="pagination-item__link">3</a>
                            </li>
                            <li className="pagination-item">
                                <a href="" className="pagination-item__link">4</a>
                            </li>
                            <li className="pagination-item">
                                <a href="" className="pagination-item__link">5</a>
                            </li>
                            <li className="pagination-item">
                                <a href="" className="pagination-item__link pagination-item--no-hover">...</a>
                            </li>
                            <li className="pagination-item">
                                <a href="" className="pagination-item__link">14</a>
                            </li>
                            <li className="pagination-item">
                                <a href="" className="pagination-item__link">
                                    <i className="pagination-item__icon fa-solid fa-angle-right"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductSection;