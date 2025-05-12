import React from 'react';
import CartItem from './cartItem/cartItem';
import './cartSection.css';

const CartSection = () => {
    const cartItems = [
        {
            title: 'Áo Khoác Gió Nam 2 lớp TORA NO Công Nghệ Cao Cấp...',
            variant: 'Phân Loại Hàng: XÁM NHẠT, XXL',
            image: './assets/img/anh-san-pham/san-pham-1.jpg',
            oldPrice: '₫600.000',
            currentPrice: '₫379.000',
            quantity: 1,
            totalPrice: '₫379.000'
        },
        {
            title: 'Áo Khoác Gió Nam 2 lớp TORA NO Công Nghệ Cao Cấp...',
            variant: 'Phân Loại Hàng: XÁM NHẠT, XXL',
            image: './assets/img/anh-san-pham/san-pham-1.jpg',
            oldPrice: '₫600.000',
            currentPrice: '₫379.000',
            quantity: 1,
            totalPrice: '₫379.000'
        },
        {
            title: 'Áo Khoác Gió Nam 2 lớp TORA NO Công Nghệ Cao Cấp...',
            variant: 'Phân Loại Hàng: XÁM NHẠT, XXL',
            image: './assets/img/anh-san-pham/san-pham-1.jpg',
            oldPrice: '₫600.000',
            currentPrice: '₫379.000',
            quantity: 1,
            totalPrice: '₫379.000'
        },
        {
            title: 'Áo Khoác Gió Nam 2 lớp TORA NO Công Nghệ Cao Cấp...',
            variant: 'Phân Loại Hàng: XÁM NHẠT, XXL',
            image: './assets/img/anh-san-pham/san-pham-1.jpg',
            oldPrice: '₫600.000',
            currentPrice: '₫379.000',
            quantity: 1,
            totalPrice: '₫379.000'
        },
        {
            title: 'Áo Khoác Gió Nam 2 lớp TORA NO Công Nghệ Cao Cấp...',
            variant: 'Phân Loại Hàng: XÁM NHẠT, XXL',
            image: './assets/img/anh-san-pham/san-pham-1.jpg',
            oldPrice: '₫600.000',
            currentPrice: '₫379.000',
            quantity: 1,
            totalPrice: '₫379.000'
        },
        {
            title: 'Áo Khoác Gió Nam 2 lớp TORA NO Công Nghệ Cao Cấp...',
            variant: 'Phân Loại Hàng: XÁM NHẠT, XXL',
            image: './assets/img/anh-san-pham/san-pham-1.jpg',
            oldPrice: '₫600.000',
            currentPrice: '₫379.000',
            quantity: 1,
            totalPrice: '₫379.000'
        },
        {
            title: 'Áo Khoác Gió Nam 2 lớp TORA NO Công Nghệ Cao Cấp...',
            variant: 'Phân Loại Hàng: XÁM NHẠT, XXL',
            image: './assets/img/anh-san-pham/san-pham-1.jpg',
            oldPrice: '₫600.000',
            currentPrice: '₫379.000',
            quantity: 1,
            totalPrice: '₫379.000'
        }
    ];

    return (
        <div className="app__container">
            <div className="grid">
                <div className="grid__row cart">
                    <div className="cart__header">
                        <div></div>
                        <div className="cart__column">Sản Phẩm</div>
                        <div className="cart__column">Đơn Giá</div>
                        <div className="cart__column">Số Lượng</div>
                        <div className="cart__column">Số Tiền</div>
                        <div className="cart__column">Thao Tác</div>
                    </div>

                    {cartItems.map((item, index) => (
                        <CartItem key={index} product={item} />
                    ))}

                    <div className="cart__footer">
                        <div className="cart__select-all">
                            <input className="cart__checkbox-all" type="checkbox" />
                            <span>Chọn Tất Cả ({cartItems.length})</span>
                            <a href="#" className="cart__delete">Xóa</a>
                        </div>

                        <div className="cart__checkout-group">
                            <div className="cart__summary">
                                <span className="cart__total-price--text">Tổng cộng (0 Sản phẩm):</span>
                                <span className="cart__total-price">₫0</span>
                            </div>
                            <button className="cart__checkout btn btn-primary">Mua Hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSection;