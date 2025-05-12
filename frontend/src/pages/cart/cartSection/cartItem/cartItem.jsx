import React from 'react';

const CartItem = ({ product }) => {
    return (
        <div className="cart__item">
            <div className="cart__checkbox">
                <input type="checkbox" />
            </div>
            <div className="cart__product">
                <img
                    className="cart__image"
                    src={product.image}
                    alt={product.title}
                />
                <div className="cart__details">
                    <div className="cart__title">{product.title}</div>
                    <div className="cart__variant">{product.variant}</div>
                </div>
            </div>
            <div className="cart__price">
                <span className="cart__price-old">{product.oldPrice}</span>
                <span className="cart__price-current">{product.currentPrice}</span>
            </div>
            <div className="cart__quantity">
                <button className="cart__btn">-</button>
                <input className="cart__input" type="text" defaultValue={product.quantity} />
                <button className="cart__btn">+</button>
            </div>
            <div className="cart__total">{product.totalPrice}</div>
            <div className="cart__action">
                <a href="#">Xóa</a>
            </div>
        </div>
    );
};

export default CartItem;