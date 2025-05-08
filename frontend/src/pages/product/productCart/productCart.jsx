import React from 'react'
import './productCart.css'

function ProductCart() {
    return (
        <>
            <div className="app__container">
                <div className="grid">
                    <div className="grid__row product-cart">
                        <div className="product">
                            <div className="product__gallery">
                                <img
                                    className="product__image-main"
                                    src="https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3300mcm76did3@resize_w450_nl.webp"
                                    alt="Áo thun Summer"
                                />
                            </div>

                            <div className="product__info">
                                <h1 className="product__title">
                                    Áo Thun Nam Nữ Unisex Tay Lỡ Mèo Summer In Hình Cotton Form Rộng
                                </h1>
                                <div className="product__rating">
                                    <span className="product__rating-item product__stars">⭐ 4.9</span>
                                    <span className="product__rating-item product__sold">
                                        26,6k <span className="product__sold-text">Sold</span>
                                    </span>
                                </div>

                                <div className="product__price">
                                    <span className="product__price-current">₫139.000</span>
                                    <span className="product__price-old">₫199.000</span>
                                    <span className="product__price-sale">-30%</span>
                                </div>

                                <div className="product__variants">
                                    <div className="product__option product__option--color">
                                        <span className="product__option-label">Màu sắc:</span>
                                        <div className="product__option-group">
                                            <button className="product__option-btn product__option-btn--active">
                                                X.Lá-MèoSummer
                                            </button>
                                            <button className="product__option-btn">Blue-MèoSummer</button>
                                        </div>
                                    </div>

                                    <div className="product__option product__option--size">
                                        <span className="product__option-label">Kích cỡ:</span>
                                        <div className="product__option-group">
                                            <button className="product__option-btn">S</button>
                                            <button className="product__option-btn">M</button>
                                            <button className="product__option-btn product__option-btn--active">L</button>
                                            <button className="product__option-btn">XL</button>
                                            <button className="product__option-btn">XXL</button>
                                        </div>
                                    </div>

                                    <div className="product__quantity">
                                        <span className="product__option-label">Số lượng:</span>
                                        <button className="product__quantity-btn">-</button>
                                        <input
                                            className="product__quantity-input"
                                            type="text"
                                            defaultValue="3"
                                        />
                                        <button className="product__quantity-btn">+</button>
                                    </div>
                                </div>

                                <div className="product__actions">
                                    <button className="btn product__btn--cart">Thêm Vào Giỏ Hàng</button>
                                    <button className="btn product__btn--buy">Mua Ngay</button>
                                </div>
                            </div>
                        </div>

                        <div className="product__details">
                            <h2 className="product__details-title">Chi Tiết Sản Phẩm</h2>
                            <ul className="product__specs">
                                <li>Chất liệu: Cotton</li>
                                <li>Phong cách: Cơ bản</li>
                                <li>Xuất xứ: Việt Nam</li>
                                <li>Mùa: Mùa hè</li>
                                <li>Cổ áo: Cổ tròn</li>
                            </ul>

                            <div className="product__description">
                                <h2 className="product__description-title">Mô Tả Sản Phẩm</h2>
                                <p>
                                    Áo phông unisex form rộng tay lỡ chất cotton mềm mịn, dễ phối đồ...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductCart
