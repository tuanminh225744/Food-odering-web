import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './cartItem/cartItem';
import './cartSection.css';
import axiosClient from '../../../api/axiosClient';
import { useSelector } from 'react-redux';

const CartSection = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [checked, setChecked] = useState([]);
    const user = useSelector((state) => state.auth.login.currentUser.others);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axiosClient.get(`/cart/user/${user._id}`);
                // items: [{ foodId: {...}, quantity }]
                const items = response.data.items || [];
                setCartItems(items);
                setChecked(new Array(items.length).fill(false));
            } catch (error) {
                setCartItems([]);
                setChecked([]);
            }
        };
        fetchCart();
    }, [user._id]);

    const handleQuantityChange = (index, newQuantity) => {
        setCartItems(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleCheckChange = (index) => {
        setChecked(prev =>
            prev.map((v, i) => (i === index ? !v : v))
        );
    };

    const handleCheckAll = (e) => {
        setChecked(new Array(cartItems.length).fill(e.target.checked));
    };

    const handleDeleteSelected = async () => {
        try {
            // Lọc ra các sản phẩm đã chọn
            const selectedItems = cartItems.filter((_, index) => checked[index]);
            // Xóa từng sản phẩm đã chọn
            for (const item of selectedItems) {
                await axiosClient.post('/cart/remove', {
                    userID: user._id,
                    foodId: item.foodId._id
                });
            }
            // Refresh lại danh sách
            const response = await axiosClient.get(`/cart/user/${user._id}`);
            const items = response.data.items || [];
            setCartItems(items);
            setChecked(new Array(items.length).fill(false));
            window.location.reload();
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
            alert('Xóa sản phẩm thất bại!');
        }
    };

    const handleDeleteItem = async (foodId) => {
        try {
            await axiosClient.post('/cart/remove', {
                userID: user._id,
                foodId
            });
            // Refresh lại danh sách sau khi xóa
            const response = await axiosClient.get(`/cart/user/${user._id}`);
            const items = response.data.items || [];
            setCartItems(items);
            setChecked(new Array(items.length).fill(false));
            window.location.reload();
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
            alert('Xóa sản phẩm thất bại!');
        }
    };

    const handleCheckout = () => {
        const selectedItems = cartItems.filter((_, index) => checked[index]);
        if (selectedItems.length === 0) {
            alert('Vui lòng chọn sản phẩm để thanh toán');
            return;
        }
        // Gộp thông tin sản phẩm vào từng item để sang PaySection không bị thiếu price/name
        const itemsForPay = selectedItems.map(item => ({
            ...item.foodId, // copy toàn bộ thông tin sản phẩm (name, price, imageUrl, ...)
            quantity: item.quantity
        }));
        const totalAmount = itemsForPay.reduce((sum, item) => {
            const price = item.price || 0;
            return sum + price * (item.quantity || 1);
        }, 0);

        navigate('/pay', {
            state: {
                items: itemsForPay,
                totalAmount
            }
        });
    };

    // Tính tổng tiền và số sản phẩm đã chọn
    const totalChecked = checked.filter(Boolean).length;
    const totalPrice = cartItems.reduce((sum, item, idx) => {
        if (checked[idx]) {
            const price = item.foodId?.price || 0;
            const quantity = item.quantity || 1;
            return sum + price * quantity;
        }
        return sum;
    }, 0);

    return (
        <div className="app__container">
            <div className="grid">
                <div className="grid__row cart">
                    <div className="cart__header">
                        <div>
                            <input
                                className="cart__checkbox-all"
                                type="checkbox"
                                checked={checked.length > 0 && checked.every(Boolean)}
                                onChange={handleCheckAll}
                            />
                        </div>
                        <div className="cart__column">Sản Phẩm</div>
                        <div className="cart__column">Đơn Giá</div>
                        <div className="cart__column">Số Lượng</div>
                        <div className="cart__column">Số Tiền</div>
                        <div className="cart__column">Thao Tác</div>
                    </div>

                    {cartItems.map((item, index) => (
                        <CartItem
                            key={item.foodId?._id || index}
                            product={item.foodId}
                            quantity={item.quantity}
                            onQuantityChange={newQuantity => handleQuantityChange(index, newQuantity)}
                            checked={checked[index] || false}
                            onCheckChange={() => handleCheckChange(index)}
                            onDelete={() => handleDeleteItem(item.foodId._id)}
                        />
                    ))}

                    <div className="cart__footer">
                        <div className="cart__select-all">
                            <input
                                className="cart__checkbox-all"
                                type="checkbox"
                                checked={checked.length > 0 && checked.every(Boolean)}
                                onChange={handleCheckAll}
                            />
                            <span>Chọn Tất Cả ({totalChecked})</span>
                            <button
                                className="cart__delete"
                                onClick={handleDeleteSelected}
                                disabled={totalChecked === 0}
                            >
                                Xóa
                            </button>
                        </div>

                        <div className="cart__checkout-group">
                            <div className="cart__summary">
                                <span className="cart__total-price--text">
                                    Tổng cộng ({totalChecked} Sản phẩm):
                                </span>
                                <span className="cart__total-price">
                                    {totalPrice.toLocaleString()}₫
                                </span>
                            </div>
                            <button
                                className="cart__checkout btn btn-primary"
                                onClick={handleCheckout}
                            >
                                Mua Hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSection;