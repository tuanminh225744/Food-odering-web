import React from 'react'
import './productCard.css'
import axiosClient from '../../../api/axiosClient'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProductCard({ productID }) {
    const navigate = useNavigate();
    const [product, setProduct] = React.useState(null);
    const user = useSelector((state) => state.auth.login.currentUser.others);

    React.useEffect(() => {
        if (!productID) return;
        const fetchProduct = async () => {
            try {
                const response = await axiosClient.get(`/food/${productID}`);
                console.log('Đã lấy thông tin sản phẩm:', response.data);
                setProduct(response.data);
                console.log('Thông tin sản phẩm:', response.data);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin sản phẩm:', error);
                alert('Không thể lấy thông tin sản phẩm. Vui lòng thử lại sau.');
            }
        };
        fetchProduct();
    }, [productID]);

    // Nếu không có id (truy cập trực tiếp), có thể hiển thị thông báo hoặc redirect
    if (!productID) {
        return <div>Không tìm thấy sản phẩm.</div>;
    } else {
        console.log(productID)
    }

    const handleAddToCart = async () => {
        try {

            const userID = user._id;
            if (!userID) {
                alert('Bạn cần đăng nhập để thêm vào giỏ hàng!');
                return;
            }
            const response = await axiosClient.post('/cart/add', {
                userID,
                foodId: productID,
                quantity: 1
            });
            alert('Thêm vào giỏ hàng thành công!');
            window.location.reload();
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
            alert('Thêm vào giỏ hàng thất bại!');
        }
    };

    const handleBuyNow = () => {
        const purchaseItem = {
            ...product,
            soLuong: 1
        };

        navigate('/pay', {
            state: {
                items: [purchaseItem],
                totalAmount: product.gia
            }
        });
    };

    return (
        <>
            <div className="app__container">
                <div className="grid">
                    <div className="grid__row product-cart">
                        <div className="product">
                            <div className="product__gallery">
                                {product ? (
                                    <img
                                        className="product__image-main"
                                        src={product.imageUrl}
                                        alt={product.name}
                                    />
                                ) : (
                                    <div>Đang tải ảnh...</div>
                                )}
                            </div>

                            <div className="product__info">
                                <h1 className="product__title">
                                    {product ? product.name : 'Đang tải...'}
                                </h1>

                                <div className="product__description">
                                    <h2 className="product__description-title">Mô Tả Sản Phẩm</h2>
                                    <p>
                                        {product ? product.description : 'Đang tải...'}
                                    </p>
                                </div>

                                <div className="product__actions">
                                    <button
                                        className="btn product__btn--cart"
                                        onClick={handleAddToCart}
                                        disabled={!product}
                                    >
                                        Thêm Vào Giỏ Hàng
                                    </button>
                                    <button
                                        className="btn product__btn--buy"
                                        onClick={handleBuyNow}
                                        disabled={!product}
                                    >
                                        Mua Ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductCard
