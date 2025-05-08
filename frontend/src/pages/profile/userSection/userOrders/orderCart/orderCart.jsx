import React from 'react';
import './orderCart.css';

const OrderCard = ({ status, statusText }) => (
    <div className="order-card" data-status={status}>
        <div className="order-card__header">
            <span className="order-card__shop-name">Monster X Street</span>
            <span className="order-card__status">{statusText}</span>
        </div>

        <div className="order-card__body">
            <img className="order-card__image" src="./assets/img/anh-san-pham/san-pham-3.jpg" alt="product" />
            <div className="order-card__details">
                <h4 className="order-card__title">
                    Áo thun Monster-Signature unisex MONSTER X STREET phông tay lỡ nam nữ form rộng Local Brand
                </h4>
                <div className="order-card__meta">
                    <p className="order-card__variant">Phân loại hàng: Đen, XXL</p>
                    <div className="order-card__price">
                        ₫105.000 <span className="order-card__price--original">₫199.000</span>
                    </div>
                </div>
                <div className="order-card__quantity">
                    <span className="order-card__quantity-label">Số lượng:</span>
                    <span className="order-card__quantity-value">1</span>
                </div>
            </div>
        </div>

        <div className="order-card__footer">
            <div className="order-card__total">Thành tiền: <span>₫108.000</span></div>
            <div className="order-card__actions">
                <button className="order-card__action-button order-card__action-button--primary btn btn-primary">Đã Nhận Hàng</button>
                <button className="order-card__action-button btn">Yêu Cầu Trả Hàng/Hoàn Tiền</button>
                <button className="order-card__action-button btn">Liên Hệ Người Bán</button>
            </div>
        </div>
    </div>
);

export default OrderCard;