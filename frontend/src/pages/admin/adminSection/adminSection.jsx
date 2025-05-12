import React, { useState } from 'react'
import './adminSection.css'
import Category from './category/category'
import UserTable from './userTable/userTable'
import ProductTable from './productTable/productTable'
import OrderTable from './orderTable/orderTable'

function AdminSection() {

    const [currentSection, setCurrentSection] = useState('products');

    // Dữ liệu mẫu
    const products = [
        { id: 1, name: 'Áo dài tay', price: '100.000đ', image: './assets/img/anh-san-pham/san-pham-1.jpg' },
    ];

    const users = [
        { id: 1, name: 'Nguyễn Văn A', email: 'a@gmail.com', phone: '0901234567' },
    ];

    const orders = [
        { id: 101, customerName: 'Nguyễn Văn A', date: '2024-05-01', total: '200.000đ', status: 'Đang xử lý' },
    ];

    // Xử lý sự kiện
    const handleEdit = (item) => {
        console.log('Edit:', item);
    };

    const handleDelete = (id) => {
        console.log('Delete ID:', id);
    };

    const handleView = (order) => {
        console.log('View Order:', order);
    };

    return (
        <div className="app__container">
            <div className="grid">
                <div className="grid__row app__content">
                    <Category currentSection={currentSection} setCurrentSection={setCurrentSection} />

                    {currentSection === 'products' && (
                        <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
                    )}
                    {currentSection === 'orders' && (
                        <OrderTable orders={orders} onView={handleView} onDelete={handleDelete} />
                    )}
                    {currentSection === 'users' && (
                        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminSection